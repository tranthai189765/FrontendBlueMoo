/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios để gọi API

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

function Cover() {
  const [user, setUser] = useState({
    fullName: "",
    age: "",
    phone: "",
    email: "",
    apartmentId: "",
    name: "",
    password: "",
    agree: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({ ...user, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.agree) {
      setError("You must agree to the Terms and Conditions.");
      return;
    }

    setError(""); // Xóa lỗi cũ nếu có

    const { agree, ...userData } = user;

    try {
      const response = await axios.post("http://localhost:9090/api/auth/register", userData);
      console.log("Response:", response);
      alert("Đăng ký thành công!");
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("API Error:", error.response.data);

        // Nếu API trả về một object chứa thông tin lỗi
        if (typeof error.response.data === "object" && !Array.isArray(error.response.data)) {
          // Lấy tất cả giá trị từ object lỗi (trong trường hợp có nhiều lỗi khác nhau)
          const errorMessages = Object.values(error.response.data).join(", ");
          setError(errorMessages);
        } else if (Array.isArray(error.response.data.errors)) {
          // Nếu API trả về danh sách lỗi
          setError(error.response.data.errors.join(", "));
        } else {
          setError("Đăng ký thất bại, vui lòng kiểm tra lại thông tin.");
        }
      } else {
        setError("Không thể kết nối đến máy chủ.");
      }
    }
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          mx={2}
          mt={-3}
          p={3}
          textAlign="center"
        >
          <MDTypography variant="h4" color="white">
            Join us today
          </MDTypography>
          <MDTypography variant="button" color="white" my={1}>
            Enter your information to register
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <form onSubmit={handleSubmit}>
            <MDBox display="flex" flexWrap="wrap" gap={2}>
              <MDBox width={{ xs: "100%", md: "48%" }}>
                {[
                  { label: "Full Name", name: "fullName", type: "text" },
                  { label: "Age", name: "age", type: "number" },
                  { label: "Phone", name: "phone", type: "text" },
                ].map((field, index) => (
                  <MDBox mb={2} key={index}>
                    <MDInput
                      type={field.type}
                      label={field.label}
                      name={field.name}
                      value={user[field.name]}
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                ))}
              </MDBox>
              <MDBox width={{ xs: "100%", md: "48%" }}>
                {[
                  { label: "Email", name: "email", type: "email" },
                  { label: "Apartment ID", name: "apartmentId", type: "text" },
                  { label: "Username", name: "name", type: "text" },
                  { label: "Password", name: "password", type: "password" },
                ].map((field, index) => (
                  <MDBox mb={2} key={index}>
                    <MDInput
                      type={field.type}
                      label={field.label}
                      name={field.name}
                      value={user[field.name]}
                      onChange={handleChange}
                      fullWidth
                    />
                  </MDBox>
                ))}
              </MDBox>
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox name="agree" checked={user.agree} onChange={handleChange} />
              <MDTypography
                variant="button"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            {error && (
              <MDTypography
                color="error"
                mt={2}
                textAlign="center"
                fontSize="16px"
                fontWeight="bold"
                sx={{ backgroundColor: "#ffebee", padding: "8px", borderRadius: "4px" }}
              >
                {error}
              </MDTypography>
            )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth type="submit">
                Sign Up
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Already have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </form>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
