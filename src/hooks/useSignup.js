import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //use auth context
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      //throw error on fail
      if (!res) throw new Error("Couldn't complete sign up");

      //add display name to user
      await res.user.updateProfile({ displayName: displayName });

      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });

      //set error and pending back to default
      if (!isCancelled) {
        //update state
        setError(null);
        setIsPending(false);
      }

      //catch error
    } catch (err) {
      if (!isCancelled) {
        //update state
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  //catch error on page exit
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
