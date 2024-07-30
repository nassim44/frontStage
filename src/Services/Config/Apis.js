import axios from "axios";
const apikey =
  "APY0LvimKjgLuKLMzkHIayFdX20dHQVLl3USZLRtOIEQ9n0lWRfUdsLKggWLMTGq";
export async function FetchAllCountries() {
  try {
    const response = await axios.get(
      `https://freetestapi.com/api/v1/countries`,
      {
        /* headers: {
            'apy-token': apikey
        }*/
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
