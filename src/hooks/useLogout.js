import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  //use auth context
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    //sign user out
    try {
      await projectAuth.signOut();

      //dispatch logout action
      // no payload because new payload should be null
      await dispatch({ type: "LOGOUT" });

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

  return { error, isPending, logout };
};
