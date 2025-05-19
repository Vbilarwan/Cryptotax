import { useEffect, useState } from "react";
import { PdfGenerator } from "./PdfGenerator";
import { Country } from "@/lib/country-data";

interface ReportResultsProps {
  isLoading: boolean;
  results: any;
  onBack: () => void;
  onStartOver: () => void;
  country: Country | null;
}

export function ReportResults({ isLoading, results, onBack, onStartOver, country }: ReportResultsProps) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Mock data for development - will be replaced by actual API results
  const [reportData, setReportData] = useState<{
    totalTransactions: number;
    totalCapitalGains: string;
    taxYear: string;
    estimatedTax: string;
    aiExplanation: string[];
  } | null>(null);

  useEffect(() => {
    if (results) {
      setReportData({
        totalTransactions: results.totalTransactions || 0,
        totalCapitalGains: results.totalCapitalGains || "$0.00",
        taxYear: results.taxYear || new Date().getFullYear().toString(),
        estimatedTax: results.estimatedTax || "$0.00",
        aiExplanation: results.aiExplanation || []
      });
    }
  }, [results]);

  const handleDownloadPdf = async () => {
    if (!reportData || !country) return;
    
    setIsGeneratingPdf(true);
    try {
      // In a real implementation, this would generate a PDF from the report data
      await PdfGenerator.generatePdf(reportData, country);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <>
      <div className="p-8 md:p-10">
        {isLoading ? (
          <div className="flex items-center justify-center mb-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3A0CA3]"></div>
            <p className="ml-4 font-medium text-gray-700">
              Analyzing your transactions and generating report...
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-7/12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Tax Report is Ready</h3>
              
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Summary</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Total Transactions</span>
                      <span className="font-medium">{reportData?.totalTransactions || 0}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Total Capital Gains</span>
                      <span className="font-medium">{reportData?.totalCapitalGains || "$0.00"}</span>
                    </div>
                    <div className="flex justify-between pb-3 border-b border-gray-100">
                      <span className="text-gray-600">Tax Year</span>
                      <span className="font-medium">{reportData?.taxYear || new Date().getFullYear()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estimated Tax Liability</span>
                      <span className="font-medium text-[#3A0CA3]">{reportData?.estimatedTax || "$0.00"}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#EEE9FE] rounded-lg p-6 mb-6">
                <h4 className="text-lg font-semibold text-[#29076B] mb-3">AI-Generated Tax Explanation</h4>
                {reportData?.aiExplanation?.map((paragraph, index) => (
                  <p key={index} className="text-[#310987] mb-4">{paragraph}</p>
                ))}
                <div className="mt-4 pt-4 border-t border-[#D0C3FD]">
                  <p className="text-sm text-[#310987] italic">
                    <i className="fas fa-robot mr-2"></i>
                    Generated using AI to simplify tax concepts. Not official tax advice.
                  </p>
                </div>
              </div>
              
              <button 
                className={`w-full bg-[#F72585] hover:bg-[#D90368] text-white font-medium py-3 px-6 rounded-lg transition duration-150 ease-in-out flex items-center justify-center ${isGeneratingPdf ? 'opacity-70 cursor-not-allowed' : ''}`}
                onClick={handleDownloadPdf}
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <i className="fas fa-file-pdf mr-2"></i>
                    Download Complete Tax Report (PDF)
                  </>
                )}
              </button>
            </div>
            
            <div className="md:w-5/12">
              {/* PDF Preview */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-800 px-4 py-3 flex items-center">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm mx-auto">Report Preview</span>
                </div>
                <div className="p-6 bg-gray-50">
                  <img 
                    src="https://pixabay.com/get/g845e94cfd60c307e52b2aa4b61ee5fff87f0db9b018356068b8aeec1f30604889fbc3115cbb36fae4e6bc0ebc280d46ef13bbbbe5095c6a30cffb3b661e63be3_1280.jpg" 
                    alt="Tax report PDF preview" 
                    className="w-full h-auto rounded border border-gray-300 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
        <button 
          onClick={onBack}
          className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded transition duration-150 ease-in-out"
          disabled={isLoading}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          Back
        </button>
        {!isLoading && (
          <button 
            onClick={onStartOver}
            className="border border-[#3A0CA3] bg-white hover:bg-[#EEE9FE] text-[#3A0CA3] font-medium py-2 px-6 rounded transition duration-150 ease-in-out"
          >
            <i className="fas fa-redo mr-2"></i>
            Start Over
          </button>
        )}
      </div>
    </>
  );
}
