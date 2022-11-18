import { NextFunction, Request, Response } from "express";

export const transferValidation = async (req:Request, res:Response, next:NextFunction) => {
  const { creditedAccountUsername, value } = req.body;
  if(!creditedAccountUsername) {
    return res.status(400).json({ message: 'Faltam dados sobre usuário na requisição'})
  }
  if(!value) {
    return res.status(400).json({ message: 'Faltam dados sobre o valor a ser transferido na requisição'})
  }
  next();
}