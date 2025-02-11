import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return loggedInUser?.token || null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...loggedInUser, token: userToken })
    );
    setToken(userToken);
  };

  return { token, setToken: saveToken };
}
