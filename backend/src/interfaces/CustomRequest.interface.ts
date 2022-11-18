import { Request } from "express";
import Account from "../database/models/account";
import User from "../database/models/user";

export interface CustomRequest extends Request {
  user?: User & {account:Account}
}