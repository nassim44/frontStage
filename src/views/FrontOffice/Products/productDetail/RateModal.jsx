import { useEffect, useState } from "react";
import { addReview } from "../../../../Services/rateApi";

function RateModal({ user, hoverRating, rating, product, onClose }) {
  const userImage = "http://127.0.0.1:8000/uploads";
  const [Rate, setRate] = useState({
    Stars: rating,
    Review: "",
    CreatedAt: new Date(),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRate({ ...Rate, [name]: value });
  };

  const addNewreview = async () => {
    try {
      setRate({ ...Rate, CreatedAt: new Date() });
      await addReview(Rate, product.id, user.id);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-80">
        <div className="flex items-center">
          <img
            src={userImage + user?.profileImage}
            alt="User Profile"
            className="rounded-full w-12 h-12 mr-3"
          />
          <div className="font-plusJakarta font-medium text-[0.9rem]">
            {user.LastName.charAt(0).toUpperCase() +
              user.LastName.slice(1).toLowerCase()}{" "}
            {user.FirstName.charAt(0).toUpperCase() +
              user.FirstName.slice(1).toLowerCase()}
            <p className="text-gray-400 text-[0.8rem] font-plusJakarta">
              Reviews are public and include information about your account.
            </p>
          </div>
        </div>
        <div className="space-x-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="star"
              style={{
                fontSize: "35px",
                color: (hoverRating || rating) >= star ? "gold" : "gray",
              }}
            >
              ★
            </span>
          ))}
        </div>
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-90 dark:text-white"
        >
          Your Review
        </label>
        <textarea
          id="message"
          name="Review"
          rows="4"
          className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write your Review here..."
          onChange={handleInputChange}
        ></textarea>
        <button
          id="dropdownSearchButton"
          onClick={addNewreview}
          className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-[0.8rem] px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Publish
        </button>
      </div>
    </>
  );
}

export default RateModal;
