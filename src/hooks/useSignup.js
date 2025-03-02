import { useMutation } from "@tanstack/react-query";
import { signup } from "../services/authService";

export function useSignup() {
  const mutation = useMutation({
    mutationFn: signup,
  });
  return mutation;
}
