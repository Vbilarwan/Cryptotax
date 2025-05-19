import { useState } from "react";
import { CountrySelector } from "./CountrySelector";
import { CsvUploader } from "./CsvUploader";
import { ReportResults } from "./ReportResults";
import { Country } from "@/lib/country-data";

export function ReportGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Function to handle country selection
  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
  };

  // Function to handle CSV file upload
  const handleFileUpload = (file: File) => {
    setCsvFile(file);
  };

  // Function to remove uploaded file
  const handleRemoveFile = () => {
    setCsvFile(null);
  };

  // Function to navigate to next step
  const goToNextStep = async () => {
    if (currentStep === 2 && csvFile && selectedCountry) {
      setIsGenerating(true);
      // Move to step 3
      setCurrentStep(3);
      
      try {
        // Prepare form data
        const formData = new FormData();
        formData.append('file', csvFile);
        formData.append('country', selectedCountry.code);
        
        // Send to backend for processing
        const response = await fetch('/api/generate-report', {
          method: 'POST',
          body: formData
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error generating report:', error);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Just move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  // Function to go back to previous step
  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Function to start over
  const startOver = () => {
    setCurrentStep(1);
    setSelectedCountry(null);
    setCsvFile(null);
    setResults(null);
  };

  return (
    <section id="get-started" className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Generate Your Tax Report</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Follow the steps below to create your customized crypto tax report
          </p>
        </div>
        
        {/* Stepper Progress */}
        <div className="flex justify-between items-center mb-10 max-w-3xl mx-auto">
          <div className="w-full flex items-center">
            <div className="relative flex flex-col items-center text-[#3A0CA3]">
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                currentStep === 1 
                  ? "border-[#3A0CA3] bg-[#3A0CA3] text-white" 
                  : currentStep > 1 
                    ? "border-[#10B981] bg-[#10B981] text-white" 
                    : "border-gray-300 bg-gray-200 text-gray-500"
              } flex items-center justify-center`}>
                {currentStep > 1 ? <i className="fas fa-check"></i> : <span className="font-bold">1</span>}
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                Select Country
              </div>
            </div>
            <div className={`flex-auto border-t-2 ${currentStep > 1 ? "border-[#3A0CA3]" : "border-gray-300"}`}></div>
            <div className="relative flex flex-col items-center text-gray-500">
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                currentStep === 2 
                  ? "border-[#3A0CA3] bg-[#3A0CA3] text-white" 
                  : currentStep > 2 
                    ? "border-[#10B981] bg-[#10B981] text-white" 
                    : "border-gray-300 bg-gray-200 text-gray-500"
              } flex items-center justify-center`}>
                {currentStep > 2 ? <i className="fas fa-check"></i> : <span className="font-bold">2</span>}
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                Upload Data
              </div>
            </div>
            <div className={`flex-auto border-t-2 ${currentStep > 2 ? "border-[#3A0CA3]" : "border-gray-300"}`}></div>
            <div className="relative flex flex-col items-center text-gray-500">
              <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                currentStep === 3 
                  ? "border-[#3A0CA3] bg-[#3A0CA3] text-white" 
                  : "border-gray-300 bg-gray-200 text-gray-500"
              } flex items-center justify-center`}>
                <span className="font-bold">3</span>
              </div>
              <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium">
                Get Report
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Container */}
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-4xl mx-auto border border-gray-200">
          {/* Step 1: Country Selection */}
          {currentStep === 1 && (
            <CountrySelector 
              onCountrySelect={handleCountrySelect}
              selectedCountry={selectedCountry}
              onContinue={goToNextStep}
            />
          )}
          
          {/* Step 2: File Upload */}
          {currentStep === 2 && (
            <CsvUploader
              onFileUpload={handleFileUpload}
              onRemoveFile={handleRemoveFile}
              file={csvFile}
              onContinue={goToNextStep}
              onBack={goToPreviousStep}
            />
          )}
          
          {/* Step 3: Results */}
          {currentStep === 3 && (
            <ReportResults
              isLoading={isGenerating}
              results={results}
              onBack={goToPreviousStep}
              onStartOver={startOver}
              country={selectedCountry}
            />
          )}
        </div>
      </div>
    </section>
  );
}
