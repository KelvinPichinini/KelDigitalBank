import Transaction from "../database/models/transaction";
import { accountModel } from "../models/account.model";
import { transactionModel } from "../models/transaction.model"

export const transactionServices = {
  async getAll():Promise<Transaction[]> {
    const transaction = await transactionModel.getAll();
    return transaction
  },

  async getAllByAccountId(id:number):Promise<Transaction[]> {
    const transactions = await transactionModel.getAllByAccountId(id);
    return transactions;
  },

  async createTransaction(debitedAccountId:number, creditedAccountId:number, value:number)  {    
    const newDABalance = await this.checkEnoughBalance(debitedAccountId,value)
    const creditedAccount = await accountModel.getById(creditedAccountId);
    if(newDABalance && creditedAccount) {
      const newCABalance = ((parseFloat(creditedAccount.balance)*100 + value*100)/100).toFixed(2);
      const updateDAccount = await accountModel.updateAccountBalance(debitedAccountId,newDABalance);
      const updateCAccount = await accountModel.updateAccountBalance(creditedAccountId,newCABalance);
      if(updateCAccount && updateDAccount) {
        const transactionDone = await transactionModel.createTransaction(debitedAccountId,creditedAccountId,value.toFixed(2));
        return {...transactionDone.dataValues, message:'ok'};
      }    
    }
    if(newDABalance){
      return { message: 'Conta destino não encontrada' }
    }
    return { message: 'Saldo insuficiente'}
  },

  async checkEnoughBalance(debitedAccountId:number, value:number) {
    const debitedAccount = await accountModel.getById(debitedAccountId);
    if(debitedAccount){
      const newDABalance = (parseFloat(debitedAccount.balance)*100 - value*100)/100
      if(newDABalance >= 0) {
        return newDABalance.toFixed(2)
      } else {
        return false
      }
    }
  },

}