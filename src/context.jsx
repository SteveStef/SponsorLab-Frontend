
"use client"
import { createContext, useContext, useState, useEffect } from "react";
import request from "@/request";
const AppContext = createContext();

export function AppWrapper({children}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [accountType, setAccountType] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [auth, setAuth] = useState(false);
  const [organization, setOrganization] = useState(false);

  async function fetchUser() {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/account`;
    const response = await request(url, "GET", null);
    console.log(response);
    if(!response || !response.success) return;
    setName(response.body.name);
    setEmail(response.body.email);
    setRole(response.body.role);
    //setAccountType(""); do this in model later and take out tags
    setOrganization(response.body.orginization);
    setAuth(true);
    setProfilePic(response.body.profileImage);
  }

  useEffect(() => {
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
