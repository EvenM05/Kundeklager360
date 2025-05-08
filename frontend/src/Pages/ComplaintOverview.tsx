import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TablePagination,
  Typography,
  Grid,
  Drawer,
  Select,
  MenuItem,
  Dialog,
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Container,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import { useGetComplaintPagination } from "../Api/hooks/ComplaintHooks";
import { ErrorPage } from "../Utils/ErrorPage";
import { useSearchParams } from "react-router-dom";
import { ComplaintPriority } from "../Components/ComplaintPriority";
import { ComplaintStatus } from "../Components/ComplaintStatus";
import { ComplaintDialog } from "../Components/ComplaintDialog";
import useDebounce from "../Utils/useDebounce";
import { OverviewAppbar } from "../Components/OverviewAppbar";
import {
  priorityIntToEnum,
  statusIntToEnum,
  variantIntToEnum,
} from "../Utils/Enums";
import { CreateComplaintDialog } from "../Components/CreateComplaint";
import { retrieveFromStorage } from "../Utils/localStorage";

export enum ComplaintVariant {
  Product = "product",
  CustomerService = "customer_service",
  Delivery = "delivery",
  Other = "other",
}
const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return "#e3f2fd";
    case 2:
      return "#fff8e1";
    case 3:
      return "#e8f5e9";
    default:
      return "#f5f5f5";
  }
};

const getPriorityColor = (priority: number) => {
  switch (priority) {
    case 1:
      return "#2e7d32";
    case 2:
      return "#ff9800";
    case 3:
      return "#d32f2f";
    default:
      return "#757575";
  }
};

export default function ComplaintOverview() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [dialogId, setDialogId] = useState<string>("");
  const [dialogString, setDialogString] = useState<string>("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const drawerWidth = 280;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState(0);
  const [priorityFilter, setPriorityFilter] = useState(0);
  const [variantFilter, setVariantFilter] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: complaintData } = useGetComplaintPagination(
    Number(page) + 1,
    rowsPerPage,
    debouncedSearch,
    sortOrder,
    Number(statusFilter),
    Number(priorityFilter),
    Number(variantFilter),
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setPage(0);
  };

  const clearFilters = () => {
    setStatusFilter(0);
    setPriorityFilter(0);
    setVariantFilter(0);
  };

  const handleOpenDialog = (dialogString: string, id?: string) => {
    setDialogId(id ? id : "");
    setDialogString(dialogString);
    setDialogOpen(true);
  };

  const renderDialog = () => {
    switch (dialogString) {
      case "ComplaintDetails":
        return (
          <ComplaintDialog
            complaintId={dialogId}
            onClose={() => setDialogOpen(false)}
          />
        );
      case "CreateComplaint":
        return (
          <CreateComplaintDialog
            userId={retrieveFromStorage("userId") || ""}
            onClose={() => setDialogOpen(false)}
          />
        );
    }
  };

  if (!complaintData) {
    return <ErrorPage />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "#f5f7fa",
      }}
    >
      <OverviewAppbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

      <Box sx={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              borderRight: "1px solid rgba(0, 0, 0, 0.08)",
              boxShadow: "none",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Filters
              </Typography>
            </Box>

            <TextField
              fullWidth
              placeholder="Search complaints..."
              value={searchValue}
              onChange={handleSearch}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              size="small"
            />

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status"
                size="small"
              >
                <MenuItem value={0}>All statuses</MenuItem>
                <MenuItem value={1}>New</MenuItem>
                <MenuItem value={2}>Under process</MenuItem>
                <MenuItem value={3}>Finished</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Priority</InputLabel>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                label="Priority"
                size="small"
              >
                <MenuItem value={0}>All priorities</MenuItem>
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel>Complaint Type</InputLabel>
              <Select
                value={variantFilter}
                onChange={(e) => setVariantFilter(e.target.value)}
                label="Complaint Type"
                size="small"
              >
                <MenuItem value={0}>All types</MenuItem>
                <MenuItem value={1}>Product</MenuItem>
                <MenuItem value={2}>Customer Service</MenuItem>
                <MenuItem value={3}>Delivery</MenuItem>
                <MenuItem value={4}>Other</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              color="inherit"
              size="small"
              onClick={clearFilters}
              sx={{ borderRadius: 2, padding: "0.5em" }}
            >
              <Typography>Clear filters</Typography>
            </Button>
          </Box>
        </Drawer>

        {/* Complaints Grid */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: "margin 225ms cubic-bezier(0, 0, 0.2, 1)",
            marginLeft: drawerOpen ? `${drawerWidth}px` : 0,
            overflow: "auto",
          }}
        >
          <Container maxWidth="xl" disableGutters>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 2,
                bgcolor: "white",
              }}
            >
              <Typography variant="h6">
                {complaintData.totalComplaints} Complaints
                {statusFilter > 0 && ` • ${statusIntToEnum(statusFilter)}`}
                {priorityFilter > 0 &&
                  ` • ${priorityIntToEnum(priorityFilter)}`}
                {variantFilter > 0 && ` • ${variantIntToEnum(variantFilter)}`}
              </Typography>
              <Box>
                <FormControl
                  variant="outlined"
                  size="small"
                  sx={{ width: 120, mr: 1 }}
                >
                  <InputLabel>Sort by</InputLabel>
                  <Select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    label="Sort by"
                  >
                    <MenuItem value="desc">Newest</MenuItem>
                    <MenuItem value="asc">Oldest</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  onClick={() => handleOpenDialog("CreateComplaint")}
                  variant="contained"
                  color="primary"
                  sx={{ p: "0.5em" }}
                >
                  Create new complaint
                </Button>
              </Box>
            </Paper>

            <Grid container spacing={2}>
              {complaintData.complaints.map((complaint) => (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={complaint.id}>
                  <Card
                    onClick={() =>
                      handleOpenDialog("ComplaintDetails", complaint.id)
                    }
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      transition: "transform 0.2s, box-shadow 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 6px 12px rgba(0,0,0,0.12)",
                      },
                      bgcolor: getStatusColor(complaint.status),
                    }}
                  >
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "#1565c0" }}>
                          <PersonIcon />
                        </Avatar>
                      }
                      title={
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          {complaint.customer}
                        </Typography>
                      }
                      sx={{ pb: 0 }}
                    />
                    <CardContent sx={{ pt: 1, pb: 2, flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",

                          flexWrap: "wrap",
                          gap: 1,
                          mt: 1,
                        }}
                      >
                        <Chip
                          size="small"
                          label={ComplaintStatus(complaint.status)}
                          variant="outlined"
                          sx={{
                            color: getStatusColor(complaint.priority),
                            borderColor: getStatusColor(complaint.priority),
                            padding: "5px",
                          }}
                        />
                        <Chip
                          size="small"
                          icon={
                            <FlagIcon sx={{ fontSize: "16px !important" }} />
                          }
                          label={ComplaintPriority(complaint.priority)}
                          sx={{
                            color: getPriorityColor(complaint.priority),
                            borderColor: getPriorityColor(complaint.priority),
                            padding: "5px",
                          }}
                          variant="outlined"
                        />
                        {complaint.complaintVariant && (
                          <Chip
                            size="small"
                            label={variantIntToEnum(
                              complaint.complaintVariant,
                            ).replace("_", " ")}
                            sx={{
                              padding: "5px",
                            }}
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
                borderRadius: 2,
                bgcolor: "white",
              }}
            >
              <TablePagination
                component="div"
                count={complaintData.totalComplaints}
                page={Number(page)}
                onPageChange={handleChangePage}
                rowsPerPage={Number(rowsPerPage)}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </Paper>
          </Container>
        </Box>
      </Box>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3, maxHeight: "90vh" },
        }}
      >
        {renderDialog()}
      </Dialog>
    </Box>
  );
}
