import {BrowserRouter , Routes , Route } from "react-router-dom";
import { SignUp , SignIn , DashBoard} from "./pagegs/Index";
import { AuthenticatedRoots } from "./routes/authroutes";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route element={<AuthenticatedRoots/>}>
        <Route path="/dashboard" element={<DashBoard/>} />
      </Route>
    </Routes>
  </BrowserRouter>
    
    

}

export default App;

