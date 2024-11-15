const express = require('express');
const upload = require('./fileUploads');
const path = require('path');
const app = express();
const filmeRoutes = require('./routes/filmeRoute.js')
const generoRoutes = require('./routes/generoRoute.js')
var cors = require('cors');
app.use(cors());

app.set('port', process.env.PORT || 3002);

// Configurar CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


// Configurações


// Middlewares
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('file'), (req, res) => {
	console.log("upload: " + req.file);
	res.send({ message: 'File uploaded successfully!', data: req.file });
});

// Rotas
app.use('/filme', filmeRoutes);
app.use('/genero', generoRoutes);

app.listen(app.get('port'), () => {
    console.log("Start server on port " + app.get('port'));
});

