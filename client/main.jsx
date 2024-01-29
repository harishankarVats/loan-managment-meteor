import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
//import { App } from '/imports/ui/App';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from './routes'; ../../ui/Register
import { Register }from '../imports/ui/Register';
import { Login } from '../imports/ui/Login';
import { Dashboard } from '../imports/ui/Dashboard';
import { LoanRequest } from '../imports/ui/LoanRequest';
import { LoanConfirmation } from '../imports/ui/LoanConfirmation';
import { AdminDashboard } from '../imports/ui/AdminDashboard';

const AppRoutes = () => (
  <Router>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/request-loan" component={LoanRequest} />
      <Route path="/confirm-loan" component={LoanConfirmation} />
      <Route path="/admin-dashboard" component={AdminDashboard} />
    </Switch>
  </Router>
);

export default AppRoutes;


Meteor.startup(() => {
  const container = document.getElementById('react-target');
  const root = createRoot(container);
  //root.render(<App />);
  root.render(<Register />);
}); 
