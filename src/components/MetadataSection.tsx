import React from 'react';
import type { SubmissionMetadata } from '../services/yamlParser';

interface MetadataSectionProps {
	metadata: SubmissionMetadata;
	pdfFilesCount: number;
	stats: {
		totalSubmissions: number;
		uniqueStudents: number;
		groupSubmissions: number;
	};
}

const MetadataSection: React.FC<MetadataSectionProps> = ({
	metadata,
	pdfFilesCount,
	stats,
}) => {
	return (
		<section className="bg-green-50 border border-green-200 rounded-lg shadow p-6">
			<h3 className="text-lg font-semibold text-green-900 mb-4">
				✓ Metadata Loaded Successfully
			</h3>
			<div className="space-y-4">
				<div className="grid grid-cols-3 gap-4 text-sm">
					<div className="text-green-800">
						<span className="font-medium">Total submissions:</span>{' '}
						{stats.totalSubmissions}
					</div>
					<div className="text-green-800">
						<span className="font-medium">Unique students:</span>{' '}
						{stats.uniqueStudents}
					</div>
					<div className="text-green-800">
						<span className="font-medium">PDF files:</span>{' '}
						{pdfFilesCount}
					</div>
				</div>
				{stats.groupSubmissions > 0 && (
					<p className="text-yellow-700 text-sm">
						<span className="font-medium">ℹ Note:</span>{' '}
						{stats.groupSubmissions} group submission
						{stats.groupSubmissions > 1 ? 's' : ''} found (will use
						first student's ID)
					</p>
				)}
				<div className="mt-4">
					<h4 className="text-sm font-medium text-green-900 mb-2">
						Submission Details
					</h4>
					<div className="max-h-64 overflow-y-auto border border-green-300 rounded-md bg-white">
						<table className="min-w-full divide-y divide-gray-200">
							<thead className="bg-gray-50 sticky top-0">
								<tr>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										PDF File
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Student Name
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Student ID
									</th>
									<th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Email
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{Object.entries(metadata).map(
									([filename, submission]) => {
										const submitter =
											submission.submitters[0];
										return (
											<tr
												key={filename}
												className="hover:bg-gray-50"
											>
												<td className="px-4 py-2 text-sm text-gray-900 font-mono">
													{filename}
												</td>
												<td className="px-4 py-2 text-sm text-gray-900">
													{submitter?.name || 'N/A'}
													{submission.submitters
														.length > 1 && (
														<span className="ml-1 text-xs text-gray-500">
															(+
															{submission
																.submitters
																.length -
																1}{' '}
															more)
														</span>
													)}
												</td>
												<td className="px-4 py-2 text-sm text-gray-600">
													{submitter?.sid || 'N/A'}
												</td>
												<td className="px-4 py-2 text-sm text-gray-600">
													{submitter?.email || 'N/A'}
												</td>
											</tr>
										);
									}
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MetadataSection;
