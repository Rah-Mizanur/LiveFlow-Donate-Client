import React from 'react';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for form submission goes here
    alert("Thank you for reaching out! We will get back to you soon.");
  };

  return (
    <section className="py-16 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800">Contact Us</h2>
          <p className="text-gray-500 mt-3 text-lg">
            Have questions or need help? Our team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-6">
                Whether you are a donor, a recipient, or a hospital partner, feel free to reach out to us. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-50 p-3 rounded-lg text-red-600 text-xl">📍</div>
                <div>
                  <h4 className="font-bold text-slate-800">Our Location</h4>
                  <p className="text-gray-600">Shariakandi, Bogura, Bangladesh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-lg text-[#2B4C7E] text-xl">📞</div>
                <div>
                  <h4 className="font-bold text-slate-800">Phone Number</h4>
                  <p className="text-gray-600">+880 1904754838</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-50 p-3 rounded-lg text-green-600 text-xl">✉️</div>
                <div>
                  <h4 className="font-bold text-slate-800">Email Address</h4>
                  <p className="text-gray-600">support@liveflow.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
      
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B4C7E] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                <input 
                  type="email" 
              
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B4C7E] outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B4C7E] outline-none transition">
                  <option>General Inquiry</option>
                  <option>Blood Request Help</option>
                  <option>Donor Partnership</option>
                  <option>Technical Issue</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea 
                  rows="4" 
                  placeholder="How can we help you?" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2B4C7E] outline-none transition"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full bg-[#2B4C7E] hover:bg-[#1f385c] text-white font-bold py-3 rounded-lg transition duration-300 shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;