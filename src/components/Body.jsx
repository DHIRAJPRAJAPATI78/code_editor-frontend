import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Body = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
