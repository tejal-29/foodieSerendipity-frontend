
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "foodieSerendipityCart";

function readCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addToCart(item) {
    setCart(current => {
      const existing = current.find(
        row => row.menuId === item.id
      );

      if (existing) {
        return current.map(row =>
          row.menuId === item.id
            ? { ...row, quantity: Math.min(row.quantity + 1, 99) }
            : row
        );
      }

      return [
        ...current,
        {
          menuId: item.id,
          name: item.name,
          price: Number(item.price),
          image: item.image || "",
          quantity: 1
        }
      ];
    });
  }

  function changeQuantity(menuId, quantity) {
    if (quantity < 1) {
      removeFromCart(menuId);
      return;
    }

    setCart(current =>
      current.map(item =>
        item.menuId === menuId
          ? { ...item, quantity: Math.min(quantity, 99) }
          : item
      )
    );
  }

  function removeFromCart(menuId) {
    setCart(current =>
      current.filter(item => item.menuId !== menuId)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        changeQuantity,
        removeFromCart,
        clearCart,
        itemCount,
        total
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider.");
  }

  return context;
}
