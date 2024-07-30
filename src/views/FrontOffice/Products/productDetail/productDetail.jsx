import { useEffect, useState } from "react";
import { FetchProductById } from "../../../../Services/productsApi";
import Testimonials from "../../HomePage/components/Testimonials";
import { useParams } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const productImage = "http://127.0.0.1:8000/uploads";
  const getProductInfo = async () => {
    try {
      const response = await FetchProductById(id);
      console.log(response);
      setProduct(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductInfo();
  }, []);
  return (
    <>
      <section className="py-16 md:py-20 lg:py-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                data-wow-delay=".15s"
              >
                <img
                  src={productImage + product?.productImage}
                  className="w-[500px] shadow-2xl flex mb-10"
                  alt="about image"
                />
                <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                  {product?.name.charAt(0).toUpperCase() +
                    product?.name.slice(1).toLowerCase()}
                </h3>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Product Specification
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    {product?.description}
                  </p>
                  <div className="flex justify-between items-center mb-4 mt-4">
                    <div className="flex">
                      <h3 className="text-xl mr-2 font-medium text-black dark:text-white sm:text-2xl lg:text-xl xl:text-xl">
                        Brand :
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                        {product?.Brand}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-xl mr-2 font-medium text-black dark:text-white sm:text-2xl lg:text-xl xl:text-xl">
                        Product Type :
                      </h3>
                      <p className="text-base mr-2 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                        {product?.productType}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <h3 className="text-xl mr-2 font-medium text-black dark:text-white sm:text-2xl lg:text-xl xl:text-xl">
                        Price :
                      </h3>
                      <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                        {product?.prix}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <h3 className="text-xl mr-2 font-medium text-black dark:text-white sm:text-2xl lg:text-xl xl:text-xl">
                        Stock :
                      </h3>
                      <p className="text-base mr-2 font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                        {product?.quantite}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mb-9">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Premier support
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt.
                  </p>
                </div>
                <div className="mb-1">
                  <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    Next.js
                  </h3>
                  <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
                    Lorem ipsum dolor sit amet, sed do eiusmod tempor incididunt
                    consectetur adipiscing elit setim.
                  </p>
                </div>
              </div>
              <div className="flex">
                <button
                  id="dropdownSearchButton"
                  data-dropdown-toggle="dropdownSearch"
                  data-dropdown-placement="bottom"
                  className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                >
                  Add To WhishList
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <button
                  id="dropdownSearchButton"
                  data-dropdown-toggle="dropdownSearch"
                  data-dropdown-placement="bottom"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => setDropdown(!dropdown)}
                >
                  Buy
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
}

export default ProductDetail;
