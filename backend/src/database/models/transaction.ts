import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import { DATE } from 'sequelize';
import { Model } from 'sequelize';
import db from '.';
import Account from './account';

class Transaction extends Model {
  id!: number;
  value!: string;
  creditedAccountId!: number;
  debitedAccountId!: number;
  createdAt!: Date;
}

Transaction.init({
  id: {
    type: INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  value: {
    type: STRING,
    allowNull:false,
  },
  creditedAccountId: {
    type: INTEGER,
    allowNull:false
  },
  debitedAccountId: {
    type: INTEGER,
    allowNull: false
  },
  createdAt: {
    type: DATE,
    allowNull: false
  }

},{
  sequelize: db,
  modelName: 'transactions',
  timestamps: false,
})

Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'creditedAccount' })
Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debitedAccount' })

export default Transaction;