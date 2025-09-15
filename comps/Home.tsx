"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";
import { Select } from "antd";
import { LiaFilterSolid } from "react-icons/lia";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState<"low-high" | "high-low">(
    "low-high"
  );

  const sortedProducts = [...products];
  if (sortOrder === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>
      <section className="flex items-center justify-end px-3 mb-4">
        <div className="w-full max-w-[240px] flex flex-row items-center gap-3">
          <LiaFilterSolid size={25} className="text-black" />
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "low-high" | "high-low")
            }
            className="w-full rounded-md border px-2 py-1.5 sm:px-3 sm:py-2 text-sm sm:text-base focus:outline-none focus:ring-2 transition bg-white "
            style={{
              borderColor: "#000",
              borderWidth: 0.8,
              color: "#000",
            }}
          >
            <option value="low-high">Low-High</option>
            <option value="high-low">High-Low</option>
          </select>
        </div>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3
       lg:mx-20 overflow-hidden"
      >
        {/* === MAP PRODUCTS  */}
        {sortedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
