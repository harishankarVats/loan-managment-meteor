import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Loans } from './loans';
import { Roles } from 'meteor/alanning:roles';

Meteor.methods({
  'loans.requestLoan'(amount) {
    check(amount, Number);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to request a loan');
    }

    // Validate the amount
    if (amount <= 0) {
        throw new Meteor.Error('invalid-amount', 'Loan amount must be greater than zero');
      }
  
      // Additional validation as per your requirements
  
      // Insert the loan request into the Loans collection
      const loanId = Loans.insert({
        userId: this.userId,
        amount,
        status: 'pending',
      });
  
    return `Loan request (${loanId}) submitted successfully`;
  },

  'loans.confirmLoanPayment'(loanId) {
    check(loanId, String);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to confirm a loan payment');
    }

    // Validate the loanId format (you may have other validation criteria)
    if (!/^[a-zA-Z0-9]{17}$/.test(loanId)) {
      throw new Meteor.Error('invalid-loan-id', 'Invalid loan ID format');
    }

    // Check if the user has the 'lender' role
    if (!Roles.userIsInRole(this.userId, ['lender'])) {
      throw new Meteor.Error('not-authorized', 'You must be a lender to confirm loan payments');
    }

    // Find the loan and validate that the lender is not confirming their own loan
    const loan = Loans.findOne({ _id: loanId, userId: { $ne: this.userId } });

    if (!loan) {
      throw new Meteor.Error('loan-not-found', 'Loan not found or not authorized to confirm this loan');
    }

    // Additional validation as per your requirements

    // Update the loan status to 'confirmed'
    Loans.update({ _id: loanId }, { $set: { status: 'confirmed' } });

    return 'Loan payment confirmed successfully';
  },

  'admin.viewTransactions'() {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to view transactions');
    }

    // Check if the user has the 'admin' role
    if (!Roles.userIsInRole(this.userId, ['admin'])) {
      throw new Meteor.Error('not-authorized', 'You must be an admin to view transactions');
    }

    // Additional validation as per your requirements

    // Fetch and return all transactions for admin view
    const transactions = Loans.find().fetch();

    return transactions;
  }


});
