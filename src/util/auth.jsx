import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import firebase from './firebase';

const authContext = createContext({});

// Hook that enables any component to subscribe to auth state
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

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = async (rawUser) => {
    if (rawUser) {
      const accessToken = await rawUser.getIdToken(true);
      const { claims } = await firebase.auth().currentUser.getIdTokenResult(true);
      const { admin = false } = claims.data || {};
      const formattedUser = formatUser(rawUser, accessToken, { admin });
      setUser(formattedUser);
      return formattedUser;
    }
    setUser(false);
    return false;
  };

  const signInWithProvider = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((response) => handleUser(response.user));
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    // Subscribe to user on mount
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithProvider,
    signOut,
  };
}

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};
