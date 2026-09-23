import z from "zod";

// this is /create_brain body schema
export const contentBodyType = z.object({
    title : z.string().min(1, {message: "Title can't be blank..."}),
    link: z.string().min(1, {message: "Link can't be blank..."}),
    tags: z.array(z.string().min(1)),
    type: z.enum(["youtube", "twitter", "article", "document"])
});

// 