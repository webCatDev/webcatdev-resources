import axios from 'axios';
import { useCallback, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Books } from '../types/book';

const baseURL = '/api/books/';

interface Options {
	method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	data?: {
		cover?: string;
		title?: string;
		description?: string;
		author?: string;
	};
}

const useAxios = (): {
	httpRequest: (endPoint?: string, options?: Options) => void;
	data: AxiosResponse | Books | [];
	error: Error | null;
	loading: boolean;
} => {
	const [data, setData] = useState<AxiosResponse | Books | []>([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const httpRequest = useCallback(
		async (endPoint?: string, options?: Options) => {
			try {
				setLoading(true);
				const bookData = await axios(
					`${baseURL}${endPoint || ''}`,
					options
						? {
								method: options.method,
								data: options.data,
						  }
						: undefined
				);
				setData(bookData.data);
				setLoading(false);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return { httpRequest, data, error, loading };
};

export default useAxios;
