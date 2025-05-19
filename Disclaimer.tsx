export function Disclaimer() {
  return (
    <div className="bg-amber-100 border-l-4 border-amber-500 py-3 px-4 sm:px-6 md:px-8">
      <div className="flex items-center max-w-7xl mx-auto">
        <div className="flex-shrink-0">
          <i className="fas fa-exclamation-triangle text-amber-500"></i>
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            <strong>DISCLAIMER:</strong> This tool does NOT provide official tax advice. Always consult a licensed tax professional before filing. We are not liable for errors or changes in tax laws.
          </p>
        </div>
      </div>
    </div>
  );
}
