import React, { useState, useEffect } from 'react';

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/faq.json')
      .then((res) => res.json())
      .then((data) => {
        setFaqs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching FAQ:", err);
        setLoading(false);
      });
  }, []);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  if (loading) return (
    <div className="text-center py-20 font-semibold" style={{ color: '#e25843' }}>
      Loading FAQs...
    </div>
  );

  return (
   <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-slate-800 mb-12">
          Common <span className="text-brand-red">Questions</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} 
                 className={`bg-white rounded-2xl border transition-all duration-300 ${openId === faq.id ? 'border-brand-blue shadow-lg' : 'border-gray-100'}`}>
              <button onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                      className="w-full flex justify-between items-center p-6 text-left">
                <span className={`font-bold md:text-lg ${openId === faq.id ? 'text-slate-900' : 'text-slate-700'}`}>{faq.question}</span>
                <div className={`p-1 rounded-full text-white transition-all ${openId === faq.id ? 'bg-brand-red rotate-180' : 'bg-brand-blue'}`}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </button>
              <div className={`transition-all duration-500 overflow-hidden ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-600 border-t border-gray-50">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;