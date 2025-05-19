export function DonationSection() {
  return (
    <section id="donation" className="py-12 md:py-16 bg-[#3A0CA3] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Support Our Mission</h2>
            <p className="text-xl text-[#D0C3FD] mb-6">
              We're committed to keeping Crypto AI Manager free for everyone. Your support helps us maintain and improve this tool.
            </p>
            <p className="text-[#B39CFC] mb-8">
              If you found this tool helpful, please consider supporting our work with a donation of any amount. Every contribution makes a difference!
            </p>
          </div>
          <div className="md:w-1/2 bg-white text-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-center">
              <div className="inline-block rounded-full bg-[#EEE9FE] p-4 mb-4">
                <i className="fab fa-paypal text-3xl text-[#3A0CA3]"></i>
              </div>
              <h3 className="text-xl font-bold mb-2">Donate via PayPal</h3>
              <p className="text-gray-600 mb-6">
                Your generous support keeps this tool free and accessible to everyone.
              </p>
              <a 
                href="https://paypal.me/Cryptoaimanager?country.x=IN&locale.x=en_GB" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-lg bg-[#3A0CA3] hover:bg-[#29076B] text-white font-medium transition duration-150 ease-in-out"
              >
                <i className="fab fa-paypal mr-2"></i>
                Donate Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
