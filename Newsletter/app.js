const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const url = "https://us14.api.mailchimp.com/3.0/lists/cc1ca74db5";
  // console.log(firstName, lastName, email);
const options = {
  method: "POST",
  auth: "angela1:cd04344df9e24924554c67ee953c8f59-us14"
}

const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }


  response.on("data", function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});

// mailchimp api
// cd04344df9e24924554c67ee953c8f59-us14

// mailchimp unique list id
// cc1ca74db5

// mailchimp url
// --url 'https://us14.api.mailchimp.com/3.0/'
