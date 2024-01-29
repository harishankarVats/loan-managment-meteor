import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

const AdminDashboard = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch all transactions when the component mounts
    Meteor.call('admin.viewTransactions', (error, result) => {
      if (error) {
        console.error(error.reason);
      } else {
        // Set the transactions state
        setTransactions(result);
      }
    });
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>View all transactions:</p>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {/* Display transaction information based on your data model */}
            User ID: {transaction.userId}, Amount: {transaction.amount}, Status: {transaction.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
