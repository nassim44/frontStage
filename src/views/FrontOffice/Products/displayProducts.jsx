import { useEffect, useState } from "react";
import { FetchAllProducts } from "../../../Services/productsApi";
import SectionTitle from "../HomePage/components/Common/SectionTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import AddWareHouseModal from "./updateProduct/addWareHouseModal";

const DisplayProducts = () => {
  const productImage = "http://127.0.0.1:8000/uploads";
  const userInfo = useSelector((state) => state.userInfo.user);
  const token = useSelector((state) => state.userInfo.token);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [openModalInventory, setOpenModalInventory] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose An Option");
  const GetAllProducts = async () => {
    try {
      const response = await FetchAllProducts();
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllProducts();
  }, []);

  const handleDetailClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };
  const handleUpdateClick = (productId) => {
    navigate(`/updateproduct/${productId}`);
  };
  const handleSelect = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "Add Product") {
      navigate("/addproduct");
    } else if (e.target.value === "Add Inventory") {
      setOpenModalInventory(true);
    }
  };
  return (
    <>
      <div className="container mt-10">
        <SectionTitle
          title="Our Latest Products"
          paragraph="There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form."
          center
        />

        {userInfo &&
          userInfo.roles &&
          userInfo.roles.includes("ROLE_FOURNISSEUR") && (
            <div className="flex sm:justify-between mb-5">
              <form className="max-w-sm ml-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select an option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={"Display All Products"}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option>Display All Products</option>
                  <option>Display Your Products</option>
                </select>
              </form>
              <form className="max-w-sm ml-10">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select an Add option
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={selectedOption}
                  onChange={(e) => handleSelect(e)}
                >
                  <option value="Choose An Option">Choose An Option</option>
                  <option value="Add Inventory">Add Inventory</option>
                  <option value="Add Product">Add Product</option>
                </select>
              </form>
            </div>
          )}
        {openModalInventory && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg relative">
              <AddWareHouseModal
                onClose={() => setOpenModalInventory(false)}
                user={userInfo}
                token={token}
              />
              <button
                className="absolute top-2 right-2 text-gray-600"
                onClick={() => setOpenModalInventory(false)}
              >
                &times;
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 xl:grid-cols-3">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="wow fadeInUp relative overflow-hidden rounded-3xl bg-white shadow-one dark:bg-dark shadow-2xl mb-10"
                  data-wow-delay=".1s"
                >
                  <a
                    className="relative block cursor-pointer h-[220px] w-full"
                    onClick={() => handleDetailClick(product.id)}
                  >
                    <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white">
                      {product.name}
                    </span>
                    <img
                      src={productImage + product.productImage}
                      style={{
                        maxHeight: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
                    <div
                      onClick={() => handleDetailClick(product.id)}
                      className="cursor-pointer"
                    >
                      <h3>
                        <a className="mb-4 block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">
                          {product.category.name}
                        </a>
                      </h3>
                      <p>Product Details : </p>
                      <p className="border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                        {product.description}
                      </p>
                    </div>
                    <div
                      className="flex justify-between cursor-pointer"
                      onClick={() => handleDetailClick(product.id)}
                    >
                      <p className="mt-4 border-b border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                        <span className="text-dark dark:text-black mr-2">
                          Stock:{" "}
                        </span>
                        {product.quantite}
                      </p>
                      <p className="mt-4 mb-2 border-b flex border-body-color border-opacity-10 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">
                        <span className="text-dark dark:text-black mr-2">
                          Price:
                        </span>
                        {product.prix}$
                      </p>
                    </div>
                    <div className="flex justify-between items-center mr-5 ">
                      <div className="flex items-center">
                        <div className="mr-5 flex items-center border-r border-body-color border-opacity-10 pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                          <div className="mr-2">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full">
                              <img
                                src={
                                  userInfo && userInfo.profileImage
                                    ? productImage + userInfo.profileImage
                                    : "/images/placeholder.png"
                                }
                                alt="author"
                              />
                            </div>
                          </div>
                          <div className="w-full">
                            <h4 className="mb-1 text-sm font-medium text-dark dark:text-white capitalize">
                              By {userInfo.LastName}
                            </h4>
                            <p className="text-xs text-body-color">bizerte</p>
                          </div>
                        </div>
                        <div className="inline-block">
                          <h4 className="mb-1 text-sm font-medium text-dark dark:text-white">
                            Expiration Date
                          </h4>
                          <p className="text-xs text-body-color">
                            {new Date(
                              product.dateExpiration
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        {userInfo &&
                          product &&
                          userInfo.id === product.productCreator?.id && (
                            <FaRegEdit
                              onClick={() =>
                                navigate(`/updateproduct`, {
                                  state: { product },
                                })
                              }
                            />
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No products available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayProducts;
