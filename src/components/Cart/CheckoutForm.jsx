"use client";

import { useEffect, useState } from "react";

export default function CheckoutForm() {
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Placeholder for payment integration
    setTimeout(() => {
      setMessage("Payment successful!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form className="form1" id="payment-form" onSubmit={handleSubmit}>
      <button className="button1" disabled={isLoading} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
