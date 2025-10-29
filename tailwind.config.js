/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'log-info': '#3b82f6',
				'log-warn': '#f59e0b',
				'log-error': '#ef4444',
				'log-success': '#10b981',
			},
		},
	},
	plugins: [],
};
