import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client/default.js";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL as string });
const prisma = new PrismaClient({ adapter });

export default prisma;