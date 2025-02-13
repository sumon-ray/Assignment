import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
  "pk_test_51PKjZzCZsyVMtq3pYaTLPjSaixJCHVuZh9d0gPSPzmvuBQWngZvZo3c3RRGddrn0q4MH6PRHcaSN9Mv7HkJ96B3B00xpFsBcua"
);
type TThemePay = {
  theme: "stripe" | "night" | "flat" | undefined;
};
let data: object | string | null = null;
const PaymentIntegrate: React.FC = () => {
  const [clientSecret, setClientSecrate] = useState<string | null>(null);
  const getStore = localStorage.getItem("temData");
  if (getStore !== null) {
    data = JSON.parse(getStore);
  }
  const { amount } = data as { amount: number };
  useEffect(() => {
    fetch("https://cycle-store-server-gray.vercel.app/api/create-payment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ price: Math.ceil(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecrate(data?.clientSecret);
      })
      .catch((error) => console.error("Error:", error)); // Add error handling
  }, [amount]);
  const appearance: TThemePay = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  return (
    <div className="container mx-auto px-[10px] my-[50px]">
      <div className="lg:w-[60%] mx-auto">
        <h2 className="text-center text-3xl mb-[20px]">Intregate Payment</h2>
        {clientSecret && (
          <Elements
            options={{ clientSecret, appearance, loader }}
            stripe={stripePromise}
          >
            <CheckOutForm />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default PaymentIntegrate;
