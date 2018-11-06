var express = require("express"),
    http = require("http"),
     cors = require("cors"),
     app = express();
var path = require('path');
var morgan = require('morgan');

app.use(cors());


const bodyParser = require('body-parser');

var createComponentsServer = function(urlPath, config) {
    var app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
app.use('/static', express.static(path.join(__dirname,'public')));

		
       var router = express.Router();
    router.use(morgan('combined'));
    //router.use(auth.connect(basic));

    // Return component metadata
    router.route('/').get(function (req, res) {
        res.set('Content-Type', 'application/json')
           .status(200)
           .json(shell.getAllComponentMetadata());
    });

    // Invoke component by name
    router.route('/:componentName').post(function (req, res) {
        
    const componentName = req.params.componentName;
        shell.invokeComponentByName(req.params.componentName, req.body, {}, function(err, data) {
            if (!err) {
                res.status(200).json(data);
            }
            else {
                switch (err.name) {
                    case 'unknownComponent':
                        res.status(404).send(err.message);
                        break;
                    case 'badRequest':
                        res.status(400).json(err.message);
                        break;
                    default:
                        res.status(500).json(err.message);
                        break;
                }
            }
        });
    });

    app.use(urlPath, router);

    
    app.locals.endpoints = [];
    app.locals.endpoints.push({
      name: 'metadata',
      method: 'GET',
      endpoint: urlPath
    });
    app.locals.endpoints.push({
      name: 'invocation',
      method: 'POST',
      endpoint: urlPath+'/:componentName'
    });

    app.locals.ui = {
  		name: 'Metadata',
  		endpoint: urlPath
  	};


  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

 var Data_Services = require('./data_services');

var data_services = new Data_Services();



app.get('/empleado/:nro', function(req,res) { 
  data_services.empleado(req.params.nro, callback);
    
  function callback(emp) {
   
   res.writeHead(200, {"Content-Type": "text/html"}); 
   var html = "<html><head><link rel='stylesheet' type='text/css' href='/static/css/style.css'/></head>" +
   "<body><br><br><br>" + 
   "<font color='white'><H1>Empleado " + emp.FirstName + " " + emp.LastName + "</H1></font>" + 
   "<font color='white'><h2>TELEFONO: " + emp.WorkPhoneNumber + "</h2>" +
   "<h2>EMAIL: " + emp.WorkEmail + "</h2>" +
   "<br><hr><br><h2>DIRECCION: " + emp.AddressLine1 + "</h2>" +
   "<h2>FECHA NAC: " + emp.DateOfBirth + "</h2>" +
   "</font></body></html>";
   res.end(html);  
  }

});

app.get('/lote/:nroserie', function(req,res) { 
 console.log('obtener lote\n');
 data_services.lote(req.params.nombre, callback);

 function callback(lista) {
   res.writeHead(200, {"Content-Type": "application/json"}); 
   res.end(JSON.stringify(lista));  
  }
});



return app;
}

module.exports = createComponentsServer;

module.exports = createComponentsServer;
