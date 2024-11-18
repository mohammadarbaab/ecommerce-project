import React from "react";
import Navbar from "../features/navbar/Navbar";
import { ProductList } from "./../features/productslist/components/ProductList";
import Footer from "../features/comman/Footer";

function Home() {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
      <Footer></Footer>
    </div>
  );
}

export default Home;
