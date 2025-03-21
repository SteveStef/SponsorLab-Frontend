
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import request from "@/request";

const AppContext = createContext();

export function AppWrapper({children}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [accountType, setAccountType] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [auth, setAuth] = useState(false);
  const [organization, setOrganization] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState(null);
  const [deactivated, setDeactivated] = useState(null);
  
  async function fetchUser() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/account`;
    const response = await request(url, "GET", null);
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
    setDescription(response.body.bio);
    localStorage.setItem("description", response.body.bio);
    setDeactivated(response.body.deactivated);

    if(response.body.accountType === "GOOGLE") {
      setProfilePic(response.body.googleImage);
      localStorage.setItem("profilePic", response.body.googleImage);
    } else {
      setProfilePic(response.body.s3ImageName|| "");
      localStorage.setItem("profilePic", response.body.s3ImageName|| "");
    }

    if(response.body.role === "SPONSOR") {
      setCompany(response.body.company);
      setOrganization(response.body.company.id);
      localStorage.setItem("organization", response.body.company.id);
    } else if(response.body.role === "CREATOR"){
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
    //setAuth(localStorage.getItem("accountType") !== null);
    setOrganization(localStorage.getItem("organization") || "");
    setDescription(localStorage.getItem("description") || "");
    fetchUser();
  },[]);


  const state = {
    name, setName,
    role, setRole,
    accountType, setAccountType,
    profilePic, setProfilePic,
    auth, setAuth,
    organization, setOrganization,
    email, setEmail,
    description, setDescription,
    company, setCompany,
    deactivated, setDeactivated
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
