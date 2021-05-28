async function planBuy(product, user) {
  const { formatDate, addDaysToDate } = require("../utils/dates");
  const { generateUniqueKey } = require("../utils/functions");
  const { updateUser, getUserById } = require("../firebase/operations/users");
  const { getPlanBySlug } = require("../firebase/operations/plans");
  // Here we cannot get any response from getPlanBySlug function or get
  try {
    const userFetched = await getUserById(user);
    const userObject = userFetched.val();

    const planFetched = await getPlanBySlug(product);
    const planObject = planFetched.val();

    console.log(userObject, planObject);
    //TODO add plan to user
  } catch (e) {
    console.log(e);
    return e;
  }
}

exports.charge = (req, res) => {
  const axios = require("axios");
  const { v4 } = require("uuid");

  const { amount, cloverToken, product, productType, user } = req.body;

  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${process.env.CLOVER_AUTHENTICATION}`,
    "idempotency-key": v4(),
    "content-type": "application/json",
  };

  try {
    switch (productType) {
      case "extra":
        //TODO: extrBuy()
        break;
      case "plan":
        planBuy(product, user);
        res.send(" to bien bro");
        break;

      default:
        break;
    }
  } catch (e) {
    console.log(e);
    res.send(`ERROR: ${e.message}`);
  }
};
