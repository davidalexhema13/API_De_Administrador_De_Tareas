import { PrismaNeon } from "@prisma/adapter-neon";
// @ts-ignore
import pkg from "@prisma/client";
import * as dotenv from "dotenv";

dotenv.config();

// @ts-ignore
const { PrismaClient } = pkg;

const adapter = new PrismaNeon({ 
    connectionString: process.env.DATABASE_URL as string 
});

const prisma = new PrismaClient({ adapter });

export default prisma;