import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import { Model } from 'sequelize';
import db from '.';

class Account extends Model {
  id!: number;
  balance!: string;
}

Account.init({
  id: {
    type: INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  balance: {
    type: STRING,
    allowNull:false,
    defaultValue: '100,00'
  }

},{
  sequelize: db,
  modelName: 'accounts',
  timestamps: false,
})

export default Account;