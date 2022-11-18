const APP_ID = 'community-test-irazb';
const ATLAS_SERVICE = 'mongodb-atlas';
const app = new Realm.App({id: 'test-eyyda'});

// const login = async () => {
//   const credentials = Realm.Credentials.anonymous();
//   try {
//     const user = await app.logIn(credentials);
//     $('#user').empty().append("User ID: " + user.id);
//   } catch (err) {
//     console.error("Failed to log in", err);
//   }
// };

const login = async () => {
  let email = prompt("Please enter your email");
  let password = prompt("Please enter your password");
  const credentials = Realm.Credentials.emailPassword(email, password);
  // const credentials = Realm.Credentials.anonymous();
  try {
    const user = await app.logIn(credentials);
    $('#user').empty().append("User ID: " + user.id);
    console.log(user);
  } catch (err) {
    console.error("Failed to log in", err);
  }
};

const logout = async () => {
  
  const userId = app.currentUser.id;
  await app.allUsers[userId].logOut();
  console.log(app.currentUser);
  let email_div = $("#user-emails");
  email_div.empty();
  $('#user').empty();
  localStorage.clear();
};

const find_users = async () => {
  let users;
  console.log(app.currentUser);
  try {
    const mongodb = app.currentUser.mongoClient(ATLAS_SERVICE);
    users = mongodb.db("Cluster0").collection("users");
    console.log(mongodb,users);  
  } catch (err) {
    $("#user").append("Need to login first.");
    console.error("Need to log in first", err);
    return;
  }

  const getUsers = await users.find({}, {
    // "projection": {
    //   "_id": 0,
    //   "text": 1
    // },
    "limit": 20
  });
  // console.log(movies_titles);
  let email_div = $("#user-emails");
  email_div.empty();
  for (const user of getUsers) {
    let p = document.createElement("p");
    p.append(user.email);
    email_div.append(p);
  }
};
