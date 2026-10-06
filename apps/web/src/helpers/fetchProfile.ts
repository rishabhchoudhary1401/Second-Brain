import { api } from "../api";

type UserProfile = {
    firstName: string;
    lastName: string;
    email: string;
};

type FetchProfileResult =
    { success: true; data: UserProfile }
    | { success: false; message: string };
    
export async function fetchProfile(): Promise<FetchProfileResult> {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return {
                success: false,
                message: "No authentication token"
            };
        }

        const response = await api.get<UserProfile>("/user/me", {
            headers: { token }
        });

        return {
            success: true,
            data: response.data
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch profile"
        };
    }
}