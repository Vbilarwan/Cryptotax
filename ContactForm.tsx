import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!name || !email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Directly open email client with pre-filled content
      const subject = encodeURIComponent(`Crypto AI Manager Inquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent from Crypto AI Manager website`
      );
      
      // Generate a mailto link
      const mailtoLink = `mailto:vvkbilarwan@gmail.com?subject=${subject}&body=${body}`;
      
      // Open the email client
      window.open(mailtoLink, '_blank');
      
      // Success feedback
      toast({
        title: "Email Client Opened",
        description: "Your email client has opened with your message. Just click send!",
        variant: "default"
      });
    } catch (error) {
      console.error('Error opening email client:', error);
      
      // Fallback if opening email client fails
      toast({
        title: "Alternative Method",
        description: "Please email your inquiry directly to vvkbilarwan@gmail.com",
        variant: "default"
      });
    } finally {
      // Clear the form
      setName("");
      setEmail("");
      setMessage("");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-xl text-gray-600 mb-6">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex items-start mb-4">
                <div className="flex-shrink-0 text-[#3A0CA3]">
                  <i className="fas fa-question-circle text-xl"></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Need Help?</h4>
                  <p className="text-gray-600 mt-1">
                    We typically respond to inquiries within 24-48 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 text-[#3A0CA3]">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Your Privacy</h4>
                  <p className="text-gray-600 mt-1">
                    We never store your crypto transaction data. All processing is done locally in your browser.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3] outline-none" 
                  required 
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3] outline-none" 
                  required 
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3] outline-none" 
                  required
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full bg-[#3A0CA3] hover:bg-[#29076B] text-white font-medium py-2 px-6 rounded-md transition duration-150 ease-in-out ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
