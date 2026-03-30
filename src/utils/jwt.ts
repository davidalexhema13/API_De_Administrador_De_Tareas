import jwt  from "jsonwebtoken";


const Secret = process.env.JWT_SECRET || "default_secret";


export const generarToken =(payload: any) =>
   {  return jwt.sign(payload, Secret,{expiresIn: "2h"});

};

export const verifyToken = (Token: string) => {
    return jwt.verify(Token, Secret);

};