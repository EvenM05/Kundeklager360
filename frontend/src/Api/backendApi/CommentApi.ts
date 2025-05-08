import { CreateCommentData } from "../../Utils/interfaces/CommentInterfaces";
import http from "../http";

export class CommentClient {
  static baseUrl = "http://localhost:5089/api/Comment/";

  static async PostComment(model: CreateCommentData) {
    try {
      const result = await http.post(
        CommentClient.baseUrl + "CreateComment",
        model,
      );

      return result;
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  }
}
