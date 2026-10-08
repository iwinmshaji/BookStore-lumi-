import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const status = error.response.status
      if (status == 401) {
        console.log("Unauthorized Access - Redirect to Login!!!!");
      } else if (status == 404) {
        console.log("API not Found!!");
      } else if (status == 500) {
        console.log("Server Error");
      }
    } else if (error.request) {
      console.log("No Response from Server....");
    } else {
      console.log(`Error: ${error.message}`);
    }
    return Promise.reject(error)
  }
)

export default axiosInstance