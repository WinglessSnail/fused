import { useMutation } from "convex/react";
import { useState } from "react";

export const useMutationState = (mutation: any) => {
  const [isPending, setIsPending] = useState(false);

  const mutationFn = useMutation(mutation);

  const mutate = (payload: any) => {
    setIsPending(true);
    return mutationFn(payload)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setIsPending(false));
  };
  return { isPending, mutate };
};
