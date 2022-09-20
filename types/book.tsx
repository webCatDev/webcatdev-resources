import {  RowDataPacket } from "mysql2";

export interface Book extends  RowDataPacket {
	id?: number;
	title: string;
	author: string;
	description: string;
	cover?: string;
}

export type Books = Book[];


