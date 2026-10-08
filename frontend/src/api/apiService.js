import axiosInstance from './axiosInstance'

const apiService = async (method, url, reqBody, reqHeader) => {
  const config = {
    method,
    url,
    data: reqBody,
    headers: reqHeader ? reqHeader : { "Content-Type": "application/json" }
  }

  try {
    const result = await axiosInstance(config)
    return result
  } catch (err) {
    return err
  }
}

export default apiService