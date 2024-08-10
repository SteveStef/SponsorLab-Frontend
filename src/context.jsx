
"use client"
import { createContext, useContext, useState, useEffect } from "react";
import request, { getCookie } from "@/request";
const AppContext = createContext();

export function AppWrapper({children}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accountType, setAccountType] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [auth, setAuth] = useState(false);
  const [organization, setOrganization] = useState("");

  async function fetchUser() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/account`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(!response || !response.success) {
      setAuth(false);
      return;
    }

    setName(response.body.name);
    localStorage.setItem("name", response.body.name);
    setEmail(response.body.email);
    setRole(response.body.role);
    localStorage.setItem("role", response.body.role);
    setAccountType(response.body.accountType);
    localStorage.setItem("accountType", response.body.accountType);

    if(response.body.accountType === "GOOGLE") {
      setProfilePic(response.body.googleImage);
      localStorage.setItem("profilePic", response.body.googleImage);
    } else {
      setProfilePic(response.body.profileImage || "");
      localStorage.setItem("profilePic", response.body.profileImage || "");
    }

    if(response.body.role === "SPONSOR") {
      setOrganization(response.body.company.orginization);
      localStorage.setItem("organization", response.body.company.orginization);
    } else {
      setOrganization(response.body.channel.name);
      localStorage.setItem("organization", response.body.channel.name);
    }
    setAuth(true);
  }



  useEffect(() => {
  setName(localStorage.getItem("name") || "");
  setRole(localStorage.getItem("role") || "");
  setAccountType(localStorage.getItem("accountType") || "");
  setProfilePic(localStorage.getItem("profilePic") || "");
  setAuth(localStorage.getItem("accountType") !== null);
  setOrganization(localStorage.getItem("organization") || "");
    fetchUser();
  },[]);

  const state = {
    name, setName,
    role, setRole,
    accountType, setAccountType,
    profilePic, setProfilePic,
    auth, setAuth,
    organization, setOrganization,
    email, setEmail
  }

  return (
    <AppContext.Provider value={state}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext);
}