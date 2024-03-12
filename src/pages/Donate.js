import React from "react";
import optimizedImage from "../assets/qrCode.png";

const DonationPage = () => {
  return (
    <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-gray-800 min-h-screen">
      <section className="py-20 px-4 mx-auto max-w-7xl grid items-center grid-cols-1 md:grid-cols-2 gap-8 h-full">
        <div className="text-center md:text-left overflow-auto max-h-full">
          <h2 className="text-4xl font-bold leading-tight mb-4">
            Hello! 👋 I'm Jenny Carter
          </h2>
          <p className="max-w-lg text-lg leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad
            modi doloremque sed nulla suscipit quas aspernatur libero dolore?
            Neque expedita illo atque. Mollitia quae corrupti consectetur dolor
            provident repellat!
          </p>
        </div>
        <div className="bg-white p-8 rounded-md shadow-lg text-gray-800 md:sticky md:top-0 md:w-auto max-h-full">
          <p className="text-2xl font-bold mb-2 text-purple-500">
            Scan to Donate
          </p>
          <p className="text-lg mb-4">Your generous support keeps us going!</p>
          <div className="flex justify-center items-center mb-6">
            <img
              className="md:w-[60%] max-w-md mx-auto shadow-2xl rounded-md"
              src={optimizedImage}
              alt="QR Code"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <button className="btn-primary">Thank you!</button>
            <button className="btn-secondary">Support Us</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
