'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FCS extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FCS.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    fee_id: {
      allowNull: false,
      type: DataTypes.STRING(8),
      validate: {
        len: [8,8]
      }
    },
    fee_currency: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fee_locale: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fee_entity: {
      allowNull: false,
      type: DataTypes.STRING
    },
    entity_property: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fee_type: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['FLAT', 'PERC', 'FLAT_PERC']
    },
    fee_value: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'FCS',
    timestamps: true,
    tableName: 'FCs',
  });
  return FCS;
};