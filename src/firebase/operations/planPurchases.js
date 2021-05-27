import { databaseFirebase as db } from "../config";

const PlanPurchasesRef = db.ref("/planPurchases");

exports.addPlanPurchase = (key, object) => {
  return PlanPurchasesRef.child(key).set(object);
};
