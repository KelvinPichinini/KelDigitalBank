import Account from "../database/models/account"

export const accountModel = {
  async getAll():Promise<Account[]> {
    const accounts = await Account.findAll()
    return accounts
  },

  async getById(id:number):Promise<Account | null> {
    const account = await Account.findOne({
      where: { id: id }
    })
    return account
  },

  async createAccount():Promise<number> {
    const account = await Account.create();
    return account.id;
  },

  async updateAccountBalance(id:number,balance:string):Promise<Array<number>> {
    const updated = await Account.update({balance}, {where:{id}})
    return updated
  }

}