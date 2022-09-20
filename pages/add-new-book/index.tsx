import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler } from 'react';
import useAxios from '../../hooks/useAxios';

const AddNewBookPage = () => {
	const { httpRequest, error, loading } = useAxios();
	const router = useRouter();
	console.log(router);

	const handleSubmit: FormEventHandler = async (e: FormEvent) => {
		e.preventDefault();
		const { title, description, cover, author } = e.target as unknown as {
			title: { value: string };
			description: { value: string };
			cover: { value: string };
			author: { value: string };
		};

		httpRequest('', {
			method: 'POST',
			data: {
				title: title.value,
				description: description.value,
				cover: cover.value,
				author: author.value,
			},
		});

		window.location.replace('/')
	};

	if (error) return <p>Something went wrong.</p>;

	if (loading) return <p>Loading...</p>;

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="title">Title</label>
				<input
					type="text"
					name="title"
					id="title"
					placeholder="title"
				/>
			</div>

			<div>
				<label htmlFor="author">author</label>
				<input
					type="text"
					name="author"
					id="author"
					placeholder="author"
				/>
			</div>

			<div>
				<label htmlFor="description">description</label>
				<textarea
					name="description"
					id="description"
					placeholder="description"
				></textarea>
			</div>

			<div>
				<label htmlFor="cover">cover</label>
				<input
					type="text"
					name="cover"
					id="cover"
					placeholder="cover"
				/>
			</div>
			<button>Add</button>
		</form>
	);
};

export default AddNewBookPage;
