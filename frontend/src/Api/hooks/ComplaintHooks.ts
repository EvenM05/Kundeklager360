import { useMutation, useQuery } from "@tanstack/react-query";
import {
  GET_ALL_COMPLAINTS_QUERY_KEY,
  GET_COMPLAINT_BY_ID_QUERY_KEY,
  GET_COMPLAINT_PAGINATION,
} from "../constants";
import { ComplaintClient } from "../backendApi/ComplaintsApi";
import {
  CreateComplaintModel,
  UpdateComplaintModel,
} from "../../Utils/interfaces/ComplaintInterfaces";

export const useCreateComplaint = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (model: CreateComplaintModel) =>
      ComplaintClient.CreateComplaint(model),
    onSuccess,
  });

export const useUpdateComplaint = (onSuccess: () => void) =>
  useMutation({
    mutationFn: (model: { id: string; data: UpdateComplaintModel }) =>
      ComplaintClient.UpdateComplaint(model.id, model.data),
    onSuccess,
  });

export const useGetAllComplaints = () =>
  useQuery({
    queryKey: [GET_ALL_COMPLAINTS_QUERY_KEY],
    queryFn: () => ComplaintClient.getAllComplaints(),
  });

export const useGetComplaintById = (id: string) =>
  useQuery({
    queryKey: [GET_COMPLAINT_BY_ID_QUERY_KEY, id],
    queryFn: () => ComplaintClient.getComplaintById(id),
  });

export const useGetComplaintPagination = (
  page: string | number,
  rowsPerPage: string | number,
  searchValue: string,
  sortOrder: string,
  statusFilter: number,
  priorityFilter: number,
  variantFilter: number,
) => {
  return useQuery({
    queryKey: [
      GET_COMPLAINT_PAGINATION,
      searchValue,
      page,
      rowsPerPage,
      sortOrder,
      statusFilter,
      priorityFilter,
      variantFilter,
    ],
    queryFn: () =>
      ComplaintClient.getComplaintPagination(
        searchValue,
        page,
        rowsPerPage,
        sortOrder,
        statusFilter,
        priorityFilter,
        variantFilter,
      ),
  });
};
