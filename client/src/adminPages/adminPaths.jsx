import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../context/authContext";

const AdminPaths = ({ children }) => {
  const { role } = Auth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "ADMIN") {
      navigate("/");
    }
  }, [role, navigate]);

  return role === "ADMIN" ? children : null;
};

export default AdminPaths;
