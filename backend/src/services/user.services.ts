import Account from "../database/models/account";
import User from "../database/models/user";
import { userModel } from "../models/user.model";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'

export const userService = {
  async getAll(): Promise<Array<User & {account: Account}>> {
    const users = userModel.getAll();
    return users
  },

  async getById(id:number): Promise<User & {account: Account}> {
    const user = userModel.getById(id)
    return user
  },

  async login(username:string, password:string) {
    const SECRET = process.env.SECRET;
    const user = await userModel.login(username);
    if (!user) {
      return { message: "Usuario incorreto"}
    }
    if (bcrypt.compareSync(password,user.password )) {
      const token = jwt.sign(
        {id:user.id.toString(), username:user.username },
        SECRET as string,
        {expiresIn: '24 hours'} 
      );
      return { 
        id: user.dataValues.id,
        username:user.dataValues.username,
        accountId: user.dataValues.accountId,
        account: user.dataValues.account,
        token: token,
        message: 'ok'}
    }
    return {message: 'Senha incorreta'}
  },

  async createUser(username:string, password:string) {
    const foundUsername = await userModel.getByUsername(username)
    if(!foundUsername){
      const hashedPassword = await bcrypt.hash(password,10);
      const newUserId = await userModel.createUser(username,hashedPassword);
      return newUserId
    }
    else {
      return null
    }
  },

  async getByUsername(username:string) {
    const userFound = await userModel.getByUsername(username)
    if(!userFound){
      return null
    }
    else {
      return userFound
    }
  }
}