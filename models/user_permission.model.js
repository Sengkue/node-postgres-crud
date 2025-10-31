const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const UserPermission = sequelize.define('UserPermission', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    onDelete: 'CASCADE',
  },
  resource: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Resource name: users, products, sales, reports, etc.',
  },
  action: {
    type: DataTypes.ENUM('view', 'create', 'update', 'delete'),
    allowNull: false,
  },
}, {
  tableName: 'user_permissions',
  timestamps: true,
  indexes: [
    { unique: true, fields: ['userId', 'resource', 'action'] },
    { fields: ['userId'] },
  ],
});

module.exports = UserPermission;
