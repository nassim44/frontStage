import { useEffect, useState } from "react";
import { FaRegHeart as EmptyHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

function ProductCard(product) {
  const productImage = "http://127.0.0.1:8000/uploads";
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    console.log(product);
  }, []);
  return (
    <>
      <div className="bg-white dark:bg-gray-200 shadow-2xl dark:shadow-gray-600 rounded-3xl flex flex-col justify-center items-center gap-5 p-4 ">
        <EmptyHeart
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          size={25}
          className="text-gray-500 self-end mr-4 cursor-pointer transition ease-in-out duration-500"
        />

        <Link className="px-10 pt-10" to={"/productDetail" + product.id}>
          <img
            src={productImage + product.product?.productImage}
            alt="image"
            className="rounded-xl h-60"
          />
        </Link>
        <h2 className="font-semibold dark:text-gray-600">
          {product.product?.name}
        </h2>
        <p className="p-4 dark:text-gray-800">{product.product?.description}</p>
      </div>
    </>
  );
}

export default ProductCard;
