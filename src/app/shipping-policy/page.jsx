// app/shippingpolicy/page.jsx
import React from "react";
import MetaData from "@/components/Layouts/MetaData/MetaData"; // Adjust path if needed

const ShippingPolicyPage = () => {
  return (
    <div className="privacy-policy-container">
      <MetaData title="Shipping and Delivery" />

      <div className="mt-20 mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 text-center">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Shipping & Delivery Policy
            </h3>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              {[
                "For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only.",
                "Orders are shipped within 6-7 Days days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms.",
                "KRISHNA SINGH is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 6-7 Days days from the date of the order and payment or as per the delivery date agreed at the time of order confirmation.",
                "Delivery of all orders will be to the address provided by the buyer.",
                "Delivery of our services will be confirmed on your mail ID as specified during registration.",
                "For any issues in utilizing our services you may contact our helpdesk on 7079604172 or kripteesofficial@gmail.com.",
              ].map((paragraph, index) => (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6`}
                >
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 text-center">
                    <p>{paragraph}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;
