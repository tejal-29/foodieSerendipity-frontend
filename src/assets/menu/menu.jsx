
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../cartcontextt/cartcontextt";
import "./menu.css";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

const menuCategories = [
  { id: "all", label: "All" },
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Main Course" },
  { id: "drinks", label: "Drinks" },
  { id: "desserts", label: "Desserts" },
];

// Normalize category names saved by the admin panel.
const normalizeCategory = (category = "") => {
  const value = String(category).trim().toLowerCase();

  if (
    ["starter", "starters", "appetizer", "appetizers"].includes(value)
  ) {
    return "starters";
  }

  if (
    ["main", "mains", "main course", "main-course", "maincourse"].includes(
      value
    )
  ) {
    return "mains";
  }

  if (
    ["drink", "drinks", "beverage", "beverages"].includes(value)
  ) {
    return "drinks";
  }

  if (
    ["dessert", "desserts", "sweet", "sweets"].includes(value)
  ) {
    return "desserts";
  }

  return value;
};

const getCategoryLabel = (category) => {
  const found = menuCategories.find((item) => item.id === category);

  if (found) {
    return found.label;
  }

  return category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Menu";
};

const getCategoryEmoji = (category) => {
  switch (category) {
    case "starters":
      return "🥗";
    case "mains":
      return "🍝";
    case "drinks":
      return "🥤";
    case "desserts":
      return "🍰";
    default:
      return "🍽️";
  }
};

const Menu = () => {
  const navigate = useNavigate();
  const { addToCart, itemCount } = useCart();

  const [activeCategory, setActiveCategory] = useState("all");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch menu items from Express and MongoDB.
  useEffect(() => {
    const controller = new AbortController();

    const fetchMenu = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/api/menu`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Unable to load menu (${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("The server returned an invalid menu response.");
        }

        const formattedItems = data.map((item) => ({
          ...item,
          id: item._id || item.id,
          category: normalizeCategory(item.category),
          name: item.name || "Unnamed Item",
          description: item.description || "",
          price: item.price ?? 0,
          image: item.image || "",
          tag: item.tag || "",
        }));

        setMenuItems(formattedItems);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Menu fetch error:", err);

          setError(
            "Unable to load the menu. Please check your connection and try again."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchMenu();

    return () => controller.abort();
  }, []);

  // Filter items according to the selected category.
  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter(
        (item) => item.category === activeCategory
      );

  // Add the selected food item to the shared cart.
  const handleAddToCart = (item) => {
    if (!item.id) {
      console.error("Cannot add menu item without an ID:", item);
      return;
    }

    addToCart(item);
  };

  // Build the image URL for uploaded backend images.
  const getImageUrl = (image) => {
    if (!image) return "";

    // Use an external image URL as provided.
    if (/^https?:\/\//i.test(image)) {
      return image;
    }

    const cleanImage = image.replace(/^\/+/, "");

    return `${API_URL}/${cleanImage.startsWith("uploads/")
      ? cleanImage
      : `uploads/${cleanImage}`
      }`;
  };

  return (
    <main className="menu-page" id="top">
      {/* PAGE HEADER */}
      <section className="menu-hero">
        <div className="menu-hero-overlay" />

        <div className="menu-hero-content">
          <span className="menu-eyebrow">
            FOODIESERENDIPITY
          </span>

          <h1>Our Menu</h1>

          <p>
            Fresh flavours, comforting favourites and little treats
            made to make your day delicious.
          </p>
        </div>
      </section>

      {/* MENU INTRO */}
      <section className="menu-intro">
        <span className="menu-section-label">
          EXPLORE OUR MENU
        </span>

        <h2>Something delicious is waiting</h2>

        <p>
          Take your pick from our selection of starters, hearty meals,
          refreshing drinks and sweet treats.
        </p>
      </section>

      {/* MENU CONTENT */}
      <section className="menu-content">
        {/* CART BUTTON */}
        <div className="menu-cart-link">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            aria-label={`View cart with ${itemCount} items`}
          >
            <span aria-hidden="true">🛒</span>
            View Cart
            <span className="menu-cart-count">
              {itemCount}
            </span>
          </button>
        </div>

        {/* CATEGORY FILTER */}
        <div className="category-tabs">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={
                activeCategory === category.id ? "active" : ""
              }
              onClick={() => setActiveCategory(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="menu-status" role="status">
            Loading menu items...
          </div>
        )}

        {/* ERROR STATE */}
        {!loading && error && (
          <div className="menu-status menu-error" role="alert">
            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* MENU CARDS */}
        {!loading && !error && (
          <>
            {filteredItems.length > 0 ? (
              <div className="menu-items-grid">
                {filteredItems.map((item) => (
                  <article
                    className="food-card"
                    key={item.id}
                  >
                    <div className="food-card-top">
                      <span className="food-category">
                        {getCategoryLabel(item.category)}
                      </span>

                      {item.tag && (
                        <span className="food-tag">
                          {item.tag}
                        </span>
                      )}
                    </div>

                    {/* FOOD IMAGE */}
                    <div className="food-placeholder">
                      {item.image ? (
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.name}
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";

                            const fallback =
                              event.currentTarget.nextElementSibling;

                            if (fallback) {
                              fallback.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}

                      <span
                        style={{
                          display: item.image ? "none" : "flex",
                        }}
                        aria-hidden="true"
                      >
                        {getCategoryEmoji(item.category)}
                      </span>
                    </div>

                    {/* FOOD DETAILS */}
                    <div className="food-card-body">
                      <div className="food-title-row">
                        <h3>{item.name}</h3>

                        <span className="food-price">
                          ₹{Number(item.price).toFixed(2)}
                        </span>
                      </div>

                      <p>{item.description}</p>

                      {/* ADD TO CART */}
                      <button
                        type="button"
                        className="order-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        <span>
                          <span aria-hidden="true">＋</span>
                          Add to Cart
                        </span>

                        <span aria-hidden="true">→</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="menu-status">
                {menuItems.length === 0
                  ? "No menu items have been added yet."
                  : "No items found in this category."}
              </div>
            )}
          </>
        )}
      </section>

      {/* BOTTOM CTA */}
      <section className="menu-order-cta">
        <div>
          <span className="menu-section-label">
            CAN'T DECIDE?
          </span>

          <h2>Let your next favourite dish find you.</h2>

          <p>
            Visit FoodieSerendipity and discover the flavours that
            make every meal a little more special.
          </p>
        </div>

        <a href="#top" className="menu-cta-button">
          Back to Menu ↑
        </a>
      </section>
    </main>
  );
};

export default Menu;
