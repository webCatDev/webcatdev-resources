import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import styles from '../styles/Home.module.css';
import { Books, Book } from '../types/book';
export default function Home() {
	const router = useRouter();
	console.log(router);

	const { httpRequest, data, error, loading } = useAxios();

	useEffect(() => {
		 httpRequest();
  }, [httpRequest]);

  if (error) {
    console.log('error 💥', error)
    return <p>{error.message}</p>
  }

	if (loading) return <p>Loading...</p>;

	return (
		<div className={styles.container}>
			<Link href="/add-new-book">Add New Book</Link>
			{(data as Books).map((book: Book) => (
				<div
					id={book.id + ''}
					key={book.id}
				>
					<Link href={`/books/${book.id}`}>
						<h1 style={{ color: 'red', cursor: 'pointer' }}>{book.title}</h1>
					</Link>
				</div>
			))}
		</div>
	);
}
