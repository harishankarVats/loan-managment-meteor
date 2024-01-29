import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

// Define roles
const roles = ['admin', 'borrower', 'lender'];

// Initialize roles on server startup
roles.forEach((role) => {
  if (!Roles.getRoleUsers(role).count()) {
    // Create a user with the specified role if no users have it
    const userId = Accounts.createUser({
      email: `${role}@example.com`, // Example email, customize as needed
      password: 'password', // Example password, customize as needed
      profile: {
        role,
      },
    });

    // Assign the role to the created user
    Roles.addUsersToRoles(userId, role);
  }
});

// Define permissions (optional)
Roles.createRole('canViewAdminDashboard', { unlessExists: true });
Roles.createRole('canRequestLoan', { unlessExists: true });
Roles.createRole('canConfirmLoanPayment', { unlessExists: true });

// Assign permissions to roles
Roles.addRolesToParent('canViewAdminDashboard', ['admin']);
Roles.addRolesToParent('canRequestLoan', ['borrower']);
Roles.addRolesToParent('canConfirmLoanPayment', ['lender']);
