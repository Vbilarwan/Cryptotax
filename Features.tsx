export function Features() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Why Use Crypto AI Manager?</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            No login required. No exchange APIs used. Everything is done locally in your browser.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#EEE9FE] rounded-full flex items-center justify-center mb-5">
              <i className="fas fa-globe text-[#3A0CA3] text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Country-Specific Reports</h3>
            <p className="text-gray-600">
              Tax reports customized for United States, United Kingdom, India, Germany, Canada, Australia, and Japan tax requirements.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#D1F2FF] rounded-full flex items-center justify-center mb-5">
              <i className="fas fa-robot text-[#0096C7] text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Explanations</h3>
            <p className="text-gray-600">
              Complex tax terms simplified into everyday language, making it easy to understand your tax obligations.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-gray-50 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#FFDDF1] rounded-full flex items-center justify-center mb-5">
              <i className="fas fa-file-pdf text-[#F72585] text-xl"></i>
            </div>
            <h3 className="text-xl font-semibold mb-3">Ready-to-Use PDF Reports</h3>
            <p className="text-gray-600">
              Download clean, professional reports ready for review or submission to tax authorities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
