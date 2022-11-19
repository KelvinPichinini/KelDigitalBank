import Account from "../database/models/account"
import User from "../database/models/user"
import { accountModel } from "./account.model"

export const userModel = {
  async getAll(): Promise<Array<User & {account: Account}>> {
    const users = await User.findAll({
      attributes: { exclude: ['password']},
      include: [{
        model: Account,
        as: 'account'
      }],
    }) as Array<User & {account: Account}>
    return users
  },

  async getById(id:number): Promise<User & {account: Account}> {
    const users = await User.findOne({
      where: { id: id },
      attributes: { exclude: ['password']},
      include: [{
        model: Account,
        as: 'account'
      }],
    }) as User & {account: Account}
    return users
  },

  async login(username:string):Promise<User & {account: Account}> {
    const user = await User.findOne({
      where: { username: username },
      include: [{
        model: Account,
        as: 'account'
      }],
    }) as User & {account: Account}
    return user
  },

  async createUser(username:string, password:string):Promise<number> {
    const accountId = await accountModel.createAccount();
    const newUser = await User.create({username, password, accountId})
    return newUser.id
  },

  async getByUsername(username:string): Promise<User & {account: Account}> {
    const users = await User.findOne({
      where: { username: username },
      attributes: { exclude: ['password']},
      include: [{
        model: Account,
        as: 'account'
      }],
    }) as User & {account: Account}
    return users
  },

  async getUserByAccountId(id:number): Promise<string | null> {
    const user = await User.findOne({
      where: { accountId: id },
      attributes: { exclude: ['password','id','accountId']},
    })
    if(user){
      return user.username
    }
    return null
  },


}