
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = 3000;

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.post("/", function(req, res){
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const yourEmail = req.body.email;

  const data = {   // required format by mailchimp
    members: [
      {
        email_address: yourEmail,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/2a5684c9e3"
  const options = {   // For more details, https://nodejs.org/api/https.html#httpsrequesturl-options-callback
    methods: "POST",
    auth: "JustKel:045b42a69d1d20ad61e16ef728f97926-us14"  // required format by mailchimp
  }


  const request = https.request(url, options, function(response){  //// For more details, https://nodejs.org/api/https.html#httpsrequesturl-options-callback
    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.listen(port, function(){
  console.log(`Server is running at port ${port}`); // displays on console
})

// 045b42a69d1d20ad61e16ef728f97926-us14
// 2a5684c9e3

//Requiring mailchimp's module
//For this we need to install the npm module @mailchimp/mailchimp_marketing. To do that we write:
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("mailchimp");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
//*****************************ENTER YOUR API KEY HERE******************************
 apiKey: "045b42a69d1d20ad61e16ef728f97926-us14",
//*****************************ENTER YOUR API KEY PREFIX HERE i.e.THE SERVER******************************
 server: "us14"
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
  //*****************************CHANGE THIS ACCORDING TO THE VALUES YOU HAVE ENTERED IN THE INPUT ATTRIBUTE IN HTML******************************
  const firstName = req.body.fname;
  const secondName = req.body.lname;
  const email = req.body.email;
  //*****************************ENTER YOU LIST ID HERE******************************
  const listId = "2a5684c9e3";
  //Creating an object with the users data
  const subscribingUser = {
    firstName: fname,
    lastName: lname,
    email: email
  };
  //Uploading the data to the server
  async function run() {
  const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
  }
  });

  }
})
