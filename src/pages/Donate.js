import React, { useState, useEffect } from 'react';
import qrImage from '../qrCode.png';

const DonatePage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPaymentOption, setSelectedPaymentOption] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedWallet, setSelectedWallet] = useState('');
  const [selectedUPIOption, setSelectedUPIOption] = useState('');
  const [upiId, setUpiId] = useState('');
  const [privacyPolicyAgreed, setPrivacyPolicyAgreed] = useState(false);

  useEffect(() => {
    setSelectedPaymentOption('credit-card');
  }, []);

  const handlePayment = () => {
    // Implement your payment processing logic here
    // You can use the entered cardNumber, expiryMonth, expiryYear, cvv, selectedPaymentOption, selectedBank,
    // selectedWallet, and selectedUPIOption for payment processing
    // Display success or error messages based on the payment result
  };

  const paymentOptions = [
    { id: 'upi', label: 'UPI' },
    { id: 'credit-card', label: 'Credit Card' },
    { id: 'debit-card', label: 'Debit Card' },
    { id: 'net-banking', label: 'Net Banking' },
    { id: 'wallet', label: 'Wallet' },
  ];

  const banks = ['All Other Banks', 'Bank A', 'Bank B', 'Bank C', 'Bank D']; // Add more banks as needed
  const wallets = ['Wallet A', 'Wallet B', 'Wallet C']; // Add more wallets as needed

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 mt-8 mb-8">
      <div className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-lg shadow-md p-8 flex flex-col space-y-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Payment Information</h2>
        <div className="flex justify-center space-x-4 mb-4">
          {paymentOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedPaymentOption(option.id)}
              className={`py-2 px-4 rounded-full focus:outline-none text-sm ${
                selectedPaymentOption === option.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div>
          {selectedPaymentOption === 'upi' && (
            <form className="mb-4">
              <label className="block font-medium text-center">Scan and Pay</label>
              <img src={qrImage} alt="Logo" className="w-full h-70 mx-auto mb-4 max-w-xs" />
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Pay with UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID"
                  className="form-input mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
          )}
          {selectedPaymentOption === 'net-banking' && (
            <form className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Select Bank</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="form-select mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  {banks.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-600">
                Note: We will redirect you to the bank you have chosen above. Once the bank verifies your net banking
                credentials, we will proceed with your payment.
              </p>
            </form>
          )}
          {selectedPaymentOption === 'wallet' && (
            <form className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Select Wallet</label>
                <select
                  value={selectedWallet}
                  onChange={(e) => setSelectedWallet(e.target.value)}
                  className="form-select mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                >
                  {wallets.map((wallet) => (
                    <option key={wallet} value={wallet}>
                      {wallet}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          )}
          {['credit-card', 'debit-card'].includes(selectedPaymentOption) && (
            <form className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Please enter card number"
                  className="form-input mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex mb-4">
                <div className="w-1/2 mr-2">
                  <label className="block text-sm font-medium text-gray-600">Expiry Date</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={expiryMonth}
                      onChange={(e) => setExpiryMonth(e.target.value)}
                      placeholder="MM"
                      className="form-input mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="w-1/2 ml-2">
                  <label className="block text-sm font-medium text-gray-600 invisible">Year</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={expiryYear}
                      onChange={(e) => setExpiryYear(e.target.value)}
                      placeholder="YY"
                      className="form-input mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="CVV"
                  className="form-input mt-1 p-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </form>
          )}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="privacy-policy"
            className="mr-2"
            checked={privacyPolicyAgreed}
            onChange={() => setPrivacyPolicyAgreed(!privacyPolicyAgreed)}
          />
          <label htmlFor="privacy-policy" className="text-sm text-gray-600">
            I agree with the
            <a href="#privacy-policy" className="text-blue-600 ml-1">Privacy Policy </a>
            by proceeding with this payment.
          </label>
        </div>
        <button
          type="button"
          onClick={handlePayment}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none w-full mt-4"
        >
          Make Payment
        </button>
        <p className="text-center text-blue-500 mt-4">
          <span className="hover:text-blue-700 hover:cursor-pointer hover:underline">cancel</span>
        </p>
      </div>
    </div>
  );
};

export default DonatePage;




// import React from "react";
// import optimizedImage from "../assets/qrCode.png";
// import Payment from '../components/Payment';

// const DonationPage = () => {
//   return (
//     <div className="bg-gradient-to-r from-gray-400 to-gray-200 text-gray-800 min-h-screen">
//       <section className="py-20 px-4 mx-auto max-w-7xl grid items-center grid-cols-1 md:grid-cols-2 gap-8 h-full">
//         <div className="text-center md:text-left overflow-auto max-h-full">
//           <h2 className="text-4xl font-bold leading-tight mb-4">
//             Hello! 👋 I'm Jenny Carter
//           </h2>
//           <p className="max-w-lg text-lg leading-relaxed">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita ad
//             modi doloremque sed nulla suscipit quas aspernatur libero dolore?
//             Neque expedita illo atque. Mollitia quae corrupti consectetur dolor
//             provident repellat!
//           </p>
//         </div>
//         <div className="bg-white p-8 rounded-md shadow-lg text-gray-800 md:sticky md:top-0 md:w-auto max-h-full">
//           <p className="text-2xl font-bold mb-2 text-purple-500">
//             Scan to Donate
//           </p>
//           <p className="text-lg mb-4">Your generous support keeps us going!</p>
//           <div className="flex justify-center items-center mb-6">
//             <img
//               className="md:w-[60%] max-w-md mx-auto shadow-2xl rounded-md"
//               src={optimizedImage}
//               alt="QR Code"
//             />
//           </div>
//           <div className='flex justify-center items-center'>
//             <Payment/>
//           </div>
//           <div className='flex justify-center items-center'>
//             <Payment/>
//           </div>
//           <div className="flex justify-center space-x-4">
//             <button className="btn-primary">Thank you!</button>
//             <button className="btn-secondary">Support Us</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default DonationPage;
