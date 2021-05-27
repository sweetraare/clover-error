const { databaseFirebase } = require("../config");

const UsersRef = databaseFirebase.ref("/users");

exports.addUser = (uid, obj) => {
  return UsersRef.child(uid).set(obj);
};

exports.updateUser = (uid, params) => {
  return UsersRef.child(uid).update({ ...params });
};

exports.getUserById = (uid) => {
  // const miPromesa = UsersRef.child(uid).once("value").then();
  // const usersFetched = UsersRef.once(
  //   "value",
  //   (data) => {
  //     console.log("hja");
  //     return data.val();
  //   },
  //   (e) => console.log("el error es:", e)
  // );

  // return usersFetched;
  return UsersRef.child(uid).once("value");

  // UsersRef.child(uid)
  //   .once("value")
  //   .then((data) => {
  //     return data;
  //   })
  //   .catch((e) => {
  //     return e;
  //   });
};
