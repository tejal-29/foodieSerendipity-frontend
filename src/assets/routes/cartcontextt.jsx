
import React from "react";
import { useCart } from "../cartcontextt/cartcontextt";
import Navbar from "../navbar/navbar";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    changeQuantity,
    removeFromCart,
    itemCount,
    total,
  } = useCart();

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="cart-page">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <div>
            <p>Your cart is empty.</p>
            <button onClick={() => navigate("/menu")}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <p>{itemCount} item(s) in your cart</p>

            {cart.map((item) => (
              <div key={item.menuId} className="cart-item">
                {item.image && (
                  <img
                    src={
                      /^https?:\/\//i.test(item.image)
                        ? item.image
                        : `http://localhost:3000/${item.image.replace(/^\/+/, "")}`
                    }
                    alt={item.name}
                    width="100"
                  />
                )}

                <div>
                  <h3>{item.name}</h3>
                  <p>₹{Number(item.price).toFixed(2)}</p>

                  <button
                    onClick={() =>
                      changeQuantity(item.menuId, item.quantity - 1)
                    }
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    −
                  </button>

                  <span> {item.quantity} </span>

                  <button
                    onClick={() =>
                      changeQuantity(item.menuId, item.quantity + 1)
                    }
                    aria-label={`Increase ${item.name} quantity`}
                    disabled={item.quantity >= 99}
                  >
                    +
                  </button>

                  <button onClick={() => removeFromCart(item.menuId)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <h2>Total: ₹{total.toFixed(2)}</h2>

            <button onClick={() => navigate("/menu")}>
              Continue Shopping
            </button>

            <button onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </>
        )}
      </main>
    </>
  );
};

export default CartPage;
