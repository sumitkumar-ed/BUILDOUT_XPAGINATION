import axios from "axios";

const API_URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

export const fetchData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // throw new Error('failed to fetch data');
    alert("Failed to fetch data. Please try again later.");
  }
};
