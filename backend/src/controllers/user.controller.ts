import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { userService } from "../services/user.services";

export const login = async (req:Request, res:Response, next:NextFunction) => {
  const { username, password } = req.body;
  if( username && password ) {
    const loginAttempt = await userService.login(username, password)
    if(loginAttempt.message != 'ok'){
      return res.status(404).send(loginAttempt)
    }
    return res.status(200).send(loginAttempt)
  }
}

export const signup = async (req:Request, res:Response, next:NextFunction) => {
  const { username, password } = req.body;
  if( username && password) {
    const newUser = await userService.createUser(username, password)
    console.log(newUser)
    if (newUser){
      const loginAttempt = await userService.login(username, password)
      return res.status(200).send(loginAttempt)
    }
    return res.status(400).json({message: 'Usuário já cadastrado'})
  }
}

export const accountInfo = async (req:CustomRequest, res:Response, next:NextFunction) => {
  return res.status(200).send(req.user)
}