import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('q1XCMFzfMX', 'q1XCMFzfMX', 'VndKoxkhro', {
	host: 'remotemysql.com',
	port: 3306,
	dialect: 'mysql',
});

export const Book = sequelize.define('Book', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cover: {
		type: DataTypes.STRING,
	},
});
