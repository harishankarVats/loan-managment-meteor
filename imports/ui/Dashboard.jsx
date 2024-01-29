// imports/ui/components/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const Dashboard = () => {
  const [canViewAdminDashboard, setCanViewAdminDashboard] = useState(false);
  const currentUser = Meteor.user();
  const history = useHistory(); // Initialize the useHistory hook

  useEffect(() => {
    // Check if the user has the 'canViewAdminDashboard' permission
    const hasPermission = Roles.userHasRole(currentUser?._id, 'canViewAdminDashboard');
    setCanViewAdminDashboard(hasPermission);
  }, [currentUser]);

  const handleViewAdminDashboard = () => {
    // Redirect to the AdminDashboard component
    history.push('/admin-dashboard');
  };

  const handleRequestLoan = () => {
    // Redirect to the LoanRequest component
    history.push('/request-loan');
  };

  const handleConfirmLoanPayment = () => {
    // Redirect to the LoanConfirmation component
    history.push('/confirm-loan-payment');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      {currentUser ? (
        <div>
          <p>Welcome, {currentUser.profile.role}!</p>
          {canViewAdminDashboard && (
            <div>
              <p>View Admin Dashboard</p>
              {/* Add components or functionality for admin role */}
              <button type="button" onClick={handleViewAdminDashboard}>
                Go to Admin Dashboard
              </button>
            </div>
          )}
          {canRequestLoan && (
            <div>
              <p>Request a Loan</p>
              {/* Add components or functionality for borrower role */}
              <button type="button" onClick={handleRequestLoan}>
                Request Loan
              </button>
            </div>
          )}
         {canConfirmLoanPayment && (
            <div>
              <p>Confirm Loan Payments</p>
              {/* Add components or functionality for lender role */}
              <button type="button" onClick={handleConfirmLoanPayment}>
                Confirm Loan Payment
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Please log in to access the dashboard.</p>
      )}
    </div>
  );
};

export default Dashboard;
