import { useState } from "react";
import { AddInventory } from "../../../../Services/inventoryApi";
import { AiOutlinePicture as Picture } from "react-icons/ai";
import { AddWareHouse } from "../../../../Services/wareHouseApi";

function AddWareHouseModal({ user, token, onClose }) {
  const userImage = "http://127.0.0.1:8000/uploads";
  const [image, setImage] = useState();
  const [WareHouse, setWareHouse] = useState({
    name: "",
    location: "",
    capacity: 0,
    image: "",
  });
  const HandleChangeInput = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "capacity" ? parseInt(value, 10) : value;

    setWareHouse({ ...WareHouse, [name]: parsedValue });
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setWareHouse({ ...WareHouse, image: e.target.files[0] });
  };
  const AddFournisseurWarehouse = async () => {
    const fileReader = new FileReader();
    fileReader.onloadend = async function () {
      const base64Image = fileReader.result.split(",")[1];
      const warehouseData = {
        name: WareHouse.name,
        location: WareHouse.location,
        capacity: WareHouse.capacity,
        image: base64Image,
      };
      try {
        await AddWareHouse(warehouseData, token);
        onClose();
      } catch (error) {
        console.error(error);
      }
    };
    if (image) {
      fileReader.readAsDataURL(image);
    }
  };
  return (
    <div className="w-80">
      <div className="flex items-center mb-4">
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
            Adding a new warehouse helps you manage inventory more efficiently
            and keep track of stock levels.
          </p>
        </div>
      </div>
      <div className="flex mr-1">
        <div className="mr-1">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-90 dark:text-white"
          >
            Warehouse Name
          </label>
          <input
            id="message"
            name="name"
            onChange={HandleChangeInput}
            className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Inventory Name"
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-90 dark:text-white"
          >
            Location
          </label>
          <input
            name="location"
            onChange={HandleChangeInput}
            type="text"
            className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="WareHouse Location here..."
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-90 dark:text-white"
        >
          Capacity
        </label>
        <input
          name="capacity"
          type="number"
          onChange={HandleChangeInput}
          className="block mb-2 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Write Your Inventory Capacity here..."
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="rounded-full bg-[#EBEBE5] p-6 w-3/5 md:p-5 lg:p-6 md:w-1/5">
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor={"image"}
            className="flex items-baseline justify-center"
          >
            <Picture className="text-black-2"></Picture>
          </label>
        </div>
        <button
          id="dropdownSearchButton"
          onClick={AddFournisseurWarehouse}
          className="text-white mr-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-[0.8rem] px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add WareHouse
        </button>
      </div>
    </div>
  );
}

export default AddWareHouseModal;
