import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { client } from "../../lib/pocketbase";
import { useState } from "react";


const LoginForm = () => {
  const isLoggedIn = client.authStore.isValid;  
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [X, setX] = useState(0) // to refresh on logout and login

  function Logout() {
    client.authStore.clear();
    setX(Math.random())
    console.log(isLoggedIn)
  }
  async function Login(data) {
    try {
        const authData = await client
            .collection("users")
            .authWithPassword(data.email, data.password);
    } catch (e){
        alert("Error, invalid login")
    }
  }

  const handleFormSubmit = (values) => {
      Login(values);
      setX(Math.random())
  };

  if (isLoggedIn) {
    return (
      <Box>
        <Header title="Logged in as" /> {isLoggedIn && client.authStore.model.email}
        <br></br>
        <Button onClick={Logout} color="secondary" variant="contained">
          Log Out
        </Button>
      </Box>
    )
  }

  return (
    <Box m="20px">
      <Header title="Login" subtitle="Press the login button twice :)" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

export default LoginForm;