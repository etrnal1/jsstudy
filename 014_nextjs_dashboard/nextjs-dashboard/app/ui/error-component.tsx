interface ErrorComponentProps {
    error: Error | unknown;
}

export default function ErrorComponent({ error }: ErrorComponentProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">
                            Error occurred
                        </h3>
                        <div className="mt-2 text-sm text-red-700">
                            {error instanceof Error ? error.message : 'An unexpected error occurred'}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 