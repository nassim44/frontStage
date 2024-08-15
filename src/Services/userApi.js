import axios from "axios";
import { apiURL } from "./Config/config";

export async function signup(userData) {
  try {
    const response = await axios.post(`${apiURL.base}signup`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function signIn(userData) {
  try {
    const response = await axios.post(`${apiURL.base}api/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function findUserByMail(email) {
  try {
    const response = await axios.get(`${apiURL.base}finduserbyemail/${email}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function LikeProduct(idUser, idProduct) {
  try {
    const response = await axios.post(
      `${apiURL.base}Like/${idProduct}/${idUser}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
export async function RemoveLikedProduct(idUser, idProduct) {
  try {
    const response = await axios.post(
      `${apiURL.base}unLike/${idProduct}/${idUser}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
