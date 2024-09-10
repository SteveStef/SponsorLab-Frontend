import axios from "axios";

const request = async (url, req_method, body) => {
  try {
    let method = req_method.toUpperCase();
    if(method === 'GET' || method === "DELETE") {
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`},
        credentials: 'include',
      }
      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if(response.status === 401 && data.error && data.error === "Not authorized") {
        const parts = window.location.href.split("/");
        const path = "/" + parts[parts.length - 1];
        const validPaths = ["/login", "/", "/signup", "/terms-of-service", "/signup/youtuber", "signup/sponsor"];
        if(!validPaths.includes(path) && parts[parts.length-2] !== "authenticate") {
          window.location.href = "../../../signup";
        }
      }

      return data;
    } else if(method === 'POST' || method === 'PUT') {
      const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${getCookie()}`},
        credentials: 'include',
        body: JSON.stringify(body)
      }

      const response = await fetch(url, requestOptions);
      const data = await response.json();

      if(response.status === 401 && data.error && data.error === "Not authorized") {
        const parts = window.location.href.split("/");
        const path = "/" + parts[parts.length - 1];
        const validPaths = ["/login", "/", "/signup", "/terms-of-service", "/signup/youtuber", "signup/sponsor"];
        if(!validPaths.includes(path) && parts[parts.length-2] !== "authenticate") window.location.href = "../../../signup";
      }

      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function axiosRequest(url, req_method, body) {
  try {
    const opt = {
      method: req_method,
      url,
      credentials: 'include',
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${getCookie()}`,
      },
      data: body
    };
    return await axios(opt);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export function getCookie() {
  try {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; token=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  } catch (error) {
    console.log(error);
    return "";
  }
}

export default request;
