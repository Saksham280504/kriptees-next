'use client';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ContactPage() {
  const router = useRouter();

  const handleCall = () => {
    window.location.href = "tel:+917079604172";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Your message has been sent successfully");
    router.push("/");
  };

  return (
    <section className="bg-white dark:bg-gray-900 mt-16">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>

        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          You may contact us using the information below:
          <ul className="mt-4 text-left list-disc list-inside">
            <li>Merchant Legal entity name: KRISHNA SINGH</li>
            <li>Registered Address: D 12 sector 27 Noida, Near Anjali Market, Noida, Uttar Pradesh, PIN: 201301</li>
            <li>Operational Address: D 12 sector 27 Noida, Near Anjali Market, Noida, Uttar Pradesh, PIN: 201301</li>
            <li>Telephone No: <button onClick={handleCall} className="text-blue-600 underline">7079604172</button></li>
            <li>E-Mail ID: <a href="mailto:kripteesofficial@gmail.com" className="text-blue-600 underline">kripteesofficial@gmail.com</a></li>
          </ul>
        </p>
      </div>
    </section>
  );
}
