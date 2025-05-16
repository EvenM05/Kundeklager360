import { useMutation } from "@tanstack/react-query";
import {
  LoginModel,
  LoginResponseModel,
  RegisterModel,
} from "../../Utils/interfaces/loginInterfaces";
import { LoginClient } from "../backendApi/loginApi";

export const useLogin = () =>
  useMutation({
    mutationFn: (model: LoginModel): Promise<LoginResponseModel> =>
      LoginClient.login(model),
  });

export const useRegisterUser = () =>
  useMutation({
    mutationFn: (model: RegisterModel): Promise<LoginResponseModel> =>
      LoginClient.registerUser(model),
  });
