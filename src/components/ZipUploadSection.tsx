import React from 'react';

interface ZipUploadSectionProps {
	zipFile: File | null;
	onZipUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ZipUploadSection: React.FC<ZipUploadSectionProps> = ({
	zipFile,
	onZipUpload,
}) => {
	return (
		<section className="bg-white rounded-lg shadow p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Upload Gradescope Export
			</h3>
			<div>
				<label
					htmlFor="zip-upload"
					className="block text-sm font-medium text-gray-700 mb-2"
				>
					Gradescope ZIP File
				</label>
				<input
					id="zip-upload"
					type="file"
					accept=".zip"
					onChange={onZipUpload}
					className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>
				<p className="mt-1 text-xs text-gray-500">
					Upload the ZIP file exported from Gradescope (should contain
					submission_metadata.yml and PDF files)
				</p>
				{zipFile && (
					<p className="mt-2 text-sm text-gray-600">
						✓ Selected: {zipFile.name}
					</p>
				)}
			</div>
		</section>
	);
};

export default ZipUploadSection;
