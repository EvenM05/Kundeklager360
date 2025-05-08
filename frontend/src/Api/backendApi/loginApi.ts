import { LoginModel } from "../../Utils/interfaces/loginInterfaces";
import http from "../http";

export class LoginClient {
  static baseURL = "http://localhost:5089/api/";

  static async login(model: LoginModel) {
    try {
      const result = await http.post(
        LoginClient.baseURL + "Login/LoginUser",
        model,
      );

      return result.data;
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }

  static async registerUser(model: LoginModel) {
    try {
      const result = await http.post(
        LoginClient.baseURL + "User/CreateUser",
        model,
      );

      return result.data;
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  }
}
