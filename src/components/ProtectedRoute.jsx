import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";


const ProtectedRoute = () => {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/auth/check", {
          withCredentials: true,
        });
        setStatus("authorized");
      } catch (err) {
        setStatus("unauthorized");
      }
    };
    checkAuth();
  }, []);

 
 
  if (status === "authorized") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Outlet />
      </motion.div>
    );
  }


  if (status === "unauthorized") {
    return <Navigate to="/login" replace />;
  }

  return null;
};

export default ProtectedRoute;
