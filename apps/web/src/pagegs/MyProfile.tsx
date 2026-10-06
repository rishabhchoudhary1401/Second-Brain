import { useEffect, useState } from "react"
import { fetchProfile } from "../helpers/fetchProfile";




export function MyProfile(){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    useEffect(() => {

        async function loadProfile (){
            const data = await fetchProfile();
            if(!data.success){
                setFirstName("Error, relogin...");
                setLastName("Error, relogin...");
                setEmail("Error, relogin...");
            }
            else{
                setFirstName(data.data.firstName);
                setLastName(data.data.lastName);
                setEmail(data.data.email);
            }
        }
        loadProfile();
        
    }, [])
  
    return (
        <div className="min-h-full px-4 py-6 sm:px-8 lg:px-12">
            <div className="mx-auto w-full max-w-3xl">

                {/* Heading */}
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 sm:text-3xl">
                        My Profile
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage your account information
                    </p>
                </div>

                {/* Profile card */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    {/* Profile header */}
                    <div className="flex flex-col items-center gap-4 border-b border-gray-200 px-6 py-8 sm:flex-row sm:px-8">
                        
                        {/* Avatar */}
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
                            {firstName?.charAt(0).toUpperCase()}
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-xl font-semibold text-gray-800">
                                {firstName} {lastName}
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                {email}
                            </p>
                        </div>
                    </div>

                    {/* Account information */}
                    <div className="px-6 py-6 sm:px-8">
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                            Account Information
                        </h3>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                            <div>
                                <label className="text-sm text-gray-500">
                                    First Name
                                </label>
                                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                                    {firstName}
                                </div>
                            </div>

                            <div>
                                <label className="text-sm text-gray-500">
                                    Last Name
                                </label>
                                <div className="mt-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                                    {lastName}
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label className="text-sm text-gray-500">
                                    Email
                                </label>
                                <div className="mt-1 break-all rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800">
                                    {email}
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}