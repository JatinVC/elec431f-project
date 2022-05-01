import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({ addressTo, addressFrom, timestamp, message, amount, allmessagecount }) => {


  return (
    <div className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://ropsten.etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">From: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://ropsten.etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">To: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">Amount:{amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message: {message}</p>
            </>
          )}
        </div>

        <div>
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const Transactions = () => {
  const {
    transactionCount,
    currentAccount,
    transactions,
    isChronological,
    isPrice,
    reverseTimeStatus,
    reversePriceStatus,
  } = useContext(TransactionContext);

  // refresh the page F5, will put transactions to normal
  // run this sort one time if transactions are out of order
  // let sortOrder = ["timestamp"];
  // transactions.sort((a, b) => {
  //     for (let key of sortOrder) {
  //         let result = a[key] - b[key]
  //         if (result) return result
  //     }
  //     return 0;
  // })

  const originalTransactions = transactions;
  let tempTransactions = transactions;
  let flag = false;

  const handleReverseChronologicalTime = () => {
    reverseTimeStatus();
    console.log(isChronological);
    transactions.reverse(isChronological);
  };

  /*may delete as it cannot restore transaction order to normal*/
  // const handleChronologicalTime = () => {
  //     reverseTimeStatus();
  //     console.log(isChronological);
  //     tempTransactions = originalTransactions;
  // };

  const handleHighPrice = () => {
    let sortOrder1 = ["amount"];
    flag = true;
    transactions.sort((a, b) => {
      for (let key of sortOrder1) {
        let result = a[key] - b[key]
        if (result) return result
      }
      return 0;
    })
    reversePriceStatus();
    console.log(isPrice);
    transactions.reverse(isPrice);
  };

  const handleLowPrice = () => {
    let sortOrder1 = ["amount"];
    flag = true;
    transactions.sort((a, b) => {
      for (let key of sortOrder1) {
        let result = b[key] - a[key]
        if (result) return result
      }
      return 0;
    })
    reversePriceStatus();
    console.log(isPrice);
    transactions.reverse(isPrice);
  };

  return (
    <div style={{ backgroundColor: 'black' }}>
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Your Transactions
        </h3>

        {currentAccount ? (
          <div className="flex flex-wrap justify-center items-center mt-10">
            {[...transactions].reverse().map((transaction, i) => {
              if (transaction.addressFrom.toLowerCase() == currentAccount) {
                return (
                  <TransactionsCard key={i} {...transaction} />
                )
              }
            })}
          </div>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}

      </div>
      <div className="flex flex-col md:p-12 py-12 px-4">
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions

        </h3>
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            All Transactions count:{transactions.length} <br />

          </h3>

        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
        <div className="flex-col  md:p-12 py-12 px-4 text-center">

          <button
            type="button"
            onClick={handleReverseChronologicalTime}
            className="text-white w-33 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c]  cursor-pointer"
          > latest / oldest transactions
          </button>

          {/*may delete as it cannot restore transaction order to normal*/}
          {/*<button*/}
          {/*    type="button"*/}
          {/*    onClick={handleChronologicalTime}*/}
          {/*    className="text-white w-3 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"*/}
          {/*> oldest transaction first*/}
          {/*</button>*/}

          <button
            type="button"
            onClick={handleHighPrice}
            className="text-white w-33 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c]  cursor-pointer"
          > highest transaction amount
          </button>

          <button
            type="button"
            onClick={handleLowPrice}
            className="text-white w-33 mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c]  cursor-pointer"
          > lowest transaction amount
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center mt-10">

          {/*it will only change tempTransactions, hence anything out of order, just F5 the page will restore the original order.*/}
          {[...tempTransactions].map((transaction, i) => (
            <TransactionsCard key={i} {...transaction} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default Transactions;
