import React, { useState } from 'react';
import Layout from './components/Layout';
import ZipUploadSection from './components/ZipUploadSection';
import ErrorSection from './components/ErrorSection';
import MetadataSection from './components/MetadataSection';
import ProcessingSection from './components/ProcessingSection';
import GettingStartedSection from './components/GettingStartedSection';
import { YAMLParser } from './services/yamlParser';
import { ZipHandler } from './services/zipHandler';
import { PDFTrimmer } from './services/pdfTrimmer';
import type { SubmissionMetadata } from './services/yamlParser';

const App: React.FC = () => {
	const [zipFile, setZipFile] = useState<File | null>(null);
	const [metadata, setMetadata] = useState<SubmissionMetadata | null>(null);
	const [pdfFiles, setPdfFiles] = useState<Map<string, File>>(new Map());
	const [pagesToKeep, setPagesToKeep] = useState<number>(1);
	const [isProcessing, setIsProcessing] = useState(false);
	const [progress, setProgress] = useState<{
		current: number;
		total: number;
	} | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleZipUpload = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		setZipFile(file);
		setError(null);
		setMetadata(null);
		setPdfFiles(new Map());

		try {
			// Extract ZIP contents
			const contents = await ZipHandler.extractZipContents(file);

			// Parse YAML metadata
			if (!contents.yamlFile) {
				throw new Error(
					'submission_metadata.yml not found in ZIP file'
				);
			}

			const yamlText = await contents.yamlFile.text();
			const parsedMetadata = YAMLParser.parse(yamlText);
			setMetadata(parsedMetadata);
			setPdfFiles(contents.pdfFiles);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Unknown error';
			setError(`Failed to process ZIP: ${errorMessage}`);
		}
	};

	const handleProcess = async () => {
		if (!metadata || pdfFiles.size === 0) return;

		setIsProcessing(true);
		setError(null);
		setProgress({ current: 0, total: pdfFiles.size });

		try {
			// Trim PDFs
			const trimmedPdfs = await PDFTrimmer.trimPdfs(
				pdfFiles,
				pagesToKeep,
				(current, total) => setProgress({ current, total })
			);

			// Rename PDFs based on student IDs
			const renamedPdfs = new Map<string, Blob>();
			for (const [originalFilename, blob] of trimmedPdfs.entries()) {
				const studentId = YAMLParser.getStudentId(
					metadata,
					originalFilename
				);
				if (studentId) {
					const newFilename = `${studentId}.pdf`;
					renamedPdfs.set(newFilename, blob);
				} else {
					// Keep original filename if no student ID found
					renamedPdfs.set(originalFilename, blob);
				}
			}

			// Create ZIP file
			const outputZip = await ZipHandler.createZipFile(
				renamedPdfs,
				'processed_submissions.zip'
			);

			// Download the ZIP
			ZipHandler.downloadFile(outputZip);

			setProgress(null);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : 'Unknown error';
			setError(`Failed to process PDFs: ${errorMessage}`);
		} finally {
			setIsProcessing(false);
		}
	};

	const stats = metadata ? YAMLParser.getStats(metadata) : null;

	return (
		<Layout>
			<ZipUploadSection zipFile={zipFile} onZipUpload={handleZipUpload} />

			{error && <ErrorSection error={error} />}

			{metadata && stats && (
				<MetadataSection
					metadata={metadata}
					pdfFilesCount={pdfFiles.size}
					stats={stats}
				/>
			)}

			{metadata && (
				<ProcessingSection
					pagesToKeep={pagesToKeep}
					isProcessing={isProcessing}
					progress={progress}
					onPagesToKeepChange={setPagesToKeep}
					onProcess={handleProcess}
				/>
			)}

			{!zipFile && <GettingStartedSection />}
		</Layout>
	);
};
export default App;
