import { useState, useEffect } from "react";
import { countries, Country } from "@/lib/country-data";

interface CountrySelectorProps {
  onCountrySelect: (country: Country) => void;
  selectedCountry: Country | null;
  onContinue: () => void;
}

export function CountrySelector({ onCountrySelect, selectedCountry, onContinue }: CountrySelectorProps) {
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // If a country is selected, show the country info
    if (selectedCountry) {
      setShowInfo(true);
    } else {
      setShowInfo(false);
    }
  }, [selectedCountry]);

  return (
    <>
      <div className="p-8 md:p-10">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Your Country</h3>
        <p className="text-gray-600 mb-8">
          We'll customize tax calculations based on your country's specific regulations.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {countries.map((country) => (
            <div 
              key={country.code}
              className={`country-selector cursor-pointer bg-gray-50 hover:bg-[#EEE9FE] border-2 
                ${selectedCountry?.code === country.code 
                  ? "border-[#3A0CA3] bg-[#EEE9FE]" 
                  : "border-transparent"} 
                rounded-lg p-4 transition-all`}
              onClick={() => onCountrySelect(country)}
            >
              <div className="flex flex-col items-center justify-center">
                <img 
                  src={country.flagUrl} 
                  alt={`${country.name} flag`} 
                  className="mb-2 w-16 h-10 object-cover rounded shadow-sm"
                />
                <span className="font-medium text-sm">{country.name}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Country-specific info */}
        {showInfo && selectedCountry && (
          <div className="bg-[#EEE9FE] rounded-lg p-6 mb-6">
            <h4 className="font-bold text-[#29076B] text-lg mb-2">{selectedCountry.name}</h4>
            <p className="text-[#310987]">{selectedCountry.taxInfo}</p>
          </div>
        )}
      </div>
      
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button 
          onClick={onContinue}
          disabled={!selectedCountry}
          className="bg-[#3A0CA3] hover:bg-[#29076B] text-white font-medium py-2 px-6 rounded transition duration-150 ease-in-out disabled:opacity-50"
        >
          Continue
          <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </>
  );
}
