'use client';

const FAQ = () => {
  return (
    <section className="bg-white dark:bg-gray-900 mt-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-10">
          FAQ’s
        </h1>

        <div className="space-y-6">
          {[
            {
              question: "What is Kriptees?",
              answer:
                "Kriptees is an online retailer offering high-quality, affordable anime-inspired streetwear, including T-shirts, hoodies, and sweatshirts for anime enthusiasts.",
            },
            {
              question: "What products does Kriptees offer?",
              answer:
                "Kriptees specializes in anime-themed apparel such as T-shirts, hoodies, and sweatshirts, featuring designs inspired by popular anime series.",
            },
            {
              question: "Does Kriptees offer customization options?",
              answer:
                "Yes, Kriptees provides custom apparel services, allowing customers to create personalized designs on various clothing items.",
            },
            {
              question: "What are the shipping options available?",
              answer:
                "Kriptees offers pan-India shipping, ensuring delivery across the country.",
            },
            {
              question: "What is Kriptees’ return and exchange policy?",
              answer:
                "Kriptees offers a 7-day easy return and exchange policy with no questions asked.",
            },
            {
              question: "How can I contact Kriptees for further assistance?",
              answer:
                "You can reach out to Kriptees through their Contact Us page on the website.",
            },
            {
              question: "Are Kriptees products made in India?",
              answer:
                "Yes, Kriptees is a 100% homegrown brand, and all products are made in India.",
            },
            {
              question: "How can I stay updated on new arrivals and promotions?",
              answer:
                "To stay informed about the latest products and offers, follow Kriptees on their official Instagram account: @kriptees_official.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                Q{index + 1}: {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">A: {faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
