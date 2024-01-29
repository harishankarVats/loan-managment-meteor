import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Loans = new Mongo.Collection('loans');

Loans.schema = new SimpleSchema({
  userId: { type: String },
  amount: { type: Number, min: 1 },
  status: { type: String, allowedValues: ['pending', 'approved', 'rejected'], defaultValue: 'pending' },
});

Loans.attachSchema(Loans.schema);
