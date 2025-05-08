import { useMutation } from "@tanstack/react-query";
import { CreateCommentData } from "../../Utils/interfaces/CommentInterfaces";
import { CommentClient } from "../backendApi/CommentApi";

export const usePostComment = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (model: CreateCommentData) => CommentClient.PostComment(model),
    onSuccess,
  });
