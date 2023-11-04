import axios from "axios";
import { Host } from "../../constantVariables.js";

const API_URL = `${Host}/api/todo`;

//register user
const fetchTasks = async (authToken) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authToken: authToken,
      },
    };
    const response = await axios.get(API_URL + "/getTasks", config);

    return response.data;
  } catch (err) {
    return { error: err.response.data };
  }
};

const authService = {
  fetchTasks,
};

export default authService;
