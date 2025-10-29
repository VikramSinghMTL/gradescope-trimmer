import React from 'react';

interface ProcessingSectionProps {
	pagesToKeep: number;
	isProcessing: boolean;
	progress: { current: number; total: number } | null;
	onPagesToKeepChange: (pages: number) => void;
	onProcess: () => void;
}

const ProcessingSection: React.FC<ProcessingSectionProps> = ({
	pagesToKeep,
	isProcessing,
	progress,
	onPagesToKeepChange,
	onProcess,
}) => {
	return (
		<section className="bg-white rounded-lg shadow p-6">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Processing Settings
			</h3>
			<div className="space-y-4">
				<div>
					<label
						htmlFor="pages-to-keep"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Pages to Keep
					</label>
					<input
						id="pages-to-keep"
						type="number"
						min="1"
						value={pagesToKeep}
						onChange={(e) =>
							onPagesToKeepChange(
								Math.max(1, parseInt(e.target.value) || 1)
							)
						}
						className="w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
					<p className="mt-1 text-xs text-gray-500">
						Number of pages to keep from the beginning of each PDF
					</p>
				</div>

				<button
					onClick={onProcess}
					disabled={isProcessing}
					className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-200"
				>
					{isProcessing
						? `Processing... ${progress?.current}/${progress?.total}`
						: 'Process & Download'}
				</button>

				{isProcessing && progress && (
					<div className="mt-4">
						<div className="flex justify-between text-sm text-gray-600 mb-1">
							<span>Processing PDFs...</span>
							<span>
								{progress.current} / {progress.total}
							</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full h-2">
							<div
								className="bg-blue-600 h-2 rounded-full transition-all duration-300"
								style={{
									width: `${
										(progress.current / progress.total) *
										100
									}%`,
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default ProcessingSection;
