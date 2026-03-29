import jwt  from "jsonwebtoken";



const Secret = process.env.jwt_secret || "secreto";


export const generarToken =(payload: any) =>
   {  return jwt.sign(payload, Secret,{expiresIn: "2h"});

};

export const verifyToken = (Token: string) => {
    return jwt.verify(Token, Secret);

};