import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import Body from "./components/Body";
import Home from "./components/Home";
import Login from "./components/Login";
import ProblemList from "./components/ProblemList";
import ProblemPage from "./components/ProblemPage";
import Contest from "./components/ContestsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ProfilePage from "./components/ProfilePage";
import UpdateProfile from "./components/profile _components/updateProfile";
import { Toaster } from "react-hot-toast";
import ContestDetails from "./components/contest/ContestDetails";
import ContestRegister from "./components/contest/ContestRegister";
import MySubmissions from "./components/submission/MySubmissions";
import Leaderboard from "./components/LeaderBoard.jsx/Board";
import Setting from "./components/settings/Setting";
import Bookmarks from "./components/Boookmarks/Bookmarks";

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/problems" element={<ProblemList />} />
              <Route path="/problems/:id" element={<ProblemPage />} />
              <Route path="/contests" element={<Contest />} />
              <Route path="/contests/:contestId" element={<ContestDetails />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/update" element={<UpdateProfile />} />
              <Route path="/contests/:cid/problems/:id" element={<ProblemPage/>}/>
              <Route path="/contests/:contestId/register" element={<ContestRegister/>}/>
              <Route path="/submissions" element={<MySubmissions/>}/>
              <Route path="/leaderboard" element={<Leaderboard/>} />
              <Route path="/settings" element={<Setting/>} />
              <Route path="/bookmarks" element={<Bookmarks/>} />
            </Route>

            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
