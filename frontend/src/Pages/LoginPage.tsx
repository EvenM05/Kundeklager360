import React from "react";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import img from "../assets/loginPicture.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { LoginModel } from "../Utils/interfaces/loginInterfaces";
import { useLogin } from "../Api/hooks/LoginHooks";
import { saveToStorage } from "../Utils/localStorage";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const { register, handleSubmit } = useForm<LoginModel>();
  const navigate = useNavigate();

  const { mutateAsync: userLogin } = useLogin();

  const onSubmit = async (data: LoginModel) => {
    const loginResponse = await userLogin(data);

    if (!loginResponse) {
      console.error("email or password wrong");
    } else {
      saveToStorage("token", loginResponse.token);
      saveToStorage("userId", loginResponse.userId);
      navigate("/ComplaintOverview");
    }
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", borderRadius: "20px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4em",
          maxHeight: "30em",
          maxWidth: "30em",
          backgroundColor: "white",
          gap: "1.5em",
        }}
      >
        <Typography variant="h5" color="black">
          Login page
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField
              variant="outlined"
              label="Email"
              {...register("email")}
            />
            <TextField
              variant="outlined"
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...register("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseUp={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#1976d2" }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "black" }}>
            Don't have an account?
          </Typography>
          <Button
            sx={{
              padding: "0em 0.5em",
              color: "#1976d2",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      </Box>
      <Box component="img" src={img} sx={{ height: "30em", width: "30em" }} />
    </Box>
  );
}
