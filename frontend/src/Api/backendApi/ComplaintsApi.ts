import {
  ComplaintPaginationData,
  CreateComplaintModel,
  GetAllComplaintsData,
  UpdateComplaintModel,
} from "../../Utils/interfaces/ComplaintInterfaces";
import { retrieveFromStorage } from "../../Utils/localStorage";
import http from "../http";

export class ComplaintClient {
  static baseUrl = "http://localhost:5089/api/Complaint/";

  static async CreateComplaint(model: CreateComplaintModel) {
    try {
      const result = await http.post(
        ComplaintClient.baseUrl + "CreateComplaint",
        model,
      );

      return result;
    } catch (error) {
      console.error("Error creating this: ", error);
    }
  }

  static async UpdateComplaint(id: string, model: UpdateComplaintModel) {
    try {
      const result = await http.put(
        ComplaintClient.baseUrl + `UpdateComplaint?id=${id}`,
        model,
      );
      return result;
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  }

  static async getAllComplaints() {
    try {
      const result = await http.get(
        ComplaintClient.baseUrl + "GetAllComplaints",
      );

      const data: GetAllComplaintsData[] = result.data;
      return data;
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  }

  static async getComplaintPagination(
    searchValue = "",
    page: string | number,
    pageSize: string | number,
    sortOrder: string,
    statusFilter = 0,
    priorityFilter = 0,
    variantFilter = 0,
  ) {
    try {
      const result = await http.get(
        ComplaintClient.baseUrl +
          `GetComplaintPagination?searchValue=${searchValue}&page=${page}&pageSize=${pageSize}&sortOrder=${sortOrder}&statusFilter=${statusFilter}&priorityFilter=${priorityFilter}&variantFilter=${variantFilter}`,
      );

      const data: ComplaintPaginationData = result.data;
      return data;
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  }

  static async getComplaintById(id: string) {
    try {
      const result = await http.get(
        ComplaintClient.baseUrl + `GetComplaintById?id=${id}`,
      );

      const data: GetAllComplaintsData = result.data;
      return data;
    } catch (error) {
      console.error("Error getting data: ", error);
    }
  }
}
