// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import { Book } from '../../../models/books';

export default async function handler(
	request: NextApiRequest,
	response: NextApiResponse
) {
	try {
		await Book.sync();
		if (request.method === 'GET') {
			const { id } = request.query;
			const books = await Book.findByPk(id as string)
			response.json(books);
		}

		if (request.method === 'PUT') {
			const { id } = request.query;
			const { title, description, author, cover } = request.body;
			const book = await Book.update(
				{ title, description, author, cover },
				{ where: { id } }
			);
			response.json(book);
		}

		if (request.method === 'DELETE') {
			const { id } = request.query;
			const book = await Book.destroy({ where: { id } });
			response.json({ message: 'deleted succesfully' });
		}
	} catch (err) {
		response.statusCode = 500;
		response.json({
			status: 'failed',
			statusCode: response.statusCode,
			message: err.message,
		});
	}
}
