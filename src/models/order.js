const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return order.init(sequelize, DataTypes);
};

class order extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "user",
            key: "user_id",
          },
        },
        food_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          references: {
            model: "food",
            key: "food_id",
          },
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        code: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        arr_sub_id: {
          type: DataTypes.STRING(255),
          allowNull: true,
          get() {
            const value = this.getDataValue("arr_sub_id");
            return value !== "" ? JSON.parse(value) : [];
          },
        },
      },
      {
        sequelize,
        tableName: "order",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "user_id" }, { name: "food_id" }],
          },
          {
            name: "food_id",
            using: "BTREE",
            fields: [{ name: "food_id" }],
          },
        ],
      }
    );
  }
}
