
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


export default function Protectedroute({ children }) {
  const { isError } = useSelector((state) => state.profile);

  console.log(isError);

  if (isError) {
    console.log(`object`);
    return <Navigate to='/login' replace />;
  }
  return children;
}
