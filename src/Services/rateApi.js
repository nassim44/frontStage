import axios from "axios";
import { apiURL } from "./Config/config";

export async function addReview(rateData, productId, userId) {
  try {
    const response = await axios.post(
      `${apiURL.base}rate/${productId}/${userId}`,
      rateData
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function getRate(productId) {
  try {
    const response = await axios.get(
      `${apiURL.base}getproductrate/${productId}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
