import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const AboutUs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8">
      <div className="container max-w-7xl mx-auto px-4">
        {/* About Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 sm:text-5xl">
            About Bicycle Store
          </h1>
          <p className="mt-4 w-[70%] lg:w-[60%] mx-auto  text-lg text-gray-600">
            Welcome to Bicycle Store, your go-to destination for all things
            cycling. We offer a wide range of bicycles and accessories, catering
            to cyclists of all skill levels.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center items-center">
            <img
              src="https://keyassets.timeincuk.net/inspirewp/live/wp-content/uploads/sites/11/2023/08/Canyon-Torque-Mullet-AL-6-Aug292.jpg"
              alt="Bicycle Store"
              className="rounded-lg border-2 border-[#1ABC9C] object-cover w-full h-80 sm:h-96"
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600">
              At Bicycle Store, our mission is to provide the best cycling
              experience for our customers. Whether you’re an experienced
              cyclist or just getting started, we offer products that suit your
              needs. From premium bikes to affordable options, our goal is to
              make cycling enjoyable for everyone.
            </p>

            <h2 className="text-3xl font-semibold text-gray-800">
              Why Choose Us?
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-lg text-gray-600">
              <li>Wide Selection of Bikes</li>
              <li>High-Quality Accessories</li>
              <li>Expert Cycling Advice</li>
              <li>Fast and Secure Shipping</li>
              <li>Friendly Customer Service</li>
            </ul>
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Our Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Explore our selection of bicycles and accessories, carefully chosen
            to offer top-notch performance and value.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-white rounded-lg border-2 border-[#1ABC9C] text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYplbe5xnyOvBj8lc4McfdOwhzxW4QscrEQ&s"
                alt="Mountain Bike"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Mountain Bike
              </h3>
              <p className="mt-2 text-gray-600">
                Perfect for rugged terrain and outdoor adventures.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-[#1ABC9C] text-center">
              <img
                src="https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Library-Sites-canyon-shared/default/dw91483f8c/images/plp/ridestyle-race-canyon-aeroad-MY25-07.jpg?sw=848"
                alt="Road Bike"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Road Bike
              </h3>
              <p className="mt-2 text-gray-600">
                Speed and efficiency for long-distance riding on smooth roads.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border-2 border-[#1ABC9C] text-center">
              <img
                src="https://electrek.co/wp-content/uploads/sites/3/2024/01/segway-xyber-header.jpg?quality=82&strip=all"
                alt="Electric Bike"
                className="rounded-lg w-full h-48 object-cover"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Electric Bike
              </h3>
              <p className="mt-2 text-gray-600">
                Effortless cycling with electric assist for longer and smoother
                rides.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="mt-16 w-[100%] lg:w-[70%] mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Frequently Asked Questions
          </h2>
          <div className="mt-6">
            <div className="space-y-4">
              {[
                {
                  question: "What types of bicycles do you offer?",
                  answer:
                    "We offer a wide range of bikes, including road bikes, mountain bikes, and electric bikes.",
                },
                {
                  question: "Do you offer shipping?",
                  answer:
                    "Yes, we provide fast and secure shipping to most regions.",
                },
                {
                  question: "Can I return my bicycle if I’m not satisfied?",
                  answer: "Yes, we offer a 30-day return policy on most items.",
                },
                {
                  question: "Do you offer bike accessories?",
                  answer:
                    "Yes, we carry a variety of accessories like helmets, pedals, and locks.",
                },
              ].map((faq, index) => (
                <div key={index} className="border-t border-[#1ABC9C]">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full text-left py-4 px-6 bg-gray-200 text-gray-800 font-semibold flex justify-between items-center focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <span>
                      {activeIndex === index ? (
                        <FaChevronUp className="text-[#1ABC9C]" />
                      ) : (
                        <FaChevronDown className="text-[#1ABC9C]" />
                      )}
                    </span>
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 py-4 bg-gray-100 text-gray-600">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Us Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 text-center">
            Get in Touch
          </h2>
          <p className="mt-4 text-lg text-gray-600 text-center">
            Have any questions or need advice? We are here to help! Contact us
            via email or give us a call.
          </p>

          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Email</h3>
              <p className="mt-2 text-lg text-gray-600">
                ruhitbaidya01@gmail.com
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
              <p className="mt-2 text-lg text-gray-600">+88 01742772507</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
