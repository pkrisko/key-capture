import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth, googleProvider } from '../util/firebase';
import { signInWithPopup, onAuthStateChanged, signOut, getIdToken, getIdTokenResult } from 'firebase/auth';

const authContext = createContext({});

export const useAuthContext = () => useContext(authContext);

const formatUser = (rawUser = {}, accessToken = '', admin) => ({
  uid: rawUser.uid,
  photoURL: rawUser.photoURL,
  displayName: rawUser.displayName,
  tokens: {
    refreshToken: rawUser.refreshToken,
    accessToken,
  },
  admin,
});

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const accessToken = await getIdToken(rawUser);
      const { claims } = await getIdTokenResult(rawUser, true);
      const { admin = false } = claims.data || {};
      const formattedUser = formatUser(rawUser, accessToken, admin);
      setUser(formattedUser);
      return formattedUser;
    }
    setUser(false);
    return false;
  };

  const signInWithProvider = () => {
    return signInWithPopup(auth, googleProvider)
      .then((response) => handleUser(response.user));
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser);
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithProvider,
    signOut: signOutUser,
  };
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};
