import { INTEGER } from 'sequelize';
import { STRING } from 'sequelize';
import { Model } from 'sequelize';
import db from '.';
import Account from './account';

class User extends Model {
  id!: number;
  username!: string;
  password!: string;
  accountId!: number;
}

User.init({
  id: {
    type: INTEGER,
    allowNull:false,
    primaryKey:true,
    autoIncrement:true,
  },
  username: {
    type: STRING,
    allowNull:false,
  },
  password: {
    type: STRING,
    allowNull:false
  },
  accountId: {
    type: INTEGER,
    allowNull: false
  }

},{
  sequelize: db,
  modelName: 'users',
  timestamps: false,
})

User.belongsTo(Account, { foreignKey: 'accountId', as: 'account' })

export default User;