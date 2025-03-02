import { useMutation } from "@tanstack/react-query";
import { signin } from "../services/authService";

export function useSignin() {
  const mutation = useMutation({ mutationFn: signin });
  return mutation;
}
