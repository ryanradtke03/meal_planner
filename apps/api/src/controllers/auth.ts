import { Request, Response } from "express";
import { z } from "zod";
import { registerUser } from "../services/auth";


const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
})

export async function register(req: Request, res: Response){
    try{
        const parsed = registerSchema.parse(req.body);
        
        const user = await registerUser(parsed);

        return res.status(201).json({
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
            }
        })

    }catch(error: any){
        return res.status(400).json({
            error: error.message ?? "Registrations Error",
        });
    }
}