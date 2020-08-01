
import React, { useState, useEffect, useContext, createContext } from "react";
import firebase from "./firebase";
// import { createUser } from "./db";

const authContext = createContext();

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook that enables any component to subscribe to auth state
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
    const [user, setUser] = useState(null);

    // Handle a new user object (updates db and sets user state)
    const handleUser = (rawUser) => {
        if (rawUser) {
            // Get user object in format expected by front-end
            const user = formatUser(rawUser);

            setUser(user);
            return user;
        } else {
            setUser(false);
            return false;
        }
    };

    const signinWithProvider = () => {
        const provider = new firebase.auth.GoogleAuthProvider();

        return firebase
            .auth()
            .signInWithPopup(provider)
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

// Format user object
// If there are extra fields you want from the original user
// object then you'd add those here.
const formatUser = ({ uid, photoURL, displayName }) => {
    return { uid, photoURL, displayName };
};
