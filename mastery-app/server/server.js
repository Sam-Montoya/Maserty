const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive('postgres://@localhost:5432/Mastery')
	.then((db) => {
		app.set('db', db);
		console.log('Connected!');
	})
	.catch((err) => {
		console.log('Something happened... ' + err);
	});

app.post('/api/addFavorite', (request, response) => {
	console.log(request.body);
	let DB = app.get('db');
	DB.add_favorite([request.body.user_id, request.body.favorite_id]).then(favorites => {
		response.status(200).send(favorites);
	})
})

app.get('/api/getUserFavorites/:username', (request, response) => {
	let DB = app.get('db');
	DB.get_users(request.params.username).then((user) => {
		if (user[0].user_id) {
			DB.get_user_favorites(user[0].user_id).then((favorites) => {
				let userData = {
					userInfo: user[0],
					favorites: favorites
				}
				response.status(200).send(userData);
			});
		}
	});
});
app.put('/api/updateUserPicture', (request, response) => {
	let DB = app.get('db');
	DB.update_picture([request.body.username, request.body.profile_pic]).then(userData => {
		response.status(200).send(userData);
	})

})
app.delete('/api/removeFavorite/:user_id/:favorite_id', (request, response)=> {
	let DB = app.get('db');
	DB.remove_favorite([request.params.user_id, request.params.favorite_id]).then(res => {
		console.log(res);
		response.status(200).send(res);
	})
})

app.listen(3030, () => console.log('Server being slapped on port 3030'));
