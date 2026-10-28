
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cartcontextt/cartcontextt";
import "../cart/cart.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, total, clearCart } = useCart();

    const [customer, setCustomer] = useState({
        name: "",
        phone: "",
        address: ""
    });

    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    function updateField(event) {
        setCustomer(current => ({
            ...current,
            [event.target.name]: event.target.value
        }));
    }

    async function placeOrder(event) {
        event.preventDefault();
        setError("");

        if (!cart.length) {
            setError("Your cart is empty. Please add items first.");
            return;
        }

        if (!customer.name.trim() || !customer.phone.trim()) {
            setError("Please enter your name and phone number.");
            return;
        }

        if (!/^[0-9+\-\s()]{7,20}$/.test(customer.phone.trim())) {
            setError("Please enter a valid phone number.");
            return;
        }

        setSubmitting(true);

        try {
            const response = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customer,
                    items: cart.map(item => ({
                        menuId: item.menuId,
                        quantity: item.quantity
                    }))
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Unable to place your order.");
            }

            // Save the server-confirmed result for the confirmation screen.
            sessionStorage.setItem(
                "foodieSerendipityLastOrder",
                JSON.stringify(data.order)
            );

            clearCart();
            navigate("/orders/success");
        } catch (err) {
            setError(err.message || "Unable to place your order. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    if (!cart.length) {
        return (
            <main className="checkout-page">
                <h1>Your cart is empty</h1>
                <Link to="/menu" className="cart-primary-button">
                    Return to Menu
                </Link>
            </main>
        );
    }

    return (
        <main className="checkout-page">
            <div className="cart-heading">
                <span>FOODIESERENDIPITY</span>
                <h1>Checkout</h1>
                <p>Just a few details, then your order is on its way.</p>
            </div>

            <div className="checkout-layout">
                <form className="checkout-form" onSubmit={placeOrder}>
                    <h2>Customer Details</h2>

                    <label htmlFor="customer-name">Full Name *</label>
                    <input
                        id="customer-name"
                        name="name"
                        autoComplete="name"
                        value={customer.name}
                        onChange={updateField}
                        required
                        maxLength={100}
                    />

                    <label htmlFor="customer-phone">Phone Number *</label>
                    <input
                        id="customer-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={customer.phone}
                        onChange={updateField}
                        required
                        maxLength={20}
                    />

                    <label htmlFor="customer-address">
                        Delivery Address (optional)
                    </label>
                    <textarea
                        id="customer-address"
                        name="address"
                        autoComplete="street-address"
                        value={customer.address}
                        onChange={updateField}
                        maxLength={500}
                        rows={3}
                    />

                    {error && (
                        <p className="checkout-error" role="alert">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="cart-primary-button"
                        disabled={submitting}
                    >
                        {submitting ? "Placing Order..." : "Place Order"}
                    </button>

                    <Link to="/cart" className="cart-continue">
                        ← Back to Cart
                    </Link>
                </form>

                <aside className="cart-summary">
                    <h2>Your Order</h2>

                    {cart.map(item => (
                        <div className="cart-summary-row" key={item.menuId}>
                            <span>{item.name} × {item.quantity}</span>
                            <span>
                                ₹{(Number(item.price) * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}

                    <div className="cart-summary-row cart-total">
                        <span>Estimated Total</span>
                        <strong>₹{total.toFixed(2)}</strong>
                    </div>

                    <p className="cart-summary-note">
                        The server calculates and confirms the final total before saving.
                    </p>
                </aside>
            </div>
        </main>
    );
}
