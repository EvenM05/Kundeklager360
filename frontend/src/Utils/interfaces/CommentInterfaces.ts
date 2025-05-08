import { UserData } from "./UserInterfaces";

export interface CommentData {
  id: string;
  commentString: string;
  createDate: string;
  complaintId: string;
  userId: string;
  user: UserData;
}

export interface CreateCommentData {
  commentString: string;
  userId: string;
  complaintId: string;
}
