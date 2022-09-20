import Link from 'next/link';
import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import {  Book } from '../../types/book';

export default function BookPage() {
	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();
	const { httpRequest, data, error, loading } = useAxios();
	const book = data as unknown as Book;

	useEffect(() => {
		if (router.query.id) httpRequest(router.query.id as string);
	}, [httpRequest, router.query.id]);

	if (error) return <p>Something went wrong.</p>;

	if (loading) return <p>Loading...</p>;

	const handleDelete = () => {
		httpRequest(router.query.id as string, { method: 'DELETE' });
		router.replace('/');
    };
    
    const handleEdit = () => setIsEditing(prev => !prev);

    const handleSubmit: FormEventHandler = async (e: FormEvent) => {
			e.preventDefault();
			const { title, description, cover, author } = e.target as unknown as {
				title: { value: string };
				description: { value: string };
				cover: { value: string };
				author: { value: string };
			};

			httpRequest(router.query.id as string, {
				method: 'PUT',
				data: {
					title: title.value,
					description: description.value,
					cover: cover.value,
					author: author.value,
				},
			});

        setIsEditing(false);
			router.reload();
		};
    
	return (
		<div>
			{!isEditing && (
				<div>
					<h1>{book.title}</h1>
					<h2>Author: {book.author}</h2>
					<p>Description: {book.description}</p>
				</div>
			)}

			{isEditing && (
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor="title">Title</label>
						<input
							type="text"
							name="title"
							id="title"
							placeholder="title"
							defaultValue={book.title}
						/>
					</div>

					<div>
						<label htmlFor="author">author</label>
						<input
							type="text"
							name="author"
							id="author"
							placeholder="author"
							defaultValue={book.author}
						/>
					</div>

					<div>
						<label htmlFor="description">description</label>
						<textarea
							name="description"
							id="description"
							placeholder="description"
							defaultValue={book.description}
						></textarea>
					</div>

					<div>
						<label htmlFor="cover">cover</label>
						<input
							type="text"
							name="cover"
							id="cover"
							placeholder="cover"
							defaultValue={book.cover}
						/>
					</div>
					<button>Save</button>
				</form>
			)}
			<div>
				<button onClick={handleDelete}>Delete book</button>
				<button onClick={handleEdit}>
					{isEditing ? 'Cancel' : 'Edit book'}
				</button>
			</div>
		</div>
	);
}
