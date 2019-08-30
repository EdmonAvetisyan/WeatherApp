/* jshint ignore:start */
import React from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const Form = (props)=>{
	return (
		<form onSubmit={props.getWeather}>
			<Input
				name='city'
				placeholder='enter city'
				className='search-input'
				value={props.inputValue}
				onChange={props.changeInputValue}
			/>
			<Button
				variant='outlined' 
				color='default'
				className='search-btn'
				type='submit'
			>
				get weather
			</Button>
		</form>
	);
}

export default Form;
/* jshint ignore:end */