import { createContext, useEffect, useState } from "react";

// Create a UserContext with an empty initial value
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Get the initial state from localStorage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [task, setTask] = useState([])

  // Persisting user data in localStorage when user state changes
  useEffect(()=>{
    if(user){
      localStorage.setItem("user",JSON.stringify(user));
    }else{
      localStorage.removeItem("user")
    }
  },[user])

  return (
    <UserContext.Provider value={{ user, setUser,task,setTask }}>
      {children}
    </UserContext.Provider>
  );
};
