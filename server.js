const express = require('express');
const hbs = require('hbs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
	var now = new Date().toString();
	console.log(`${now}: ${req.method} ${req.originalUrl}`);
	next();
});

hbs.registerHelper('currentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('capitalize', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to the website'
	})
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (request, response) => {
	response.send({
		error: 'Error Handling the request'
	});
});

app.listen(3000, () => {
	console.log(`Server is running on port 3000`);
});