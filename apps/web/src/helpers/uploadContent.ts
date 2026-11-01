import {api} from "../api";
import type z from "zod";
import { contentBodyType } from "../../../../packages/types/contentSchemas";

type CreateContentData = z.infer<typeof contentBodyType>;

async function saveContent(data: CreateContentData, contentId?: string) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return {
                success: false,
                message: "Please login again"
            };
        }

        const response = contentId
            ? await api.put(`/user/edit_content/${contentId}`, data, { headers: { token: token } })
            : await api.post("/user/create_brain", data, { headers: { token: token } });

        return {
            success: true,
            data: response.data
        };

    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || (contentId ? "Failed to update content" : "Failed to create content")
        };
    }
}

export async function createContent(data: CreateContentData) {
    return saveContent(data);
}

export async function updateContent(contentId: string, data: CreateContentData) {
    return saveContent(data, contentId);
}

export async function deleteContent(contentId: string) {
    try {
        const token = localStorage.getItem("token");

        if (!token) {
            return {
                success: false,
                message: "Please login again"
            };
        }

        const response = await api.delete(
            `/user/delete_brain/${contentId}`,
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
            message: error.response?.data?.message || "Failed to delete content"
        };
    }
}
