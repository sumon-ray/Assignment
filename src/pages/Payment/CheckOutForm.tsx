/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Spinnter from "../../reuseComponents/Spinnter";
import { IoClose } from "react-icons/io5";
import { NavLink } from "react-router-dom";

import "./needs.css";
import { useCreateOrderMutation } from "../../redux/fetchers/order/orderApi";
const CheckOutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [orders, { isSuccess }] = useCreateOrderMutation();
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paymentStatus = searchParams.get("payment_status");

    if (paymentStatus === "succeeded") {
      setMessage("Payment completed successfully!");
      openModal();
    } else if (paymentStatus === "failed") {
      setMessage("Payment failed. Please try again.");
    }
  }, []);
  if (isSuccess) {
    localStorage.removeItem("temData");
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message || "An unexpected error occurred.");
    } else if (paymentIntent?.status === "succeeded") {
      setMessage("Payment completed successfully!");
      openModal();
      const orderData = localStorage.getItem("temData");
      if (orderData) {
        orders(JSON.parse(orderData));
      }
    } else {
      setMessage("Payment processing or incomplete.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const,
  };

  return (
    <div>
      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button
          className="w-full bg-[#1ABC9C] py-[8px] mt-[20px] cursor-pointer"
          disabled={isLoading || !stripe || !elements}
          id="submit"
        >
          <span id="button-text">{isLoading ? <Spinnter /> : "Pay now"}</span>
        </button>

        {message && <div id="payment-message">{message}</div>}
      </form>
      <div className="flex items-center justify-center bg-gray-100">
        {isOpen && (
          <div
            className="fixed inset-0 modalsdi bg-opacity-50 flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-lg shadow-xl w-11/12 max-w-md p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Well Come</h2>
              <p className="text-gray-600 mb-4">{message}</p>
              <div className="flex justify-end">
                <NavLink to="/">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-red-700"
                  >
                    <IoClose />
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutForm;
