import {BrowserRouter , Routes , Route } from "react-router-dom";
import { SignUp , SignIn , DashBoard} from "./pagegs/Index";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/dashboard" element={<DashBoard/>} />
    </Routes>
  </BrowserRouter>
    
    

}

export default App;

