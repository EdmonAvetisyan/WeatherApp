/* jshint ignore:start */
import React, { Component } from 'react';
import Header from './Header';
import Form from './Form';
import BookmarkMenu from './BookmarkMenu'
import Response from './Response.js';
import CircularProgress from '@material-ui/core/CircularProgress';

class Main extends Component {
	constructor(props){
		super(props);
		this.getWeather = this.getWeather.bind(this);
		this.toggleLocalStorage = this.toggleLocalStorage.bind(this);
		this.changeInputValue = this.changeInputValue.bind(this);
		this.checkBookmarkedCity = this.checkBookmarkedCity.bind(this);

		this.state = {
			load: false,
			error: undefined,
			city : undefined,
			country: undefined,
			temp: undefined,
			clouds: undefined,
			wind: undefined,
			sunrise: undefined,
			sunset: undefined,
			inputValue: '',
			isBookmark: undefined,
		};
	}

	getWeather = async (e)=>{
		e.preventDefault();
		const isOnLine = window.navigator.onLine;

		if (! isOnLine) {
			this.setState({
				load: false,
				error: "No internet connection...",
				city : undefined,
				country: undefined,
				temp: undefined,
				clouds: undefined,
				wind: undefined,
				sunrise: undefined,
				sunset: undefined,
				isBookmark: undefined,
			});
			return;
		}

		const city = e.target.elements.city.value.trim();

		if (city.length === 0) {
			this.setState({
				load: false,
				error: "Pleace enter city",
				city : undefined,
				country: undefined,
				temp: undefined,
				clouds: undefined,
				wind: undefined,
				sunrise: undefined,
				sunset: undefined,
				isBookmark: undefined,
			});
			return;
		}

		this.setState({
			load: true,
		});

		const API_KEY = '97500722834663c9e0bfedaeba0a799d';
		const API_URL = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
		const DATA = await API_URL.json();
		console.log(DATA);
		
		if (DATA.name) {
			const sunrise = DATA.sys.sunrise;
			const sunset = DATA.sys.sunset;

			const d1 = new Date();
			const d2 = new Date();

			d1.setTime(sunrise);
			d2.setTime(sunset);

			const sunriseTime = d1.getHours() + ':' + d1.getMinutes() + ':' + d1.getSeconds();			
			const sunsetTime = d2.getHours() + ':' + d2.getMinutes() + ':' + d2.getSeconds();

			this.setState({
				load: false,
				error: undefined,
				city : DATA.name,
				country: DATA.sys.country,
				temp: Math.round(DATA.main.temp - 273),
				clouds: DATA.weather[0].description,
				wind: DATA.wind.speed,
				sunrise: sunriseTime,
				sunset: sunsetTime,
				isBookmark: undefined,
			});
		} else if (DATA.cod === "404") {
			this.setState({
				load: false,
				error: "City not found, please enter correct name",
				city : undefined,
				country: undefined,
				temp: undefined,
				clouds: undefined,
				wind: undefined,
				sunrise: undefined,
				sunset: undefined,
				isBookmark: undefined,
			});
		}
	}

	toggleLocalStorage(){
		if (localStorage.length) {
			let storageData = JSON.parse( localStorage.getItem('bookmarks') );

			const found = storageData.find (
				(city) => city ===  this.state.city
			);
			
			if (found) {
				const conf = window.confirm('Are you want to delete this city ?');

				if (conf) {
					let filtered = storageData.filter(
						(city) => city !==  this.state.city
					);
	
					filtered = JSON.stringify(filtered);
					localStorage.setItem('bookmarks', filtered);
					this.setState({isBookmark: false});
				} 

				let filtered = storageData.filter(
					(city) => city !==  this.state.city
				);

				filtered = JSON.stringify(filtered);
				localStorage.setItem('bookmarks', filtered);
				this.setState({isBookmark: false});

			} else {
				storageData.push(this.state.city);
				storageData = JSON.stringify(storageData);
				localStorage.setItem('bookmarks', storageData);
				this.setState({isBookmark: true});
			}
		} else {
			let firstBookmark = [this.state.city];
			firstBookmark = JSON.stringify(firstBookmark);
			localStorage.setItem('bookmarks', firstBookmark);
			this.setState({isBookmark: true});
		}
	}

	changeInputValue(e){
		this.setState({inputValue: e.target.value})
	}

	checkBookmarkedCity(e){
		this.setState({inputValue: e.target.textContent})
	}

	render() {
		let isCityBookmarked;
		if(localStorage.length){	
			const storageData = JSON.parse( localStorage.getItem('bookmarks') );
			isCityBookmarked = storageData.find (
				(city) => city ===  this.state.city
			);
		} else {
			isCityBookmarked = false;
		}

		return(
			<section id='main'>
				<Header />
				<main>
					<Form 
						getWeather={this.getWeather}
						inputValue={this.state.inputValue}
						changeInputValue={this.changeInputValue}
					/>
					<BookmarkMenu 
						checkBookmarkedCity={this.checkBookmarkedCity} 
					/>
					{
						this.state.load
						? 
						<div className="progress">
							<CircularProgress />
						</div>
						:
						<Response
							error={this.state.error}
							city={this.state.city}
							country={this.state.country}
							temp={this.state.temp}
							clouds={this.state.clouds}
							wind={this.state.wind}
							sunrise={this.state.sunrise}
							sunset={this.state.sunset}
							toggleBookmark={this.toggleLocalStorage}
							isBookmark={isCityBookmarked || this.state.isBookmark}
						/>
					}
				</main>
			</section>	
		);
	}
}

export default Main;
/* jshint ignore:end */