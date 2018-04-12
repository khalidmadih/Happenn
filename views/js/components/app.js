import React, { Component } from 'react';
import Navigation from './navigation';
import { toggleNavebar } from '../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
	/* How??? Why cant I use function? */
	render() {
		// console.log(this.props) // Where is the props came from??
		// console.log("NAV", this.props.checked)
		return(
			<div>			
				<div>
					<Navigation toggleNavbar={() => this.props.toggleNavebar() } 
											checked={this.props.checked } />				
				</div>
				<div className="app__title">					
					<div>
						<h1> Happen'n </h1>
						<h4> find what you love and what you enjoy, </h4>
						<h4> find events around your city </h4>
					</div>
				</div>			
				<div className="content">
					<div className="welcome"></div>
					{ this.props.children } 
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	// console.log("TEST")
	return {
		checked: state.navigationReducer.checked,
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ toggleNavebar }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(App);