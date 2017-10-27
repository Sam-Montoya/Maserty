import React from 'react';
import './Axios.css';
import axios from 'axios';

export default class Axios extends React.Component {
	constructor() {
		super();

		this.state = {
			products: [],
			isLoggedIn: false,
			userInfo: [],
			userFavorites: []
		};
	}
	componentDidMount() {
		axios.get('https://practiceapi.devmountain.com/products').then((products) => {
			this.setState({
				products: products.data
			});
		});
	}

	render() {
		console.log(this.state);
		return (
			<div className='products_container'>
				<section className='products_all_products'>{this.mapThroughProducts(this.state.products)}</section>
				<section className='products_user_container'>
					{this.userController()}
					<div className='products_user_favorites'>{this.mapThroughFavorites(this.state.userFavorites)}</div>
				</section>
			</div>
		);
	}

	getUserInfo = () => {
		axios.get('http://localhost:3030/api/getUserFavorites/' + this.refs.submitInput.value).then((userData) => {
			this.setState({
				userInfo: userData.data.userInfo
			});
			for (let i = 0; i < userData.data.favorites.length; i++) {
				axios
					.get('https://practiceapi.devmountain.com/products/' + userData.data.favorites[i].favorite_id)
					.then((response) => {
						this.setState({
							userFavorites: [ ...this.state.userFavorites, response.data ],
							userInfo: userData.data.userInfo,
							isLoggedIn: true
						});
					});
			}
		});
	};

	mapThroughProducts = (products) => {
		if (products.length) {
			let product = products.map((product, index) => {
				return (
					<div key={index} className='product_container'>
						<section className='product_image'>
							<img src={product.image} alt='' />
						</section>
						<section className='product_info'>
							<h1>{product.title}</h1>
							<h1>{product.desc}</h1>
							<h1>{product.price}</h1>
						</section>

						<button onClick={() => this.addFavorite(product.id)} className='products_add_button'>
							Add
						</button>
					</div>
				);
			});
			return product;
		}
	};

	mapThroughFavorites = (products) => {
		let product;
		if (products.length) {
			product = products.map((product, index) => {
				return (
					<div key={index} className='product_container'>
						<section className='product_image'>
							<img src={product.image} alt='' />
						</section>
						<section className='product_info'>
							<h1>{product.title}</h1>
							<h1>{product.desc}</h1>
							<h1>{product.price}</h1>
						</section>
						<button onClick={() => this.removeFavorite(product.id)} className='products_remove_button'>
							Remove
						</button>
					</div>
				);
			});
		} else if (products.title) {
			product = (
				<div className='product_container'>
					<section className='product_image'>
						<img src={this.state.userFavorites.image} alt='' />
					</section>
					<section className='product_info'>
						<h1>{this.state.userFavorites.title}</h1>
						<h1>{this.state.userFavorites.desc}</h1>
						<h1>{this.state.userFavorites.price}</h1>
					</section>
					<button
						onClick={() => this.removeFavorite(this.state.userFavorites.product_id)}
						className='products_remove_button'>
						Remove
					</button>
				</div>
			);
		}
		return product;
	};

	addFavorite(product_id) {
		let favoriteInfo = {
			user_id: this.state.userInfo.user_id,
			favorite_id: product_id
		};
		axios.post('http://localhost:3030/api/addFavorite/', favoriteInfo).then((favorites) => {
			for (let i = 0; i < favorites.data.length; i++) {
				axios
					.get('https://practiceapi.devmountain.com/products/' + favorites.data[i].favorite_id)
					.then((response) => {
						this.setState({
							userFavorites: [ ...this.state.userFavorites, response.data ]
						});
					});
			}
		});
	}

	removeFavorite(product_id) {
		let removeInfo = {
			user_id: this.state.userInfo.user_id,
			favorite_id: product_id
		};
		console.log(removeInfo);
		axios
			.delete('http://localhost:3030/api/removeFavorite/' + this.state.userInfo.user_id + '/' + product_id)
			.then((favorites) => {
				for (let i = 0; i < favorites.data.length; i++) {
					axios
						.get('https://practiceapi.devmountain.com/products/' + favorites.data[i].favorite_id)
						.then((response) => {
							console.log(response);
							this.setState(
								{
									userFavorites: response.data
								},
								() => {
									this.mapThroughProducts(response.data, true);
								}
							);
						});
				}
			});
	}

	updateUserPicture = () => {
		let profileInfo = {
			username: this.state.userInfo.username,
			profile_pic: this.refs.picture_input.value
		};
		axios.put('http://localhost:3030/api/updateUserPicture', profileInfo).then((response) => {
			this.setState({
				userInfo: response.data[0]
			});
		});
	};

	userController = () => {
		if (this.state.isLoggedIn) {
			return (
				<div className='products_user_info'>
					<img src={this.state.userInfo.profile_pic} alt='' />
					<input ref='picture_input' placeholder='Enter URL' />
					<button onClick={() => this.updateUserPicture()}>Update Profile Picture</button>
				</div>
			);
		} else {
			return (
				<div className='axios_login_input'>
					<h1>Enter a username to view favorites!</h1>
					<input ref='submitInput' placeholder='Enter your username...' />
					<button onClick={() => this.getUserInfo()}>Submit</button>
				</div>
			);
		}
	};
}
