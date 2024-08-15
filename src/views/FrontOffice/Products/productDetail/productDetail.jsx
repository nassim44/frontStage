import { useEffect, useState } from "react";
import {
  AddToWhishList,
  FetchProductById,
  RemoveFromWhishList,
} from "../../../../Services/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbPointFilled } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import { setUserInfo } from "../../../../Redux/Slices/UserInfoSlice";
import { jwtDecode } from "jwt-decode";
import {
  findUserByMail,
  LikeProduct,
  RemoveLikedProduct,
} from "../../../../Services/userApi";
import {
  FaHeart as FullHeart,
  FaHeartBroken as BrokenHeart,
  FaRegHeart as EmptyHeart,
} from "react-icons/fa";
import RateModal from "./RateModal";
import { getRate } from "../../../../Services/rateApi";
import Rates from "./rates";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const [addedToCart, setaddedToCart] = useState(false);
  const [displayNotification, setDisplayNotification] = useState(false);
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const userInfo = useSelector((state) => state.userInfo.user);
  const productImage = "http://127.0.0.1:8000/uploads";
  const [productRates, setProductRates] = useState([]);
  const [heartIsHovered, setHeartIsHovered] = useState(false);
  const [LikedProduct, setLikedProduct] = useState(false);
  const navigate = useNavigate();
  const getProductInfo = async () => {
    try {
      const response = await FetchProductById(id);
      setProduct(response);
      if (response.users.some((user) => user.id === userInfo.id))
        setaddedToCart(true);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductInfo();
  }, []);
  useEffect(() => {
    if (userInfo.LikedProduct && product) {
      userInfo.LikedProduct.map((LikedProduct) => {
        if (LikedProduct.id === product.id) {
          setLikedProduct(true);
        }
      });
    }
  }, [userInfo, product]);
  const getUserAllInformation = async (email) => {
    try {
      const response = await findUserByMail(email);
      dispatch(setUserInfo(response));
    } catch (error) {
      console.log(error);
    }
  };
  const WhishList = async (productId) => {
    try {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        getUserAllInformation(decodedToken.username);
      }
      setaddedToCart(true);
      setDisplayNotification(true);
      setTimeout(() => {
        setDisplayNotification(false);
      }, 5000);
      await AddToWhishList(userInfo.id, productId);
    } catch (error) {
      console.log(error);
    }
  };
  const RemoveWhishList = async (productId) => {
    try {
      const userToken = localStorage.getItem("token");
      if (userToken) {
        const decodedToken = jwtDecode(userToken);
        getUserAllInformation(decodedToken.username);
      }
      setaddedToCart(false);
      setDisplayNotification(true);
      setTimeout(() => {
        setDisplayNotification(false);
      }, 5000);
      await RemoveFromWhishList(userInfo.id, productId);
    } catch (error) {
      console.log(error);
    }
  };
  const closeNotification = () => {
    setDisplayNotification(false);
  };
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (star) => {
    setRating(star);
    setOpenModal(true);
  };
  const getProductRates = async () => {
    try {
      const response = await getRate(product.id);
      setProductRates(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (product) {
      getProductRates();
    }
  }, [product]);
  const handleNavigate = () => {
    navigate("/panier");
  };

  const handleMouseEnterHeart = (star) => {
    setHeartIsHovered(true);
  };

  const handleMouseLeaveHeart = () => {
    setHeartIsHovered(false);
  };

  const HandleLikeProduct = async () => {
    try {
      await LikeProduct(userInfo.id, product.id);
      setLikedProduct(true);
    } catch (error) {
      console.log(error);
    }
  };
  const HandleUnLikeProduct = async () => {
    try {
      await RemoveLikedProduct(userInfo.id, product.id);
      setLikedProduct(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section className="py-16 md:py-20 lg:py-28 ml-30">
        <div className="container mb-15">
          <div className="-mx-4 flex flex-wrap items-start justify-center">
            <div className="w-fit px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto  mb-12 aspect-[25/24] max-w-[500px] text-center lg:m-0"
                data-wow-delay=".15s"
              >
                <img
                  src={productImage + product?.productImage}
                  className="w-[500px] shadow-2xl rounded-2xl flex mb-10"
                  alt="about image"
                />
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2">
              <div className="wow fadeInUp max-w-[470px]" data-wow-delay=".2s">
                <div className="mb-9">
                  <h3 className="mb-1 text-xl font-bold font-plusJakarta text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
                    {product?.name.charAt(0).toUpperCase() +
                      product?.name.slice(1).toLowerCase()}
                  </h3>
                  <div className="flex items-center mb-5">
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300 me-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      4.95
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      out of
                    </p>
                    <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                      5
                    </p>
                  </div>
                  <h3 className="mb-4 text-xl font-bold font-plusJakarta text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-xl">
                    ${product?.prix}
                  </h3>
                  <h3 className="mb-4 text-xl font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-md">
                    Features
                  </h3>
                  <div className="mb-5">
                    {product?.Features
                      ? product.Features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <TbPointFilled className="mr-5" />
                            <p className="text-base font-plusJakarta font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-relaxed">
                              {feature}
                            </p>
                          </div>
                        ))
                      : null}
                  </div>
                  <h3 className="mb-4 text-xl font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-md">
                    Shipping Information
                  </h3>
                  <div className="flex items-center justify-start">
                    <div className="flex mr-20">
                      <LiaShippingFastSolid size={25} className="mr-2" />

                      <p className="text-base font-plusJakarta font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-relaxed">
                        {product?.shippingMethod.charAt(0).toUpperCase() +
                          product?.shippingMethod.slice(1).toLowerCase()}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <h3 className=" font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-xsm mr-3">
                        Shipping Region :
                      </h3>
                      <div className="flex flex-col">
                        {product?.shippingRegions
                          ? product.shippingRegions.map((region, index) => (
                              <div key={index} className="mb-1">
                                <p className="text-base font-plusJakarta font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-relaxed">
                                  {region}
                                </p>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-start mb-2">
                    <div className="flex items-center">
                      <h3 className=" font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-xsm mr-3">
                        Handling Time :
                      </h3>
                      <div>
                        <p className="text-base font-plusJakarta font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-relaxed">
                          {product?.handlingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <h3 className=" font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-xsm mr-3">
                      Shipping Cost :
                    </h3>
                    <div>
                      <p className="text-base font-plusJakarta font-medium leading-relaxed text-gray-500 sm:text-lg sm:leading-relaxed">
                        ${product?.shippingCost}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-6">
                {!addedToCart ? (
                  <>
                    <button
                      id="dropdownSearchButton"
                      className="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => WhishList(product.id)}
                    >
                      Add To cart
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
                  </>
                ) : (
                  <>
                    <button
                      id="dropdownSearchButton"
                      className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => RemoveWhishList(product.id)}
                    >
                      Remove From Cart
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
                  </>
                )}
                {LikedProduct ? (
                  heartIsHovered ? (
                    <BrokenHeart
                      size={45}
                      className="self-end mr-4 text-red-600 cursor-pointer transition ease-in-out duration-500 border border-gray-300 rounded-md p-2"
                      onMouseEnter={handleMouseEnterHeart}
                      onMouseLeave={handleMouseLeaveHeart}
                      onClick={HandleUnLikeProduct}
                    />
                  ) : (
                    <FullHeart
                      size={45}
                      className="self-end mr-4 text-red-600 cursor-pointer transition ease-in-out duration-500 border border-gray-300 rounded-md p-2"
                      onMouseEnter={handleMouseEnterHeart}
                      onMouseLeave={handleMouseLeaveHeart}
                    />
                  )
                ) : heartIsHovered ? (
                  <FullHeart
                    size={45}
                    className="self-end mr-4 text-red-600 cursor-pointer transition ease-in-out duration-500 border border-gray-300 rounded-md p-2"
                    onMouseEnter={handleMouseEnterHeart}
                    onMouseLeave={handleMouseLeaveHeart}
                    onClick={HandleLikeProduct}
                  />
                ) : (
                  <EmptyHeart
                    size={45}
                    className="self-end mr-4 text-gray-500 cursor-pointer transition ease-in-out duration-500 border border-gray-300 rounded-md p-2"
                    onMouseEnter={handleMouseEnterHeart}
                    onMouseLeave={handleMouseLeaveHeart}
                  />
                )}
              </div>
              {addedToCart && (
                <>
                  <h3 className="font-plusJakarta font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-title-sm mr-3">
                    Rate This Product :
                  </h3>
                  <div className="space-x-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="star"
                        style={{
                          fontSize: "35px",
                          cursor: "pointer",
                          color:
                            (hoverRating || rating) >= star ? "gold" : "gray",
                        }}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  {openModal && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
                      <div className="bg-white p-6 rounded shadow-lg relative">
                        <RateModal
                          onClose={() => setOpenModal(false)}
                          user={userInfo}
                          hoverRating={hoverRating}
                          rating={rating}
                          product={product}
                        />
                        <button
                          className="absolute top-2 right-2 text-gray-600"
                          onClick={() => setOpenModal(false)}
                        >
                          &times;
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}

              {displayNotification && (
                <div
                  id="toast-success"
                  className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow-2xl dark:text-gray-400 dark:bg-gray-800"
                  role="alert"
                >
                  <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="sr-only">Check icon</span>
                  </div>
                  {!addedToCart ? (
                    <div className="ms-3 text-sm font-normal">
                      Product Removed Successfully.
                    </div>
                  ) : (
                    <div className="ms-3 flex text-sm font-normal">
                      Product Added Successfully.
                      <button onClick={handleNavigate}>Go To CheckOut</button>
                    </div>
                  )}
                  <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                    data-dismiss-target="#toast-success"
                    aria-label="Close"
                    onClick={closeNotification}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <Rates productRates={productRates} />
      </section>
    </>
  );
}

export default ProductDetail;
