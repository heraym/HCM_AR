var moduleName = 'Data_Services';
var fs = require('fs'); 
var Promise = require("bluebird");
var https = require('https');

var hcm_host = "ucf1-edhr-fa-ext.oracledemos.com";
var hcm_path = "/hcmRestApi/resources/11.13.17.11/emps";
var hcm_port = 443; 
var Data_Services = function () {
};



Data_Services.prototype.empleado = function (nro, callback) {
  var options  = {
           host : hcm_host,
           port : 443,
           path : hcm_path + "?q=PersonNumber=" + nro, // the rest of the url with parameters if needed
           method : 'GET', 
           headers: {
              Host: hcm_host,
             "Content-Type": 'application/json',
             "Authorization": "Basic SENNX0lNUEw6bFJUdCtncE83"
           }};   

        var datos = "";
        var req = https.request(options, function(res) {

           res.on('data', function(d) {
              datos += d;
                });

          res.on('end', function(d) {
            console.log(datos);
           var objeto = JSON.parse(datos);
           callback(objeto.items[0]);
          });
      
          res.on('error', function(e) {
           console.info('ERROR:\n');
           console.info(e);
         });

        });
     
        req.end();       
}


module.exports = Data_Services;
