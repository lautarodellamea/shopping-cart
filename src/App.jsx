import { products as initialProducts } from "./mocks/products.json";

import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { CartProvider } from "./context/cart";

import { useFilters } from "./hooks/useFilters";
import { useState } from "react";
import { Cart } from "./components/Cart";

function App() {
  const [products] = useState(initialProducts);
  const { filterProducts, filters } = useFilters();
  const filteredProducts = filterProducts(products);

  return (
    <>
      <CartProvider>
        <Header />
        <Cart />
        <Products products={filteredProducts} />
        <Footer filters={filters} />
      </CartProvider>
    </>
  );
}

export default App;
