import { useState } from "react";
import { CheckIcon } from "../components/icons/CheckIcon";
import Button from "../components/ui/index";
import { signupSubmit, type SignupFormType } from "../helpers/signupSubmit";
import { LoadingIcon } from "../components/icons/LoadingIcon";
import { useNavigate } from "react-router-dom";

export function SignUp(){

    const [firstName , setFirstName] = useState("");
    const [lastName , setLastName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    return <div className="bg-slate-500/70 h-screen w-screen flex justify-center items-center">
        <div className="border p-16 bg-white rounded-2xl">
            <div className="pb-1">Hey there! Please SignUp...</div>
            <div className="grid gap-2">
                <input onChange={(e) => {setFirstName(e.target.value)}} className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="First Name" />
                <input onChange={(e) => {setLastName(e.target.value)}} className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Last Name" />
                <input onChange={(e) => {setEmail(e.target.value)}} className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Email" />
                <input onChange={(e) => {setPassword(e.target.value)}} className="border rounded pl-2 pr-8 py-2 text-black" type="password" placeholder="Password" />
            </div>
            {message && (
                <div className="mt-3 text-center text-sm text-red-500">
                    {message}
                </div>
            )}
            <div className="mt-4 flex justify-center">
                <Button text={loading? "Signinig Up..." : "SignUp"} variant="primary" startIcon={loading? <LoadingIcon /> : <CheckIcon/>} size="md" onClick= {() => {submitButtonHandler({firstName, lastName, email, password}, setMessage , setLoading, navigate)}} disabled={loading}  />
            </div>
        </div>
    </div>
}


async function submitButtonHandler( data: SignupFormType, setMessage: React.Dispatch<React.SetStateAction<string>> , setLoading: React.Dispatch<React.SetStateAction<boolean>>, navigate: ReturnType<typeof useNavigate> ){
  setLoading(true);
  setMessage("");

  try {
    const result = await signupSubmit(data);
    setMessage(result.message);
    if(result.status){
        navigate("/dashboard");
    }
    
  } finally {
    setLoading(false);
  }
}