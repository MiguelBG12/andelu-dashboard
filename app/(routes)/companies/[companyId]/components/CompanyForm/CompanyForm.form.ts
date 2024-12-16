import { z } from "zod";

export const formSchema = z.object({
    name: z.string(),
    description: z.string().nullable(),
    logoCompany: z.string(),
    uniformCompany: z.string(),
    CIF: z.string().min(6),
    phone: z.string().min(9),
    country: z.string().min(2),
    website: z.string().min(2),
})
