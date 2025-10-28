import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import ProblemList from "./components/ProblemList";
import ProblemPage from "./components/ProblemPage";
import Contest from "./components/contest";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/problems" element={<ProblemList />} />
              <Route path="/problems/:id" element={<ProblemPage />} />
              <Route path="/contests" element={<Contest />} />
            </Route>

            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
