
import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'
import ProblemList from './components/ProblemList'
import ProblemPage from './components/ProblemPage'

const App = () => {
  return (
    <>
    <Login/>
    <Home/>
    <ProblemPage/>
    <ProblemList/>
    <Header/>
    </>
  )
}

export default App