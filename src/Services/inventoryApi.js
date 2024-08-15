import axios from "axios";
import { apiURL } from "./Config/config";

export async function AddInventory(token, productId, warehouseId) {
  try {
    const response = await axios.post(
      `${apiURL.base}fournisseur/inventory/${productId}/${warehouseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function getAllInventories(token) {
  try {
    const response = await axios.get(
      `${apiURL.base}fournisseur/getInventories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function updateInventory(productId, quantity) {
  try {
    const response = await axios.post(
      `${apiURL.base}inventoryPay/${productId}/${quantity}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
