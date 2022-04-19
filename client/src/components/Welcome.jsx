import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";
import { Loader } from ".";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } = useContext(TransactionContext);

  const handleSubmit = (e) => {
    const { addressTo, amount, keyword, message } = formData;

    e.preventDefault();

    if (!addressTo || !amount || !keyword || !message) return;

    sendTransaction();
  };

  return (
    <div >
      <h3 className="text-white text-3xl text-center my-2">
        elec431f's group project :Blockchain Application
      </h3>
      <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
        {!currentAccount && (
          <button
            type="button"
            onClick={connectWallet}
          >
            <p className="text-white text-base font-semibold">
              Click here to Connect Your  Wallet
            </p>
          </button>
        )}

        <div>
          <h1 className="text-white ">
            Your current account address: {shortenAddress(currentAccount)}
          </h1>
          <p className="text-white font-semibold text-lg mt-1">
            Ethereum
          </p>
        </div>
        <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
          <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
          <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
          <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
          <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

          <div className="h-[1px] w-full bg-gray-400 my-2" />

          {isLoading
            ? <Loader />
            : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
