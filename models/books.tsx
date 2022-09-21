import { Sequelize, DataTypes } from 'sequelize';

// const sequelize = new Sequelize('q1XCMFzfMX', 'q1XCMFzfMX', 'VndKoxkhro', {
// 	host: 'remotemysql.com',
// 	dialect: 'mysql',
// });

const sequelize = new Sequelize(
	'mysql://root:uqixmW2KXdfd5IE5TO1K@containers-us-west-37.railway.app:6422/railway'
);

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
