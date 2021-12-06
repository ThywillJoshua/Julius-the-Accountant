import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //use auth context
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign user out
    try {
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //dispatch logout action
      await dispatch({ type: "LOGIN", payload: res.user });

      if (!isCancelled) {
        //update state
        setError(null);
        setIsPending(false);
      }

      //catch error
    } catch (error) {
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

  return { error, isPending, login };
};
