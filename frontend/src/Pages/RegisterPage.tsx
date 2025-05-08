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
import { RegisterModel } from "../Utils/interfaces/loginInterfaces";
import { useRegisterUser } from "../Api/hooks/LoginHooks";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const { register, handleSubmit } = useForm<RegisterModel>();
  const navigate = useNavigate();

  const { mutateAsync: registerUser } = useRegisterUser(() => console.log());

  const onSubmit = async (data: RegisterModel) => {
    const registerResponse = await registerUser(data);

    console.log(registerResponse);
    navigate("/login");
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
          maxHeight: "40em",
          maxWidth: "40em",
          backgroundColor: "white",
          gap: "1.5em",
        }}
      >
        <Typography variant="h5" color="black">
          Register new account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <TextField variant="outlined" label="Name" {...register("name")} />
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
            <TextField
              variant="outlined"
              id="outlined-adornment-password"
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showConfirmPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseUp={(event) => event.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? (
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
              sx={{ backgroundColor: "#1976d2", padding: "0.5em" }}
            >
              Register
            </Button>
          </Box>
        </form>
        <Box sx={{ display: "flex" }}>
          <Typography sx={{ color: "black" }}>
            Already have an account?
          </Typography>
          <Button
            sx={{
              padding: "0em 0.5em",
              color: "#1976d2",
            }}
            onClick={() => navigate("/login")}
          >
            Log in
          </Button>
        </Box>
      </Box>
      <Box component="img" src={img} sx={{ height: "40em", width: "40em" }} />
    </Box>
  );
}
