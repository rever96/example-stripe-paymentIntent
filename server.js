const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, PUT, DELETE, OPTIONS'
	);
	next();
});
app.use(bodyParser.json());

const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.post("/createPayment", (req, res) => {
	console.log('i\'m trying to create a paymentIntent');
	(async () => {
		paymentIntent = await stripe.paymentIntents.create({
			amount: 1099,
			currency: 'eur',
			payment_method_types: ['card'],
		}).then(paymentIntentResponse => {
			console.log("paymentIntent created");
			res.send(paymentIntentResponse)
		});
	})();
});

app.post("/confirmPayment", (req, res) => {
	console.log(req.body);
	(async () => {
		paymentIntent = await stripe.paymentIntents.confirm(req.body.id, { payment_method: 'pm_card_visa' })
			.then(paymentIntentResponse => {
				console.log("paymentIntent confirmed");
				res.send(paymentIntentResponse)
			});
	})();
});

app.listen(process.env.PORT || 8080, () => {
	console.log('online');
});