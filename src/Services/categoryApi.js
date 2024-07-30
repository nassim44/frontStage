import axios from "axios";
import { apiURL } from "./Config/config";

export async function FetchAllCategories() {
    try {
      const response = await axios.get(`${apiURL.base}categories/`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }