export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-10 md:mb-0">
            <h3 className="text-white text-xl font-bold mb-4">Crypto AI Manager</h3>
            <p className="max-w-xs">
              Transforming complex cryptocurrency tax reporting into simple, understandable documents.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-medium mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#get-started" className="hover:text-white transition-colors">CSV Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tax Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Country Regulations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Report a Bug</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Crypto AI Manager. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-twitter text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-github text-lg"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className="fab fa-linkedin text-lg"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-500 text-center">
          <p>⚠️ DISCLAIMER: This tool does NOT provide official tax advice. Always consult a licensed tax professional before filing. We are not liable for errors or changes in tax laws.</p>
        </div>
      </div>
    </footer>
  );
}
