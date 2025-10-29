import React from 'react';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-8 max-w-6xl">
				<header className="mb-8 text-center">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						Gradescope PDF Trimmer
					</h1>
					<p className="text-lg text-gray-600">
						Process Gradescope exports client-side: extract names,
						match to roster, trim pages, and download as ZIP
					</p>
				</header>

				<main className="space-y-6">{children}</main>

				<footer className="mt-8 text-center text-sm text-gray-600">
					<p>
						All processing happens in your browser. No data is sent
						to any server.
					</p>
				</footer>
			</div>
		</div>
	);
};

export default Layout;
