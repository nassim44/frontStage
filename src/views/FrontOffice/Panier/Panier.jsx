import { useEffect, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RemoveFromWhishList } from "../../../Services/productsApi";
import SectionTitle from "../HomePage/components/Common/SectionTitle";
import { updateInventory } from "../../../Services/inventoryApi";

function Panier() {
  const userInfo = useSelector((state) => state.userInfo.user);
  const productImage = "http://127.0.0.1:8000/uploads";
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [Total, setTotal] = useState(0);

  useEffect(() => console.log(userInfo), [userInfo]);
  useEffect(() => {
    if (userInfo.WhishList) {
      const itemsWithQuantity = userInfo.WhishList.map((item) => ({
        ...item,
        quantity: 1,
      }));
      setCartItems(itemsWithQuantity);
    }
  }, [userInfo]);

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(() => {
    let tot = 0;
    let totShipping = 0;
    if (cartItems) {
      cartItems.forEach((item) => {
        tot += item.prix * item.quantity;
        totShipping += item.shippingCost;
      });
      setSubTotal(tot);
      setShippingCost(totShipping);
      setTotal(tot + totShipping);
    }
  }, [cartItems]);

  const handleIncrement = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeFromWishList = async (productId) => {
    try {
      await RemoveFromWhishList(userInfo.id, productId);
      const updatedCartItems = cartItems.filter(
        (item) => item.id !== productId
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.log(error);
    }
  };

  const HandleClickPayment = async () => {
    try {
      cartItems.map(async (item) => {
        await updateInventory(item.id, item.quantity);
        await RemoveFromWhishList(userInfo.id, item.id);
        const updatedCartItems = cartItems.filter(
          (product) => product.id !== item.id
        );
        setCartItems(updatedCartItems);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mt-10">
        <SectionTitle
          title="Your Shopping Cart"
          paragraph="Review the items in your cart before proceeding to checkout. Make sure you have everything you need. Your journey to a seamless shopping experience starts here!"
          center
        />
      </div>
      <div className="flex items-center mb-15 mt-15">
        <div className="w-3/5 p-10 ml-20">
          <h2 className="text-2xl font-bold mb-4 font-plusJakarta">
            Your Cart
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex-1 font-plusJakarta text-gray-400 font-semibold text-[0.8rem] tracking-wider">
                PRODUCT
              </div>
              <div className="w-24 font-plusJakarta mr-8 text-gray-400 font-semibold text-[0.8rem] tracking-wider text-center">
                STOCK
              </div>
              <div className="w-24 font-plusJakarta mr-8 text-gray-400 font-semibold text-[0.8rem] tracking-wider text-center">
                QUANTITY
              </div>
              <div className="w-24 font-plusJakarta mr-8 text-gray-400 font-semibold text-[0.8rem] tracking-wider text-center">
                PRICE
              </div>
              <div className="w-12"></div>
            </div>

            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => {
                let stock = 0;
                item.Inventories.map((inventory) => {
                  stock += inventory.quantity;
                });
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center gap-4 py-2 border-b"
                  >
                    <div className="flex items-center flex-1">
                      <img
                        src={productImage + item.productImage}
                        alt={item.name}
                        className="w-16 h-16 rounded-md border-r-amber-500"
                      />
                      <div className="ml-4">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">{item.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="w-24 flex justify-center">
                        <p className="font-medium">{stock}</p>
                      </div>
                      <div className="w-24 flex justify-center">
                        <form className="max-w-xs mx-auto">
                          <div className="relative flex items-center max-w-[8rem]">
                            <button
                              type="button"
                              id="decrement-button"
                              onClick={() => handleDecrement(item.id)}
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-2 h-2 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <input
                              type="text"
                              id="quantity-input"
                              data-input-counter
                              aria-describedby="helper-text-explanation"
                              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              value={item.quantity}
                              onChange={(e) =>
                                setCartItems((prevItems) =>
                                  prevItems.map((cartItem) =>
                                    cartItem.id === item.id
                                      ? {
                                          ...cartItem,
                                          quantity: Number(e.target.value),
                                        }
                                      : cartItem
                                  )
                                )
                              }
                              placeholder="1"
                              required
                            />
                            <button
                              type="button"
                              id="increment-button"
                              onClick={() => handleIncrement(item.id)}
                              className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-2 h-6 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            >
                              <svg
                                className="w-2 h-2 text-gray-900 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </div>
                      <div className="w-24 flex justify-center">
                        <p className="font-medium">
                          ${item.prix * item.quantity}
                        </p>
                      </div>
                      <div className="w-12 flex justify-center">
                        <button
                          onClick={() => removeFromWishList(item.id)}
                          className="hover:bg-gray-100 text-gray-700 font-bold py-2 px-2 rounded-md"
                        >
                          <RiDeleteBinLine color="gray" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          <div className="flex items-center my-4">
            <input
              type="text"
              className="w-fit px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={handleCouponChange}
            />
            <button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-[0.9rem] py-2 px-4 rounded-md font-plusJakarta">
              Apply Coupon
            </button>
          </div>
        </div>
        <div className="w-1/4 h-fit p-8 bg-gray-800 rounded-md text-white font-plusJakarta ">
          <h2 className="text-2xl font-bold mb-4 font ">Cart total</h2>
          <div className="mb-6 flex items-center justify-between">
            <p>Subtotal</p>
            <p className="font-bold ">${subTotal}</p>
          </div>
          <hr
            className="mb-6 w-full"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.25)" }}
          />{" "}
          <div className=" mb-6 flex items-center justify-between">
            <p>Tax</p>
            <p className="font-bold">$0</p>
          </div>
          <hr
            className="mb-6 w-full"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.25)" }}
          />{" "}
          <div className="mb-2 flex items-center justify-between">
            <p>Shipping</p>
            <p className="font-bold">${shippingCost}</p>
          </div>
          <p className="text-gray-500 mb-6 text-sm">
            Free shipping on orders over $50. Estimated delivery time: 3-5
            business days.
          </p>
          <hr
            className="mb-6 w-full"
            style={{ borderTop: "1px solid rgba(255, 255, 255, 0.25)" }}
          />{" "}
          <div className="mb-6 flex items-center justify-between">
            <p>Total</p>
            <p className="font-bold">${Total}</p>
          </div>
          <button
            onClick={HandleClickPayment}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 px-4 rounded-md w-full"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default Panier;
