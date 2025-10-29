import React from 'react';

interface ErrorSectionProps {
	error: string;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ error }) => {
	return (
		<section className="bg-red-50 border border-red-200 rounded-lg shadow p-6">
			<h3 className="text-lg font-semibold text-red-900 mb-2">Error</h3>
			<p className="text-red-700">{error}</p>
		</section>
	);
};

export default ErrorSection;
