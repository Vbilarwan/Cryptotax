export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Three simple steps to generate your crypto tax report
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          {/* Step 1 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#3A0CA3] text-white flex items-center justify-center font-bold text-lg mb-5">1</div>
            <h3 className="text-xl font-semibold mb-3">Select Your Country</h3>
            <p className="text-gray-600 mb-4">
              Choose your country from our supported list to ensure tax calculations follow the correct regulations.
            </p>
            <img 
              src="https://pixabay.com/get/gc6be492c93e40bc4e875a3542bf6f4ab8ea1a81a680bc5262e8847c01a01659e08c2a531990d7919dcf7b8cc561ced10c12742b7bc5908dd3daac4e9dcd2332d_1280.jpg" 
              alt="World map with highlighted countries" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          
          {/* Step 2 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#3A0CA3] text-white flex items-center justify-center font-bold text-lg mb-5">2</div>
            <h3 className="text-xl font-semibold mb-3">Upload Transaction CSV</h3>
            <p className="text-gray-600 mb-4">
              Upload your crypto transaction history CSV file from exchanges like Binance, Coinbase, or others.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
              alt="CSV file upload illustration" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          
          {/* Step 3 */}
          <div className="bg-white rounded-xl shadow-sm p-8 flex-1">
            <div className="w-12 h-12 rounded-full bg-[#3A0CA3] text-white flex items-center justify-center font-bold text-lg mb-5">3</div>
            <h3 className="text-xl font-semibold mb-3">Get Your Tax Report</h3>
            <p className="text-gray-600 mb-4">
              Our AI processes your data and generates a simplified tax report with explanations in plain language.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300" 
              alt="Tax report document with AI explanations" 
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
