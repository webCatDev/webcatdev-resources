/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			reactStrictMode: true,
			swcMinify: true,
			env: {
				axiosBaseURL: 'http://localhost:3000/api/books/',
			},
		};
	}

	return {
		reactStrictMode: true,
		swcMinify: true,
		env: {
			axiosBaseURL: 'https://webcatdev-resources.vercel.app/',
		},
	};
};
