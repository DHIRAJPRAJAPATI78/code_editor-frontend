import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "../features/profile/profileSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user,  isError, message } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (!user) {
      dispatch(getUserProfile());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (isError) {
      console.error("Profile fetch failed:", message);
      navigate("/home"); 
    }
  }, [isError, message, navigate]);

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
