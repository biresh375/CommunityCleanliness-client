import React, { useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

const AuthProvider = ({ children }) => {
  const googleprovider = new GoogleAuthProvider();
  const [user, setUser] = useState(null); // store user info
  const [loading, setLoading] = useState(true);
  const [issues, setIssues] = useState([]);
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleprovider);
  };
  const creatUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const update = (object) => {
    return updateProfile(auth.currentUser, object);
  };
  const singIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    setLoading,
    loading,
    setUser,
    user,
    googleSignIn,
    logOut,
    singIn,
    update,
    creatUser,
    setIssues,
    issues,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
