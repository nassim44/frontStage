import axios from "axios";
import { apiURL } from "./Config/config";

export async function FetchAllProducts() {
  try {
    const response = await axios.get(`${apiURL.base}product/`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function FetchProductById(productId) {
  try {
    const response = await axios.get(`${apiURL.base}product/${productId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function addProduct(productData,selectedCountries) {
  try {
    const Token = localStorage.getItem("token");
    const queryParams = new URLSearchParams({
      shippingRegions: selectedCountries.join(','),
    }).toString();
    const response = await axios.post(
      `${apiURL.base}fournisseur/product/new?${queryParams}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
