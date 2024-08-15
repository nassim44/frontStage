import axios from "axios";
import { apiURL } from "./Config/config";

export async function AddWareHouse(wareHouseData, token) {
  try {
    const response = await axios.post(
      `${apiURL.base}fournisseur/warehouse`,
      wareHouseData,
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
export async function getAllWareHouses(token) {
  try {
    const response = await axios.get(`${apiURL.base}fournisseur/getWarehouses`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
