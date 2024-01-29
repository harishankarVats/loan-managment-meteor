// imports/ui/components/LoanRequest.jsx

import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const LoanRequest = () => {
  const [loanAmount, setLoanAmount] = useState('');

  const handleRequestLoan = () => {
    // Basic validation
    if (!loanAmount || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      console.error('Invalid loan amount');
      return;
    }

    // Perform additional validation if needed

    // Call the server method to request a loan
    Meteor.call('loans.requestLoan', parseFloat(loanAmount), (error, result) => {
      if (error) {
        console.error(error.reason);
      } else {
        // Loan request successful, handle success as needed
        console.log(result);
      }
    });
  };

  return (
    <div>
      <h2>Loan Request</h2>
      <form>
        <label>
          Loan Amount:
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleRequestLoan}>
          Request Loan
        </button>
      </form>
    </div>
  );
};

export default LoanRequest;
