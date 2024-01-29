// imports/ui/components/LoanConfirmation.jsx

import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';

const LoanConfirmation = () => {
  const [loanId, setLoanId] = useState('');

  const handleConfirmLoanPayment = () => {
    // Basic validation
    if (!loanId || !/^[a-zA-Z0-9]{17}$/.test(loanId)) {
      console.error('Invalid loan ID');
      return;
    }

    // Perform additional validation if needed

    // Call the server method to confirm a loan payment
    Meteor.call('loans.confirmLoanPayment', loanId, (error, result) => {
      if (error) {
        console.error(error.reason);
      } else {
        // Loan payment confirmation successful, handle success as needed
        console.log(result);
      }
    });
  };

  return (
    <div>
      <h2>Loan Confirmation</h2>
      <form>
        <label>
          Loan ID:
          <input
            type="text"
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
          />
        </label>
        <br />
        <button type="button" onClick={handleConfirmLoanPayment}>
          Confirm Loan Payment
        </button>
      </form>
    </div>
  );
};

export default LoanConfirmation;
