import Home from "./components/Home";
import Login from "./components/Login";
import ProblemPage from "./components/ProblemPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import Body from "./components/Body.jsx";
import contest from "./components/contest.jsx";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router basename="/">
          <Routes>
            <Route path='/' element={<Body />}>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/problems' element={<ProblemPage />} />
              <Route path='/contests' element={contest} />
              <Route path='*' element={<h2>404 - Page Not Found</h2>} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
