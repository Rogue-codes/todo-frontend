import { BrowserRouter as Router , Route , Routes } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Nav from "./components/nav/Nav";
import Todos from "./components/todos/Todos";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Router>
      <Toaster/> 
        <Nav/>
        <Routes>
          <Route path='/signIn' element={<SignIn/>}/>
          <Route path='/signUp' element={<SignUp/>}/>
          <Route path='/' element={<Todos/>}/>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
