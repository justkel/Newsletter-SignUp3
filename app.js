
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const port = process.env.PORT || 3000;

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

    if(response.statusCode == 200) {
      res.sendFile(__dirname + "/success.html")
    } else {
      res.sendFile(__dirname + "/failure.html")
    }

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/") // Redirect to get of root.
})

app.listen(port, function(){
  console.log(`Server is running at port ${port}`); // displays on console
})

// 045b42a69d1d20ad61e16ef728f97926-us14
// 2a5684c9e3
