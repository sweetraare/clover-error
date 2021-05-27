const { databaseFirebase } = require("../config");

const PlansRef = databaseFirebase.ref("/plans");

exports.getPlanBySlug = (slug) => {
  return PlansRef.child(slug).once("value");
};
