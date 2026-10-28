
import React from "react";
import { Link, Navigate } from "react-router-dom";
import "../cart/cart.css";

export default function OrderSuccess() {
  let order = null;

  try {
    order = JSON.parse(
      sessionStorage.getItem("foodieSerendipityLastOrder") || "null"
    );
  } catch {
    order = null;
  }

  if (!order?.orderNumber) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <main className="order-success">
      <div className="success-check">✓</div>
      <span>FOODIESERENDIPITY</span>
      <h1>Thank you for your order!</h1>
      <p>Your order has been submitted successfully.</p>

      <div className="success-order-card">
        <span>Order Number</span>
        <strong>{order.orderNumber}</strong>

        <span>Order Status</span>
        <strong>{order.status}</strong>

        <span>Order Total</span>
        <strong>₹{Number(order.totalAmount).toFixed(2)}</strong>
      </div>

      <Link to="/menu" className="cart-primary-button">
        Back to Menu
      </Link>
    </main>
  );
}
