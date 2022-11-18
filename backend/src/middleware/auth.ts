import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { CustomRequest } from '../interfaces/CustomRequest.interface';
import { userService } from '../services/user.services';
require('dotenv/config')

const SECRET = process.env.SECRET as string;

export const auth = async(req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token){
    return res.status(401).json( { message: 'Token não encontrado, faça login novamente' } );
  }
  try{
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    console.log(decoded)
    const user = await userService.getById(decoded.id);
    if(!user){
      return res.status(401).json({ message: 'Token inválido, por favor refaça o login'})
    }
    (req as CustomRequest).user = user;
    next();
  } catch (e: unknown) {
      if (typeof e === "string") {
        e.toUpperCase()
      } else if (e instanceof Error) {
        return res.status(401).json({ message: e.message })
        }
  }
}