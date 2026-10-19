import {BrowserRouter , Routes , Route } from "react-router-dom";
import { SignUp , SignIn , Home} from "./pagegs/Index";
import { AuthenticatedRoots } from "./routes/authRoutes";
import { Articles } from "./pagegs/Articles";
import { Youtube_Links } from "./pagegs/Youtube";
import { Tweets } from "./pagegs/Tweets";
import { Documents } from "./pagegs/Documents";
import { MyProfile } from "./pagegs/MyProfile";
import { SharedBrain } from "./pagegs/sharedBrain";

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/sharedBrain" element={<SharedBrain/>} />
      <Route element={<AuthenticatedRoots/>}>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/articles" element={<Articles/>} />
        <Route path="/youtube" element={<Youtube_Links/>} />
        <Route path="/tweets" element={<Tweets/>} />
        <Route path="/documents" element={<Documents/>} />
        <Route path="/myProfile" element={<MyProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
    
    

}

export default App;

