import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Toaster } from "react-hot-toast";
import Body from "./components/Body";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
const ProblemList = lazy(() => import("./components/ProblemList"));
const ProblemPage = lazy(() => import("./components/ProblemPage"));
const Contest = lazy(() => import("./components/ContestsPage"));
const ProfilePage = lazy(() => import("./components/ProfilePage"));
const UpdateProfile = lazy(() =>
  import("./components/profile _components/updateProfile")
);
const ContestDetails = lazy(() =>
  import("./components/contest/ContestDetails")
);
const ContestRegister = lazy(() =>
  import("./components/contest/ContestRegister")
);
const MySubmissions = lazy(() =>
  import("./components/submission/MySubmissions")
);
const Leaderboard = lazy(() => import("./components/LeaderBoard.jsx/Board"));
const Setting = lazy(() => import("./components/settings/Setting"));
const Bookmarks = lazy(() => import("./components/Boookmarks/Bookmarks"));
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-32 space-y-6">
      {/* Spinner */}
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-gray-400 text-sm tracking-wide">
        Loading ...
      </div>

    </div>
  );
};


const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Toaster />
        <Routes>
          <Route path='/' element={<Body />}>
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path='/problems'
                element={
                  <Suspense fallback={<Loader />}>
                    <ProblemList />
                  </Suspense>
                }
              />

              <Route
                path='/problems/:id'
                element={
                  <Suspense fallback={<Loader />}>
                    <ProblemPage />
                  </Suspense>
                }
              />

              <Route
                path='/contests'
                element={
                  <Suspense fallback={<Loader />}>
                    <Contest />
                  </Suspense>
                }
              />

              <Route
                path='/contests/:contestId'
                element={
                  <Suspense fallback={<Loader />}>
                    <ContestDetails />
                  </Suspense>
                }
              />

              <Route
                path='/profile'
                element={
                  <Suspense fallback={<Loader />}>
                    <ProfilePage />
                  </Suspense>
                }
              />

              <Route
                path='/profile/update'
                element={
                  <Suspense fallback={<Loader />}>
                    <UpdateProfile />
                  </Suspense>
                }
              />

              <Route
                path='/contests/:cid/problems/:id'
                element={
                  <Suspense fallback={<Loader />}>
                    <ProblemPage />
                  </Suspense>
                }
              />

              <Route
                path='/contests/:contestId/register'
                element={
                  <Suspense fallback={<Loader />}>
                    <ContestRegister />
                  </Suspense>
                }
              />

              <Route
                path='/submissions'
                element={
                  <Suspense fallback={<Loader />}>
                    <MySubmissions />
                  </Suspense>
                }
              />

              <Route
                path='/leaderboard'
                element={
                  <Suspense fallback={<Loader />}>
                    <Leaderboard />
                  </Suspense>
                }
              />

              <Route
                path='/settings'
                element={
                  <Suspense fallback={<Loader />}>
                    <Setting />
                  </Suspense>
                }
              />

              <Route
                path='/bookmarks'
                element={
                  <Suspense fallback={<Loader />}>
                    <Bookmarks />
                  </Suspense>
                }
              />
            </Route>

            <Route path='*' element={<h2>404 - Page Not Found</h2>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
