import axios from "axios";
import { apiURL } from "./Config/config";

export async function AddSerialNumber(serialData, token, inventoryId) {
  try {
    console.log(inventoryId);
    const response = await axios.post(
      `${apiURL.base}fournisseur/serialnumber/${inventoryId}`,
      serialData,
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
