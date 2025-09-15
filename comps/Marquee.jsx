import styles from "../styles/Marquee.module.css";
import Products from "../app/Products";
import { memo, useRef } from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Marquee = ({ products }) => {
  const carouselRef = useRef(null);
  const productChunks = chunkArray(products, 4); // 4 products per row/slide

  return (
    <div className=" mt-20">
      <h1 className=" text-center text-secondary text-xl font-extrabold">
        You may also like
      </h1>

      <Carousel
        ref={carouselRef}
        dots={false}
        arrows
        infinite={true}
        className="relative mt-10 w-full"
      >
        {productChunks.map((chunk, index) => (
          <div key={index}>
            <div className="relative flex justify-center gap-5">
              {/* Custom Arrows */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full border border-gray-300 "
                onClick={() => carouselRef.current?.prev()}
              >
                <LeftOutlined style={{ fontSize: 24 }} />
              </button>

              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full border border-gray-300 shadow-md hover:scale-110 transition"
                onClick={() => carouselRef.current?.next()}
              >
                <RightOutlined style={{ fontSize: 24 }} />
              </button>
              {chunk.map((product) => (
                <Products key={product._id} products={product} />
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default memo(Marquee);
