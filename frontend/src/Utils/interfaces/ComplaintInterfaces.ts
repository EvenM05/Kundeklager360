import { CommentData } from "./CommentInterfaces";
import { UserData } from "./UserInterfaces";

export interface GetAllComplaintsData {
  id: string;
  customer: string;
  description: string;
  priority: number;
  status: number;
  complaintVariant: number;
  createDate: Date;
  updatedDate: Date;
  userId: string;
  user: UserData;
  comments: CommentData[];
}

export interface ComplaintPaginationData {
  totalComplaints: number;
  complaints: [GetAllComplaintsData];
}

export interface UpdateComplaintModel {
  customer?: string;
  description?: string;
  priority?: number;
  status?: number;
  complaintVariant?: number;
  updatedUserId?: string;
}

export interface CreateComplaintModel {
  customer: string;
  description: string;
  priority: number;
  status: number;
  complaintVariant: number;
  createdUserId: string;
  updatedUserId: string;
}
