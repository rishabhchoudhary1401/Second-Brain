import z from "zod";

export const get_shared_brain_query = z.string().min(1);