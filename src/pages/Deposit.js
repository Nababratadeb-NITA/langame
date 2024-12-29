import React, { useState } from "react";

const DepositPage = () => {
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0); // Track the current balance

  const channels = [
    { name: "7Days - Paytm x QR", balance: "200 - 100K" },
    { name: "GaayPay - Paytm x QR", balance: "500 - 50K" },
    { name: "LuckyPay - Paytm x QR", balance: "200 - 50K" },
    { name: "BonusPay - Paytm x QR", balance: "500 - 5K" },
    { name: "Funpay - Paytm x QR", balance: "100 - 100K" },
    { name: "SuperPay - Paytm x QR", balance: "300 - 50K" },
  ];

  const predefinedAmounts = [200, 500, 1000, 10000, 50000, 100000];

  const handleChannelClick = (channel) => {
    setSelectedChannel(channel);
  };

  const handleDeposit = () => {
    if (!amount || !selectedChannel) {
      alert("Please select a channel and enter an amount.");
      return;
    }

    // Update the balance by adding the deposit amount
    setBalance((prevBalance) => prevBalance + Number(amount));

    // Alert the user for deposit success
    alert(`Depositing ₹${amount} via ${selectedChannel.name}`);
    // Reset the amount after deposit
    setAmount("");
  };

  return (
    <div className="bg-[#2B3270] text-white p-6 rounded-xl max-w-4xl mx-auto">
      {/* Balance Section */}
      <div className="bg-blue-500 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-bold">Balance</h2>
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">₹{balance.toLocaleString()}</div>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition">
            Refresh
          </button>
        </div>
      </div>

      {/* Payment Channels */}
      <h3 className="text-lg font-bold mb-4">Select Channel</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg cursor-pointer ${
              selectedChannel?.name === channel.name
                ? "bg-blue-600"
                : "bg-blue-500"
            } hover:bg-blue-700 transition`}
            onClick={() => handleChannelClick(channel)}
          >
            <h4 className="text-md font-bold">{channel.name}</h4>
            <p className="text-sm">Balance: {channel.balance}</p>
          </div>
        ))}
      </div>

      {/* Deposit Amount Section */}
      <h3 className="text-lg font-bold mb-4">Deposit Amount</h3>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {predefinedAmounts.map((amt, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => setAmount(amt)}
          >
            ₹{amt.toLocaleString()}
          </button>
        ))}
      </div>
      <div className="mb-6">
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Please enter the amount"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        />
        <button
          onClick={handleDeposit}
          className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Deposit
        </button>
      </div>

      {/* Recharge Instructions */}
      <div className="bg-blue-500 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-4">Recharge Instructions</h3>
        <ul className="list-disc ml-5 text-sm">
          <li>
            If the transfer time is up, please fill out the deposit form again.
          </li>
          <li>
            The transfer amount must match the order you created; otherwise, the
            money cannot be credited successfully.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DepositPage;
