import { useMutation } from "@tanstack/react-query";
import {
  LoginModel,
  LoginResponseModel,
  RegisterModel,
} from "../../Utils/interfaces/loginInterfaces";
import { LoginClient } from "../backendApi/loginApi";

export const useLogin = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (model: LoginModel): Promise<LoginResponseModel> =>
      LoginClient.login(model),
    onSuccess,
  });

export const useRegisterUser = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (model: RegisterModel): Promise<LoginResponseModel> =>
      LoginClient.registerUser(model),
    onSuccess,
  });
