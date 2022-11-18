import { NextFunction, Response } from "express";
import { CustomRequest } from "../interfaces/CustomRequest.interface";
import { transactionServices } from "../services/transaction.services";
import { userService } from "../services/user.services";

export const transfer = async (req:CustomRequest, res:Response, next:NextFunction) => {
  const { creditedAccountUsername, value } = req.body;
  if( req.user && req.user.username == creditedAccountUsername ) {
    return res.status(400).json({message: 'Conta destinatário deve ser diferente da origem'})
  }
  if( req.user ) {
    const creditedUser = await userService.getByUsername(creditedAccountUsername);
    if(creditedUser){
      const creditedAccountId = creditedUser?.id
      const transaction = await transactionServices.createTransaction(req.user.id,creditedAccountId,parseFloat(value));
      if (transaction.message != 'ok') {
        return res.status(400).json(transaction.message)
      }
      return res.status(200).json(transaction)
    }
    return res.status(404).json({message: 'Usuário destino não encontrado'})
  }
}

export const transactions = async (req:CustomRequest, res:Response, next:NextFunction) => {
  const { user } = req
  if( user?.id ) {
    const allTransactions = await transactionServices.getAllByAccountId(user.id);
    return res.status(200).json(allTransactions)
  }
}
