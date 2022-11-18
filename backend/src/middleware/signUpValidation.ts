import { NextFunction, Request, Response } from "express";

export const signUpValidation = async (req:Request, res:Response, next:NextFunction) => {
  const { username, password } = req.body;
  const passwordREGEX = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$)/
  if (!(username && password)) {
    return res.status(400).json({ message:'Faltando informação de login ou password'})
  }
  if( username.length < 3 ) {
    return res.status(400).json({ message: 'Username deve ter pelo menos 3 caracteres' })
  }
  if( !password.match(passwordREGEX) ) {
    return res.status(400).json({ message: 'Senha deve possuir no mínimo 8 caracteres, com pelo menos 1 número e 1 letra maiúscula' })
  }
  next();
}