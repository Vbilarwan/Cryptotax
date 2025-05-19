export function Header() {
  return (
    <header className="bg-gradient-to-r from-[#3A0CA3] to-[#4CC9F0] text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Crypto AI Manager</h1>
            <p className="text-xl md:text-2xl text-[#D1F2FF] mb-8">
              Transform your crypto transaction history into simple, country-specific tax reports — instantly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#get-started" 
                className="inline-flex justify-center items-center px-8 py-3 rounded-lg bg-[#F72585] hover:bg-[#D90368] text-white font-medium transition duration-150 ease-in-out"
              >
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a 
                href="#donation" 
                className="inline-flex justify-center items-center px-8 py-3 rounded-lg bg-white text-[#3A0CA3] hover:bg-gray-100 font-medium transition duration-150 ease-in-out"
              >
                <i className="fab fa-paypal mr-2"></i>
                Support Us
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500" 
              alt="Crypto tax visualization with charts" 
              className="rounded-xl shadow-2xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
