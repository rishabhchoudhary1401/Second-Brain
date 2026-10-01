import z from "zod";
export declare const contentBodyType: z.ZodObject<{
    title: z.ZodString;
    link: z.ZodString;
    tags: z.ZodArray<z.ZodString>;
    type: z.ZodEnum<{
        article: "article";
        document: "document";
        twitter: "twitter";
        youtube: "youtube";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=contentSchemas.d.ts.map