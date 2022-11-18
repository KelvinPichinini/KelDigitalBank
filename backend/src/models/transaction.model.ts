import Transaction from "../database/models/transaction"
import { Op } from "sequelize"

export const transactionModel = {
  async getAll():Promise<Transaction[]> {
    const transactions = await Transaction.findAll()
    return transactions
  },

  async getAllByAccountId(id:number):Promise<Transaction[]> {
    const transactions = await Transaction.findAll({
      where: {
        [ Op.or]: [
          { debitedAccountId: id },
          { creditedAccountId: id }
        ]
      }
    })
    return transactions
  },

  async createTransaction(debitedAccountId:number, creditedAccountId:number, value:string):
   Promise<Transaction> {
    const hour = new Date().getHours();
    
    const transaction = await Transaction.create(
      { debitedAccountId,creditedAccountId,value, createdAt: new Date().setHours(hour - 3) }
    );
    return transaction
  }

}