import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Home from "./components/Home";
import Login from "./components/Login";
import Protectedroute from "./components/ProtectedRoute";
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
    <div className='flex flex-col items-center justify-center mt-32 space-y-6'>
      {/* Spinner */}
      <div className='relative w-14 h-14'>
        <div className='absolute inset-0 rounded-full border-4 border-gray-700'></div>
        <div className='absolute inset-0 rounded-full border-4 border-orange-500 border-t-transparent animate-spin'></div>
      </div>

      {/* Text */}
      <div className='text-gray-400 text-sm tracking-wide'>Loading ...</div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Header />
      <Toaster />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/problems'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ProblemList />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/problems/:id'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ProblemPage />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/contests'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <Contest />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/contests/:contestId'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ContestDetails />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/profile'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ProfilePage />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/profile/update'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <UpdateProfile />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/contests/:cid/problems/:id'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ProblemPage />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/contests/:contestId/register'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <ContestRegister />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/submissions'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <MySubmissions />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/leaderboard'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <Leaderboard />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/settings'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <Setting />
              </Suspense>
            </Protectedroute>
          }
        />

        <Route
          path='/bookmarks'
          element={
            <Protectedroute>
              <Suspense fallback={<Loader />}>
                <Bookmarks />
              </Suspense>
            </Protectedroute>
          }
        />

        {/* 404 */}
        <Route path='*' element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
};

export default App;
