import { useContext } from "react";
import { CartContext } from "../context/cart";

export const useCart = () => {
  const context = useContext(CartContext);

  // si esto pasa quiere decir que estoy usando este customHook en un logar que no puedo porque no la envolvi con un provider
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
