import React from 'react';

const GettingStartedSection: React.FC = () => {
	return (
		<section className="bg-blue-50 border border-blue-200 rounded-lg shadow p-6">
			<h3 className="text-lg font-semibold text-blue-900 mb-2">
				Getting Started
			</h3>
			<div className="text-blue-800 space-y-2">
				<p>
					<strong>Step 1:</strong> Export submissions from Gradescope
					as a ZIP file
				</p>
				<p>
					<strong>Step 2:</strong> Upload the ZIP file here
				</p>
				<p>
					<strong>Step 3:</strong> Set how many pages to keep from
					each PDF
				</p>
				<p>
					<strong>Step 4:</strong> Click "Process & Download" to get a
					ZIP with renamed, trimmed PDFs
				</p>
			</div>
		</section>
	);
};

export default GettingStartedSection;
