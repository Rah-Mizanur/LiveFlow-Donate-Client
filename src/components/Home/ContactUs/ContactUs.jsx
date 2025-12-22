import React from 'react';
import toast from 'react-hot-toast';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Thank you for reaching out! We will get back to you soon.", {
      style: {
        border: '1px solid #e25843',
        padding: '16px',
        color: '#2B4C7E',
      },
      iconTheme: {
        primary: '#e25843',
        secondary: '#FFFAEE',
      },
    });
  };

  return (
   <section className="py-20 bg-white" id="contact">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-800">
            Get In <span className="text-brand-red">Touch</span>
          </h2>
          <div className="h-1 w-20 mx-auto mt-4 rounded-full bg-brand-blue"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div className="space-y-8">
              {[
                { icon: "📍", title: "Our Location", desc: "Shariakandi, Bogura, Bangladesh" },
                { icon: "📞", title: "Phone Number", desc: "+880 1904754838" },
                { icon: "✉️", title: "Email Address", desc: "support@liveflow.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="p-4 rounded-2xl bg-brand-blue-light text-brand-red transition-transform group-hover:scale-110">
                    <span className="text-2xl">{item.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 bg-brand-blue-light/50">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red outline-none bg-white" required />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red outline-none bg-white" required />
              <textarea rows="4" placeholder="Message" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red outline-none bg-white" required></textarea>
              <button type="submit" className="w-full bg-brand-red text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
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