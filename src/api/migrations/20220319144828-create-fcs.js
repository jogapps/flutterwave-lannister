'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FCs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
      },
      fee_id: {
        allowNull: false,
        type: Sequelize.STRING(8),
        validate: {
          len: [8,8]
        }
      },
      fee_currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fee_locale: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fee_entity: {
        allowNull: false,
        type: Sequelize.STRING
      },
      entity_property: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fee_type: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ['FLAT', 'PERC', 'FLAT_PERC']
      },
      fee_value: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FCs');
  }
};