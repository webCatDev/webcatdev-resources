// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '../../../models/books';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	return response.json({message: 'hello world'})
	try {
		await Book.sync()
		if (request.method === 'GET') {
			console.log('home page .....')
			const books = await Book.findAll({attributes: ['id','title', 'cover']})
			response.json(books)
		}

		if (request.method === 'POST') {
			const { title, description, author, cover } = request.body			
			const book = await Book.create({ title, description, author, cover });
			response.json(book)
		}

	} catch (err) {
		response.statusCode = 500;
		response.json({
			status: 'failed',
			statusCode: response.statusCode,
			message: err.message,
			error: err
		});
	}
}
