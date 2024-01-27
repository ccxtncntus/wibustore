import axios from "axios";
import { HOST } from "./DataEnv";

const request = axios.create({
  baseURL: HOST,
});
export const GET = async (path, options) => {
  try {
    const response = await request.get(path, options);
    return response.data;
  } catch (error) {
    console.error("Error in GET request:", error);
    throw error;
  }
};

export const POST = async (path, data, options) => {
  try {
    const response = await request.post(path, data, options);
    return response.data;
  } catch (error) {
    console.error("Error in POST request:", error);
    throw error;
  }
};

export const PUT = async (path, data, options) => {
  try {
    const response = await request.put(path, data, options);
    return response.data;
  } catch (error) {
    console.error("Error in PUT request:", error);
    throw error;
  }
};

export const PATCH = async (path, data, options) => {
  try {
    const response = await request.patch(path, data, options);
    return response.data;
  } catch (error) {
    console.error("Error in PATCH request:", error);
    throw error;
  }
};

export const DELETE = async (path, options) => {
  try {
    const response = await request.delete(path, options);
    return response.data;
  } catch (error) {
    console.error("Error in DELETE request:", error);
    throw error;
  }
};

export default request;
