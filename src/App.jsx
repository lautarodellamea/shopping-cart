import { products as initialProducts } from "./mocks/products.json";

import { Products } from "./components/Products";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

import { useFilters } from "./hooks/useFilters";
import { useState } from "react";

function App() {
  const [products] = useState(initialProducts);
  const { filterProducts, filters } = useFilters();
  const filteredProducts = filterProducts(products);

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      <Footer filters={filters} />
    </>
  );
}

export default App;
