import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react';
import firebase from './firebase';

const authContext = createContext();

// Hook that enables any component to subscribe to auth state
export const useAuth = () => useContext(authContext);

const formatUser = ({ uid, photoURL, displayName }) => ({
  uid,
  photoURL,
  displayName,
});

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  const handleUser = (rawUser) => {
    if (rawUser) {
      // Get user object in format expected by front-end
      const formattedUser = formatUser(rawUser);
      setUser(formattedUser);
      return formattedUser;
    }
    setUser(false);
    return false;
  };

  const signinWithProvider = () => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((response) => handleUser(response.user));
  };

  useEffect(() => {
    // Subscribe to user on mount
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);
    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithProvider,
  };
}

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};
