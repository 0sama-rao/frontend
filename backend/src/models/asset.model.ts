import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Asset extends Model {
  public id!: number;
  public name!: string;
  public value!: number;
  public currency!: string;
}

Asset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Asset',
    tableName: 'assets',
    timestamps: true,
  }
);

export default Asset;
