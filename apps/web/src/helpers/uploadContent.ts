import {api} from "../api";

type CreateContentData = {
    title: string;
    link: string;
    type: string;
    tags: string[];
};

export async function createContent(data: CreateContentData) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return {
                success: false,
                message: "Please login again"
            };
        }

        const response = await api.post(
            "/user/create_brain",
            data,
            {
                headers: {
                    token: token
                }
            }
        );

        return {
            success: true,
            data: response.data
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create content"
        };
    }
}