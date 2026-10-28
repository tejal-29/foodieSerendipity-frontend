
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../cartcontextt/cartcontextt";
import "./cart.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

function imageUrl(image) {
    if (!image) return "";
    if (/^https?:\/\//i.test(image)) return image;

    const clean = image.replace(/^\/+/, "");
    return `${API_URL}/${clean.startsWith("uploads/") ? clean : `uploads/${clean}`}`;
}

export default function Cart() {
    const navigate = useNavigate();
    const {
        cart,
        changeQuantity,
        removeFromCart,
        total
    } = useCart();

    return (
        <main className="cart-page">
            <div className="cart-heading">
                <span>FOODIESERENDIPITY</span>
                <h1>Your Cart</h1>
                <p>Review your favourites before placing your order.</p>
            </div>

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <div className="cart-empty-icon">🛒</div>
                    <h2>Your cart is waiting for something delicious</h2>
                    <p>Add a few favourites from our menu to get started.</p>
                    <Link to="/menu" className="cart-primary-button">
                        Explore Menu
                    </Link>
                </div>
            ) : (
                <div className="cart-layout">
                    <section className="cart-items">
                        {cart.map(item => (
                            <article className="cart-item" key={item.menuId}>
                                {item.image ? (
                                    <img
                                        src={imageUrl(item.image)}
                                        alt={item.name}
                                        onError={event => {
                                            event.currentTarget.style.visibility = "hidden";
                                        }}
                                    />
                                ) : (
                                    <div className="cart-item-placeholder">🍽️</div>
                                )}

                                <div className="cart-item-info">
                                    <h3>{item.name}</h3>
                                    <p>₹{Number(item.price).toFixed(2)} each</p>

                                    <div className="cart-quantity">
                                        <button
                                            type="button"
                                            aria-label={`Decrease ${item.name} quantity`}
                                            onClick={() =>
                                                changeQuantity(item.menuId, item.quantity - 1)
                                            }
                                        >
                                            −
                                        </button>

                                        <span>{item.quantity}</span>

                                        <button
                                            type="button"
                                            aria-label={`Increase ${item.name} quantity`}
                                            disabled={item.quantity >= 99}
                                            onClick={() =>
                                                changeQuantity(item.menuId, item.quantity + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <div className="cart-item-end">
                                    <strong>
                                        ₹{(Number(item.price) * item.quantity).toFixed(2)}
                                    </strong>
                                    <button
                                        type="button"
                                        className="cart-remove"
                                        onClick={() => removeFromCart(item.menuId)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>

                    <aside className="cart-summary">
                        <h2>Order Summary</h2>
                        <div className="cart-summary-row">
                            <span>Items</span>
                            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div className="cart-summary-row cart-total">
                            <span>Total</span>
                            <strong>₹{total.toFixed(2)}</strong>
                        </div>

                        <p className="cart-summary-note">
                            Final total is verified by the server when you place your order.
                        </p>

                        <button
                            type="button"
                            className="cart-primary-button"
                            onClick={() => navigate("/checkout")}
                        >
                            Continue to Checkout →
                        </button>

                        <Link to="/menu" className="cart-continue">
                            ← Continue Shopping
                        </Link>
                    </aside>
                </div>
            )}
        </main>
    );
}
