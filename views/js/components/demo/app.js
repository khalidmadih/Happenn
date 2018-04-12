import React, { Component } from 'react';
import DemoNavigation from './navigation';
import { toggleNavebar } from '../../actions/index';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
	/* How??? Why cant I use function? */
	render() {
		return(
			<div>
				<div>
					<DemoNavigation toggleNavbar={() => this.props.toggleNavebar() } 
									checked={this.props.checked } />	
				</div>
				<div className="app__title">
					<h1> Hapenen'n </h1>
						<h3> find what you love, </h3>
						<h3> find what you enjoy, </h3>
						<h3> find events around your city </h3>
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
	return {
		checked: state.navigationReducer.checked,
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ toggleNavebar }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(App);