var express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

require('dotenv').config();

var model = require("./clients/users-api.js");

const PORT = process.env.SECRETS_PORT ? process.env.DEFAULT_PORT : 9000;

const OAUTH_API_KEY = process.env.OAUTH_API_KEY ? process.env.OAUTH_API_KEY : require('crypto').randomBytes(48, function(err, buffer) {
        let token = buffer.toString('hex');
        console.log("======> Your secret token is : "+token );
        process.env['OAUTH_API_KEY'] = token;
        return token;
    });



var app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, API-Key')
  next()
})
app.use(express.static('pages'));


//Statics pages
app.get('/', function(req,res){
    res.redirect("/authentication.html");
    return ;
});
app.get('/request-password', function(req,res){
    res.redirect("/remember.html");
    return ;
});
app.get('/suscribe', function(req,res){
    res.redirect("/suscribe.html");
    return;
});



// Validate forms
app.get('/save', function(req,res){
    model.save(req, res);
    return;
});
app.get('/change-password', function(req,res){
    model.save(req, res);
    return;
});




// Authentication
app.post('/authorize', function (req, res) {
    model.authorize(req, res);
});
app.post('/verify', function (req, res) {
 jwt.verify(req.headers.authorization, process.env.OAUTH_JWT_SECRET, (err, user)=>{
            if(err){
                res.send({success:false});
            } else {
                res.send(user);
            }
        });
});
app.post('/refresh', function (req, res) {
    jwt.verify(req.headers.authorization, process.env.OAUTH_JWT_SECRET,
    (err, user)=>{
        if(err){
            res.statusCode = 403;
            res.send({success:false});
        } else {
            delete user.iat;
            delete user.exp;

            var accessToken = jwt.sign(
                user,
                process.env.OAUTH_JWT_SECRET,
                { expiresIn: process.env.OAUTH_JWT_TIMELIFE }
                );
            res.statusCode = 200;
            res.send(accessToken);
        }
    });
});

app.listen(PORT, function(err){
    console.log("Node.js Express HTTP Server Listening on Port "+PORT);
});
