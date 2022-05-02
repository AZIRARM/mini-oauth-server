const request = require('request');
var jwt = require('jsonwebtoken');

module.exports = {

   async authorize(req, res) {
       let client_id = req.body.client_id;
       let client_secret = req.body.client_secret;


       console.debug("client id :"+client_id+", client secret : "+client_secret);
        await request({
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.API_GATEWAY_SECRET
              },
             uri: process.env.API_GATEWAY+'/users-api/connect?email='+client_id+'&pwd='+client_secret,
             method: 'POST'
           }, function (err, response, body) {
                try{
                    let user = JSON.parse(body);
                    if (err) {
                        console.log(err);
                        return ;
                    }
                    if(res.statusCode >= 400) {
                        console.error("Error occurred when call  : " + process.env.API_GATEWAY+"/users/" + ", Method : POST, Status Code : " + response.statusCode);
                        res.statusCode = response.statusCode;
                        res.send("Error access : " + process.env.API_GATEWAY+"/users/" + ", Status Code : " + response.statusCode);
                        return ;
                    }
                    if(user && user["id"] != null && user["roles"] != null){

                       var accessToken = jwt.sign(
                            { clientId: client_id,  username: client_id, role:user["roles"][0] },
                            process.env.OAUTH_JWT_SECRET,
                            { expiresIn: process.env.OAUTH_JWT_TIMELIFE }
                            );

                           console.debug("Success => "+JSON.stringify(accessToken));
                        let service = req.get('service');

                        res.statusCode = 200;
                        res.json(accessToken);

                    } else {
                        res.statusCode = 403;
                        res.send('Credentials are incorrects');
                    }
                    return ;
                } catch(error) {
                    res.statusCode = 500;
                    res.send('Unknown error, please wait and try again');
                    return ;
                }
           });

    },

    async changePassword(req, res) {
       let client_id = req.body.client_id;
       let client_secret = req.body.client_secret;
        await request({
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.API_KEY
              },
              data:{
                id:'',
                pwd:'',
                newPwd:''
              },
             uri: process.env.API_GATEWAY+'/users-api/request-password',
             method: 'PATCH'
           }, function (err, response, body) {
                try{
                    let user = JSON.parse(body);
                    if (err) {
                        console.log(err);
                        return ;
                    }
                    if(res.statusCode >= 400) {
                        console.error("Error occurred when call  : " + process.env.API_GATEWAY+"/users/request-password" + ", Method : PATCH, Status Code : " + response.statusCode);
                        res.statusCode = response.statusCode;
                        res.send("Error access : " + process.env.API_GATEWAY+"/users/request-password" + ", Status Code : " + response.statusCode);
                        return ;
                    }
                    if(user && user["id"] != null && user["roles"] != null){
                        res.statusCode = 200;
                        res.send(res.data);

                        return ;
                    }
                } catch(error) {
                    res.statusCode = 500;
                    res.send('Unknown error, please wait and try again');
                    return ;
                }
           });
    },

    async save(req, res) {
       let client_id = req.body.client_id;
       let client_secret = req.body.client_secret;
        await request({
             headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'api-key': process.env.API_KEY
              },
              data: req.data,
             uri: process.env.API_GATEWAY+'/users-api/request-password',
             method: 'PUT'
           }, function (err, response, body) {
                try{
                    let user = JSON.parse(body);
                    if (err) {
                        console.log(err);
                        return ;
                    }
                    if(res.statusCode >= 400) {
                        console.error("Error occurred when call  : " + process.env.API_GATEWAY+"/users/" + ", Method : PUT, Status Code : " + response.statusCode);
                        res.statusCode = response.statusCode;
                        res.send("Error access : " + process.env.API_GATEWAY+"/users/" + ", Status Code : " + response.statusCode);
                        return ;
                    }
                    if(user && user["id"] != null && user["roles"] != null){
                        res.statusCode = 200;
                        res.send(res.data);

                        return ;
                    }
                } catch(error) {
                    res.statusCode = 500;
                    res.send('Unknown error, please wait and try again');
                    return ;
                }
           });
    },
}
