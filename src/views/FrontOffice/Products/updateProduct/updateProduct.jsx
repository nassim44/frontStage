import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addProduct, FetchProductById } from "../../../../Services/productsApi";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FetchAllCategories } from "../../../../Services/categoryApi";
import SectionTitle from "../../HomePage/components/Common/SectionTitle";
import { FetchAllCountries } from "../../../../Services/Config/Apis";
import { IoAdd } from "react-icons/io5";
import { IoIosRemove } from "react-icons/io";

const steps = [
  {
    id: "Step 1",
    name: "Product Information",
    fields: ["name", "nameAbbreviation", "country", "state", "city", "image"],
  },
  {
    id: "Step 2",
    name: "Specifications and Pricing",
    fields: ["description", "slogan", "nickname", "foundedIn", "founder"],
  },
  {
    id: "Step 3",
    name: "Final Details",
    fields: [""],
  },
];
const Types = [
  {
    "Medical Equipment": [
      "Hospital Furniture",
      "Laboratory Equipment",
      "Patient Monitoring Systems",
      "Rehabilitation Equipment",
    ],
  },
  {
    Pharmaceuticals: [
      "Vaccines",
      "Antibiotics",
      "Pain Relievers",
      "Prescription Drugs",
      "Antivirals",
    ],
  },
  {
    Consumables: [
      "Bandages and Dressings",
      "Syringes and Needles",
      "Disinfectants and Sanitizers",
      "Prescription Drugs",
    ],
  },
  {
    "Home Healthcare": [
      "Hygiene supplies",
      "Infection control and prevention supplies",
    ],
  },
];
const UpdateProduct = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [Categories, setCategories] = useState([]);
  const [Countries, setCountries] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [showAddFeature, setShowAddFeature] = useState(false);
  const [filteredProductTypes, setFilteredProductTypes] = useState([]);
  const [dropdown, setDropdown] = useState(false);
  const [inputs, setInputs] = useState([{ id: 1, value: "" }]);
  const [Product, setProduct] = useState({
    name: state.product?.name,
    description: state.product?.description,
    dateExpiration: new Date(),
    quantite: state.product?.quantite,
    prix: state.product?.prix,
    image: state.product?.image,
    productCreator: state.product?.productCreator,
    category: state.product?.category,
    productType: state.product?.productType,
    Brand: state.product?.Brand,
    serialNumber: state.product?.serialNumber,
    shippingMethod: state.product?.shippingMethod,
    shippingCost: state.product?.shippingCost,
    handlingTime: state.product?.handlingTime,
  });
  const userInfo = useSelector((state) => state.userInfo.user);
  const [image, setImage] = useState();
  const handleCheckboxChange = (event, country) => {
    if (event.target.checked) {
      setSelectedCountries([...selectedCountries, country]);
    } else {
      setSelectedCountries(
        selectedCountries.filter((item) => item !== country)
      );
    }
  };
  useEffect(() => {
    const convertToArray = inputs.map((input) => input.value);
    setFeatures(convertToArray);
  }, [inputs]);
  const handleChange = (e) => {
    const value =
      e.target.name === "quantite" ? parseInt(e.target.value) : e.target.value;
    setProduct({ ...Product, [e.target.name]: value });
  };
  const GetAllCategories = async () => {
    try {
      const response = await FetchAllCategories();
      setCategories(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllCategories();
  }, []);
  const GetAllCountry = async () => {
    try {
      const response = await FetchAllCountries();
      setCountries(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetAllCountry();
  }, []);
  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    fileReader.onloadend = async function () {
      const base64Image = fileReader.result.split(",")[1];
      const imageData = {
        name: Product.name,
        description: Product.description,
        dateExpiration: Product.dateExpiration,
        quantite: Product.quantite,
        prix: parseFloat(Product.prix),
        image: base64Image,
        category: Product.category,
        productCreator: userInfo.id,
        productType: Product.productType,
        Brand: Product.Brand,
        serialNumber: Product.serialNumber,
        shippingMethod: Product.shippingMethod,
        shippingCost: parseFloat(Product.shippingCost),
        handlingTime: Product.handlingTime,
      };
      try {
        const response = await addProduct(
          imageData,
          selectedCountries,
          Features
        );
        console.log("Utilisateur inscrit avec succès:", response);
        navigate("/products");
      } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur:", error);
      }
    };
    if (image) {
      fileReader.readAsDataURL(image);
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setProduct({ ...Product, image: e.target.files[0] });
  };
  const handleCategoryChange = (event) => {
    const selectedCategoryName =
      event.target.options[event.target.selectedIndex].dataset.name;
    const selectedCategoryId = event.target.value;
    setProduct((prevProduct) => ({
      ...prevProduct,
      category: selectedCategoryId,
    }));
    const selectedCategoryTypes =
      Types.find((type) => type[selectedCategoryName])?.[
        selectedCategoryName
      ] || [];

    setFilteredProductTypes(selectedCategoryTypes);
  };
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const next = async () => {
    try {
      if (currentStep < steps.length - 1) {
        setPreviousStep(currentStep);
        setCurrentStep((step) => step + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };
  const handleAddInput = () => {
    setInputs([...inputs, { id: inputs.length + 1, value: "" }]);
  };

  const handleRemoveInput = (id) => {
    setInputs(inputs.filter((input) => input.id !== id));
  };

  const handleInputChange = (id, newValue) => {
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, value: newValue } : input
      )
    );
  };
  return (
    <>
      <section className="relative z-10 overflow-hidden pt-10 pb-16 md:pb-20 lg:pb-28">
        <div className="container">
          <SectionTitle title="Update Your Product Products" center />
          <nav aria-label="Progress" className="mb-10">
            <ol
              role="list"
              className="space-y-4 md:flex md:space-x-8 md:space-y-0"
            >
              {steps.map((step, index) => (
                <li key={step.name} className="md:flex-1">
                  {currentStep > index ? (
                    <div className="group flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-sky-600 transition-colors ">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  ) : currentStep === index ? (
                    <div
                      className="flex w-full flex-col border-l-4 border-sky-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
                      aria-current="step"
                    >
                      <span className="text-sm font-medium text-sky-600">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  ) : (
                    <div className="group flex w-full flex-col border-l-4 border-gray-200 py-2 pl-4 transition-colors md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                      <span className="text-sm font-medium text-gray-500 transition-colors">
                        {step.id}
                      </span>
                      <span className="text-sm font-medium">{step.name}</span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          {currentStep === 0 && (
            <>
              <div className="-mx-4 flex justify-center flex-wrap">
                <div className="w-full px-4 xl:w-8/12">
                  <div className="mx-auto rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      Product Information
                    </h3>
                    <p className="mb-11 text-center text-base font-medium text-body-color">
                      Provide the details for your product Information
                    </p>

                    <form encType="multipart/form-data">
                      <div className="mb-5 flex w-full space-x-2">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            {" "}
                            Product Name{" "}
                          </label>
                          <input
                            type="text"
                            name="name"
                            defaultValue={Product.name}
                            placeholder="Product Name"
                            onChange={(e) => handleChange(e)}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            {" "}
                            Expiration Date{" "}
                          </label>
                          <input
                            type="date"
                            name="dateExpiration"
                            placeholder="dateExpiration"
                            defaultValue={Product.dateExpiration}
                            onChange={handleChange}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="email"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Description{" "}
                        </label>
                        <textarea
                          name="description"
                          placeholder="Product Description"
                          defaultValue={Product.description}
                          onChange={handleChange}
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                      <div className="mb-8 flex">
                        <select
                          id="countries"
                          onChange={handleCategoryChange}
                          value={Product.category.id}
                          className="bg-gray-50 border mr-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>Choose a Category</option>
                          {Categories.map((category) => (
                            <option
                              key={category.id}
                              value={category.id}
                              data-name={category.name}
                            >
                              {category.name}
                            </option>
                          ))}
                        </select>

                        <select
                          id="product-types"
                          name="productType"
                          onChange={handleChange}
                          value={Product.productType}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option>Choose Product Type</option>
                          {filteredProductTypes.map((type, index) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-8">
                        <label
                          htmlFor="password"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          {" "}
                          Your Product Image{" "}
                        </label>
                        <input
                          type="file"
                          name="image"
                          onChange={handleFileChange}
                          placeholder="Enter your Password"
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="-mx-4 flex justify-center flex-wrap">
                <div className="w-full px-4 xl:w-8/12">
                  <div className="mx-auto rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                    <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                      Specifications and Pricing
                    </h3>
                    <p className="mb-11 text-center text-base font-medium text-body-color">
                      Provide the details for your product Specifications and
                      Pricing
                    </p>
                    <form encType="multipart/form-data">
                      <div className="mb-5 flex w-full space-x-2">
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            {" "}
                            Brand{" "}
                          </label>
                          <input
                            type="text"
                            name="Brand"
                            defaultValue={Product.Brand}
                            placeholder="Brand Name"
                            onChange={(e) => handleChange(e)}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                        <div className="w-full">
                          <label
                            htmlFor="name"
                            className="mb-3 block text-sm font-medium text-dark dark:text-white"
                          >
                            {" "}
                            Serial Number{" "}
                          </label>
                          <input
                            type="number"
                            name="serialNumber "
                            placeholder="Serial Number"
                            onChange={handleChange}
                            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                          />
                        </div>
                      </div>

                      <div className="mb-8 flex space-x-2">
                        <input
                          type="number"
                          name="prix"
                          defaultValue={Product.prix}
                          placeholder="Price"
                          onChange={handleChange}
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                        <input
                          type="number"
                          name="quantite"
                          placeholder="Stock"
                          defaultValue={Product.quantite}
                          onChange={handleChange}
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                      <div>
                        <hr className="border-1 my-2" />
                        <p
                          className="mb-5 text-base font-medium text-body-color"
                          id="formP"
                        >
                          Add your Product Features
                        </p>
                        <label className="inline-flex items-center cursor-pointer mb-2">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            onClick={() =>
                              setShowAddFeature((prevState) => !prevState)
                            }
                          />
                          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Add New Features
                          </span>
                        </label>
                        {showAddFeature && (
                          <>
                            <div>
                              {inputs.map((input) => (
                                <div
                                  className="flex items-center mb-2"
                                  key={input.id}
                                >
                                  <input
                                    type="text"
                                    name={`feature-${input.id}`}
                                    placeholder="Add feature"
                                    value={input.value}
                                    onChange={(e) =>
                                      handleInputChange(
                                        input.id,
                                        e.target.value
                                      )
                                    }
                                    className="w-full mr-4 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                                  />
                                  <button
                                    id="dropdownSearchButton"
                                    className="text-white mr-2 bg-red-500 hover:bg-red-700 focus:outline-none font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => handleRemoveInput(input.id)}
                                  >
                                    <IoIosRemove size={15} />
                                  </button>
                                </div>
                              ))}
                              <button
                                id="dropdownSearchButton"
                                className="text-white mr-2 bg-blue-700 hover:bg-blue-800  focus:outline-none font-medium rounded-lg text-sm px-2.5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleAddInput}
                                type="button"
                              >
                                <IoAdd size={15} />
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <div className="-mx-4 flex justify-center flex-wrap">
              <div className="w-full px-4 xl:w-8/12">
                <div className="mx-auto rounded-md bg-primary bg-opacity-5 py-10 px-6 dark:bg-dark sm:p-[60px]">
                  <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                    Shipping Information
                  </h3>
                  <p className="mb-11 text-center text-base font-medium text-body-color">
                    Provide the details for shipping your product
                  </p>

                  <form encType="multipart/form-data">
                    <div className="mb-5 flex w-full space-x-2">
                      <div className="w-full">
                        <label
                          htmlFor="shippingMethod"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Shipping Method
                        </label>
                        <select
                          id="shippingMethod"
                          name="shippingMethod"
                          value={Product.shippingMethod}
                          onChange={handleChange}
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        >
                          <option value="">Choose a Shipping Method</option>
                          <option value="standard">Standard Shipping</option>
                          <option value="expedited">Expedited Shipping</option>
                          <option value="two_day">Two-Day Shipping</option>
                          <option value="overnight">Overnight Shipping</option>
                          <option value="same_day">Same-Day Delivery</option>
                          <option value="international">
                            International Shipping
                          </option>
                          <option value="local_pickup">Local Pickup</option>
                        </select>
                      </div>
                      <div className="w-full">
                        <label
                          htmlFor="shippingCost"
                          className="mb-3 block text-sm font-medium text-dark dark:text-white"
                        >
                          Shipping Cost
                        </label>
                        <input
                          type="number"
                          name="shippingCost"
                          defaultValue={Product.shippingCost}
                          placeholder="Shipping Cost"
                          onChange={handleChange}
                          className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                        />
                      </div>
                    </div>

                    <div className="mb-8">
                      <label
                        htmlFor="handlingTime"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Handling Time
                      </label>
                      <input
                        type="text"
                        name="handlingTime"
                        placeholder="Handling Time (e.g., 1-2 business days)"
                        onChange={handleChange}
                        defaultValue={Product.handlingTime}
                        className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
                      />
                    </div>
                    <div className="mb-8 absolute">
                      {Countries && Countries.length > 0 && (
                        <>
                          <button
                            id="dropdownSearchButton"
                            data-dropdown-toggle="dropdownSearch"
                            data-dropdown-placement="bottom"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            type="button"
                            onClick={() => setDropdown(!dropdown)}
                          >
                            Regions/Countries Serviced{" "}
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
                          {dropdown && (
                            <>
                              <div
                                id="dropdownSearch"
                                className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
                              >
                                <ul
                                  className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownSearchButton"
                                >
                                  {Countries.map((country, index) => {
                                    return (
                                      <li key={index}>
                                        <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                          <input
                                            id={`checkbox-item-${index}`}
                                            type="checkbox"
                                            value={country.name}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            onChange={(e) =>
                                              handleCheckboxChange(
                                                e,
                                                country.name
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={`checkbox-item-${index}`}
                                            className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                          >
                                            {country.name}
                                          </label>
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-around mt-5">
            <button
              type="button"
              onClick={prev}
              disabled={currentStep === 0}
              className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            {currentStep !== steps.length - 1 ? (
              <button
                type="button"
                onClick={next}
                disabled={currentStep === steps.length - 1}
                className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : (
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex justify-center duration-80 mb-4 w-50 cursor-pointer rounded-md border border-transparent bg-primary py-3 px-6 text-center text-base font-medium text-white outline-none transition ease-in-out hover:bg-opacity-80 hover:shadow-signUp focus-visible:shadow-none"
                  onClick={handleSubmitProduct}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default UpdateProduct;
