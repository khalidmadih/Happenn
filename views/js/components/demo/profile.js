import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Comment from './comment';
import Event from '../event';
import EventCreated from '../event-created';
import PastEvent from '../past-event';
import { demoCancelRsvp, 
         demoCancelEvent,
         displayCommentForm,
         demoGetUserProfile, 
         postComment, 
         positiveExpectation, 
         negativeExpectation } from '../../actions/demo/index';
// import * as Cookies from 'js-cookie';
import Moment from 'moment';


class Profile extends Component {

  componentWillMount() {
    this.props.demoGetUserProfile(this.props.user.username);
  }

  render() {
    let rsvpList;
    let createdList;
    let pastEventList;
    let filterPastEvents;
    let filterCurrentEvents;

    if (this.props.user.eventsRsvp) {
      // No need to use filter, just past events so that it is easier to read and logically make sense
      filterPastEvents = this.props.user.eventsRsvp.filter(event => Moment(event.time).isBefore(Moment()));
      filterCurrentEvents = this.props.user.eventsRsvp.filter(event => Moment(event.time).isSameOrAfter(Moment()));
      // pastEventComponents
      pastEventList = filterPastEvents.reverse().map((event, index) =>
        <div className="content__event-box" key={index}>
          <PastEvent name={ event.name }
                 tag={ event.tag }
                 description={ event.description }
                 price={ event.price }
                 location={ event.location }
                 numberOfRsvp={ event.numberOfRsvp }
                 time={ Moment(event.time).format('LLLL') }
                 cancel={ "Cancel" } 
                 buttonEvent={ "btn__cancel" }                 
                 clickYes={() => 
                  this.props.positiveExpectation(event._id)
                 }
                 clickNo={() => 
                  this.props.negativeExpectation(event._id)
                 }
                 eventClick={() => 
                  this.props.displayCommentForm(event._id, event.name)
                 } />
        </div> )
      
      rsvpList = filterCurrentEvents.reverse().map((event, index) => 
        <div className="content__event-box" key={index}>
          <Event name={ event.name }
                 tag={ event.tag }
                 description={ event.description }
                 price={ event.price }
                 location={ event.location }
                 numberOfRsvp={ event.numberOfRsvp }
                 time={ Moment(event.time).format('LLLL') }
                 cancel={ "Cancel" } 
                 buttonEvent={ "btn__cancel" }              
                 eventClick={() => 
                  this.props.demoCancelRsvp(event)
                 } />
        </div>        
      )    
    }

    if (this.props.user.eventsCreated) {
      createdList = this.props.user.eventsCreated.reverse().map((event, index) => 
        <div className="content__event-box" key={ index }>
          <EventCreated name={ event.name }
                 tag={ event.tag }
                 description={ event.description }
                 price={ event.price}
                 location={ event.location }
                 time={ Moment(event.time).format('LLLL') }
                 numberOfRsvp={ event.numberOfRsvp }
                 expectedPositive={ event.expectedPositive } // expectationSuccesses
                 expectedNegative={ event.expectedNegative } // expectationFailures
                 comments={ event.comments }
                 cancel={ "Cancel" } 
                 buttonEvent={ "btn__cancel" }                 
                 eventClick={() => 
                  this.props.demoCancelEvent(event)
                 } />
        </div>
      )
    }

    if (this.props.showCommentForm) {
      return (
        <Comment eventId={ this.props.commentedEventId }
                 title={ this.props.commentedEventTitle } />
      )
    } else {
      return (
        <div className='content__profile'>
          <div className="content__profile__username"> Username: { this.props.user.username } </div>
          <div className="content__profile__nickname"> Nickname: { this.props.user.nickname } </div>
          <div className="content__profile__rsvp"> RSVP : <div> { rsvpList } </div> </div>
          <div className="content__profile__past"> Past : <div> { pastEventList } </div> </div>
          <div className="content__profile__eventsCreated"> Created : <div> { createdList } </div> </div>             
        </div>      
      )      
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.userDatabase.user,
    // accessToken: state.userDatabase.token,
    commentedEventId: state.commentReducer.eventId,
    commentedEventTitle: state.commentReducer.eventTitle,
    showCommentForm: state.commentReducer.show
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators(
  { 
    demoCancelEvent, 
    demoCancelRsvp,
    displayCommentForm,     
    demoGetUserProfile, 
    postComment, 
    positiveExpectation, 
    negativeExpectation
  }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Profile);