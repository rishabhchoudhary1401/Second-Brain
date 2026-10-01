import { useState } from "react";
import { CheckIcon } from "../components/icons/CheckIcon";
import Button from "../components/ui/index";
import { singinSubmitHelper, type SigninFormType } from "../helpers/signinSubmit";
import { useNavigate } from "react-router-dom";

export function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    return <div className="bg-slate-500/70 h-screen w-screen flex justify-center items-center">
        <div className="border p-16 bg-white rounded-2xl">
            <div className="pb-1">Hey there! Please SignIn...</div>
            <div className="grid gap-2">
                <input className="border rounded pl-2 pr-8 py-2 text-black" type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input className="border rounded pl-2 pr-8 py-2 text-black" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {message && (
                <div className="mt-3 text-center text-sm text-red-500">
                    {message}
                </div>
            )}
            <div className="mt-4 flex justify-center">
                <Button text="SignIn" variant="primary" startIcon={<CheckIcon/>} size="md" onClick = {() =>{submitButtonHandler({email, password}, setMessage, setLoading, navigate)}}/>
            </div>
            <div className="mt-4 text-center text-sm">
                <span className="text-gray-500">Don't have an account? </span>

                <button className="text-blue-600 hover:underline" onClick={() => navigate("/signup")} >
                    Sign up
                </button>
            </div>
        </div>
    </div>
}

async function submitButtonHandler( data: SigninFormType, setMessage: React.Dispatch<React.SetStateAction<string>> , setLoading: React.Dispatch<React.SetStateAction<boolean>>, navigate: ReturnType<typeof useNavigate> ){
  setLoading(true);
  setMessage("");
  console.log("btn clicked");

  try {
    console.log("inside try block");
    const result = await singinSubmitHelper(data);
    setMessage(result.message);
    if(result.status){
        navigate("/dashboard");
    }
    
  } finally {
    setLoading(false);
  }
}