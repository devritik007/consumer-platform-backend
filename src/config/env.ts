import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z
        .string()
        .optional()
        .transform(val => Number(val || 4000)),
    ALLOWED_ORIGINS: z
        .string()
        .min(1, "ALLOWED_ORIGINS is required"),
    JWT_SECRET: z
        .string()
        .min(1, "JWT_SECRET is required"),
});

const parsedENV = envSchema.safeParse(process.env);

if (!parsedENV.success) {
    console.error("Invalid environment variables:", parsedENV.error.format());
    process.exit(1);
}

export const env = parsedENV.data;