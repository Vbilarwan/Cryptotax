import { useState, useRef, DragEvent, ChangeEvent } from "react";

interface CsvUploaderProps {
  onFileUpload: (file: File) => void;
  onRemoveFile: () => void;
  file: File | null;
  onContinue: () => void;
  onBack: () => void;
}

export function CsvUploader({ onFileUpload, onRemoveFile, file, onContinue, onBack }: CsvUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileStats, setFileStats] = useState<{ transactions: number; cryptos: string[]; dateRange: string } | null>(null);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      processFile(selectedFile);
    }
  };

  // Handle file drop
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      processFile(droppedFile);
    }
  };

  // Process the uploaded file
  const processFile = (file: File) => {
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      alert('Please upload a CSV file');
      return;
    }
    
    // Read and parse the CSV to extract stats
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target) {
        const content = event.target.result as string;
        const lines = content.split('\n').filter(line => line.trim());
        
        // Simple parsing to extract some statistics
        // In a real app, this would be more robust
        const transactions = lines.length - 1; // Subtract header
        
        // Extract unique cryptocurrencies (this is a simplification)
        const cryptoIndex = 2; // Assuming crypto is in column 3
        const uniqueCryptos = new Set<string>();
        
        lines.slice(1).forEach(line => {
          const columns = line.split(',');
          if (columns.length > cryptoIndex) {
            uniqueCryptos.add(columns[cryptoIndex].trim());
          }
        });
        
        // Extract date range
        const dateIndex = 0; // Assuming date is in column 1
        let dates: Date[] = [];
        
        lines.slice(1).forEach(line => {
          const columns = line.split(',');
          if (columns.length > dateIndex) {
            const dateStr = columns[dateIndex].trim();
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
              dates.push(date);
            }
          }
        });
        
        // Sort dates
        dates.sort((a, b) => a.getTime() - b.getTime());
        
        // Format date range
        let dateRange = '';
        if (dates.length > 0) {
          const firstDate = dates[0];
          const lastDate = dates[dates.length - 1];
          
          dateRange = `${firstDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - ${lastDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
        }
        
        setFileStats({
          transactions,
          cryptos: Array.from(uniqueCryptos),
          dateRange
        });
        
        onFileUpload(file);
      }
    };
    
    reader.readAsText(file);
  };

  // Handle drag events
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Open file dialog when button is clicked
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="p-8 md:p-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Transaction CSV</h3>
        <p className="text-gray-600 mb-8">
          Upload your cryptocurrency transaction history in CSV format. We support exports from major exchanges like Binance, Coinbase, and more.
        </p>
        
        <div className="mb-8">
          <div 
            className={`border-2 border-dashed ${isDragOver ? 'border-[#3A0CA3] bg-[#EEE9FE]' : 'border-gray-300 bg-gray-50'} rounded-lg p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden" 
              accept=".csv" 
              onChange={handleFileChange}
            />
            <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
            <h4 className="font-medium text-lg text-gray-700 mb-2">
              Drag and drop your CSV file here
            </h4>
            <p className="text-gray-500 mb-4">or</p>
            <button className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-[#3A0CA3] hover:bg-[#29076B] focus:outline-none">
              Browse Files
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Supported exchanges: Binance, Coinbase, Kraken, Gemini, and more
            </p>
          </div>
        </div>
        
        {file && fileStats && (
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <i className="fas fa-check-circle text-green-500 text-xl"></i>
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-green-800">{file.name}</h4>
                <p className="text-sm text-green-700 mt-1">
                  {fileStats.transactions} transactions detected • {fileStats.cryptos.length} cryptocurrencies • Date range: {fileStats.dateRange}
                </p>
              </div>
              <button className="ml-auto text-gray-400 hover:text-gray-500" onClick={onRemoveFile}>
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-blue-50 rounded-lg p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <i className="fas fa-info-circle text-blue-500 text-xl"></i>
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-blue-800">Need a template?</h4>
              <p className="text-sm text-blue-700 mt-1">
                Download CSV templates for popular exchanges to make sure your data is formatted correctly.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <a href="/templates/binance.csv" className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                  <i className="fas fa-download mr-1"></i> Binance
                </a>
                <a href="/templates/coinbase.csv" className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                  <i className="fas fa-download mr-1"></i> Coinbase
                </a>
                <a href="/templates/kraken.csv" className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100">
                  <i className="fas fa-download mr-1"></i> Kraken
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button 
          onClick={onBack}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded transition duration-150 ease-in-out"
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        <button 
          onClick={onContinue}
          disabled={!file}
          className="bg-[#3A0CA3] hover:bg-[#29076B] text-white font-medium py-2 px-6 rounded transition duration-150 ease-in-out disabled:opacity-50"
        >
          Generate Report
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </>
  );
}
