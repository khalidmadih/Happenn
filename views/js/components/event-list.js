import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Event from './event';
import { clickRsvp, getAllEvents, getUserRsvpEvents, positiveExpectation, negativeExpectation } from '../actions/index';
import * as Cookies from 'js-cookie';
import Moment from 'moment';


class EventList extends Component {

	componentWillMount() {
		const accessToken = Cookies.get('accessToken');

		/* Get the user latest RSVP list */
		this.props.getUserRsvpEvents(accessToken);		
		this.props.getAllEvents(accessToken);
	}

	createEventList() {
		const accessToken = Cookies.get('accessToken'); // Better way to refactor?

		// TODO - Filter out passed events
		let reverseList = this.props.events.slice().reverse(); // Need to use slice to copy, otherwise props cannot be changed which will not work
		return reverseList.map((event, index) => {
			let ifRsvp = false;
			let rsvpNotice = '';

			/* Need optimization here */
			this.props.rsvp.forEach(rsvpEvent => {
				if (event._id === rsvpEvent._id) {
					ifRsvp = true;
					rsvpNotice = "You have RSVP'ed this event";
				}
			})

			return (
				<div className="content__event-box" key={ index }>
					<Event image={ event.image }
								name={ event.name }
								 tag={ event.tag }
								 description={ event.description }
								 price={ event.price }
								 location={ event.location }
								 time={ Moment(event.time).format('LLLL') }
								 buttonEvent={ "btn__rsvp" }
								 ifRsvp={ ifRsvp }
								 notice={ rsvpNotice }								 
								 eventClick={
								 	() => {
								 		this.props.clickRsvp(event, accessToken);
								 		this.props.getUserRsvpEvents(accessToken); // Put the access token in the state
								 	}
								 } />
				</div>
			)
		})
	}

	render() {
		return(
			<div className='content__events__wrap'>
				{ this.createEventList() }					 						 
			</div>			
		)
	}
}

function mapStateToProps(state) {
	return {
		events: state.eventsDatabase.events,
		rsvp: state.eventsDatabase.rsvp
	}
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({ clickRsvp, getAllEvents, getUserRsvpEvents, positiveExpectation, negativeExpectation }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(EventList);