import * as dotenv from "dotenv";

dotenv.config();

class EnvConfig {
  private static instance: EnvConfig;

  public readonly PORT: number;
  public readonly DATABASE_URL: string;
  public readonly JWT_SECRET: string;

  private constructor() {
    this.PORT = Number(process.env.PORT) || 3000;
    this.DATABASE_URL = process.env.DATABASE_URL as string;
    this.JWT_SECRET = process.env.JWT_SECRET as string;
  }

  public static getInstance(): EnvConfig {
    if (!EnvConfig.instance) {
      EnvConfig.instance = new EnvConfig();
    }
    return EnvConfig.instance;
  }
}

export const env = EnvConfig.getInstance();