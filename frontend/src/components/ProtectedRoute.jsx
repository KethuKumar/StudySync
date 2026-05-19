import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

  const { user } = useSelector(
    (state) => state.auth
  );

  // if not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // if logged in
  return children;
};

export default ProtectedRoute;