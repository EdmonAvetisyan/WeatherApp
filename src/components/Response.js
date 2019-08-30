/* jshint ignore:start */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Star from '@material-ui/icons/Star';
import StarBorder from '@material-ui/icons/StarBorder';

const Response = (props)=> {
	function weatherResponse () {
		return (
			<div className='response'>
				<ul>
					<li>city :</li>
					<li>temp :</li>
					<li>clouds :</li>
					<li>wind :</li>
					<li>sunrise :</li>
					<li>sunset :</li>
				</ul>
				<ul>
					<li>
						{props.city},&nbsp; 
						{props.country}&nbsp;
						<IconButton onClick={props.toggleBookmark}> 
							{props.isBookmark ? <Star /> : <StarBorder />}
						</IconButton>
					</li>
					<li>{props.temp}&#x2103;</li>
					<li>{props.clouds}</li>
					<li>{props.wind} km/h</li>
					<li>{props.sunrise}</li>
					<li>{props.sunset}</li>
				</ul>
			</div>
		)
	}

	function errorResponse() {
		return (
			<div className="error">
				{props.error}
			</div>
		)
	}
	
	return (
		props.city ? weatherResponse() : errorResponse()
	);
}

export default Response;
/* jshint ignore:end */