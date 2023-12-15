import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth, provider } from "../firebase-config";
export const UserContext = React.createContext();
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //Logout handler
  function handleSignOutButton() {
    signOut(auth);
  }

  //google SSO
  function handleGoogleAuthClick() {
    signInWithPopup(auth, provider).then((data) => {
      setUser(data.user.displayName);
    });
  }
  const values = { user, setUser, handleGoogleAuthClick, handleSignOutButton };
  return (
    <>
      <UserContext.Provider value={values}>{children}</UserContext.Provider>
    </>
  );
}
export default UserContext;
