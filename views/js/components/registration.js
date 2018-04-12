import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addUser } from '../actions/index';


class Registration extends Component {
  render() {
    return (
      <div className="content__post-event">
      	<form onSubmit={(event) => {
      		event.preventDefault();

      		let username = event.target.username.value;
      		let nickname = event.target.nickname.value;
      		let password = event.target.password.value;

      		this.props.dispatch(addUser(username, password, nickname));
      	}}>

      	<div className="form-contol">
      		<label> Username: </label>
      		<input type="text" name="username" />
      	</div>
      	<div className="form-contol">
      		<label> Password: </label>
      		<input type="password" name="password" />
      	</div>
      	<div className="form-contol">
      		<label> Nickname: </label>
      		<input type="text" name="nickname" />
      	</div>
        <div className="form-contol">                             
          <button>Submit</button>
        </div>        
      	</form>
      </div>
  )}
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ addUser }, dispatch)
}


export default connect(matchDispatchToProps)(Registration);