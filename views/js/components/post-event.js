import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postEvent, newPostForm } from '../actions/index';
import * as Cookies from 'js-cookie';
import 'date-input-polyfill';
// import 'react-datetime';


class PostEvent extends Component {
  render() {
    let content;

    if (this.props.events.length === 0) {
      content = (
        <div className="content__post-event">
          <form onSubmit={(event) => {
            event.preventDefault();

            let name = event.target.name.value;
            let description = event.target.description.value;
            let price = event.target.price.value;
            let tag = event.target.tag.value;
            let location = event.target.location.value;
            let time = event.target.time.value;
            let image = event.target.image.value;

            const accessToken = Cookies.get('accessToken'); // Get that from the state
            
            this.props.postEvent(name, price, description, location, tag, time, accessToken, image);
          }}>

          <div className="form-control">
            <label className="content__post-event__label"> Name: </label>
            <input type="text" name="name" />
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> Image link: </label>
            <input type="text" name="image" />
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> Location: </label>
            <input type="text" name="location" />
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> When: </label>
            <input type="datetime-local" name="time" />
          </div>               
          <div className="form-control ">
            <label> &nbsp; </label>
            (Format: 01/01/2017, 10:00 AM)
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> Price: </label>
            <input type="number" name="price" />
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> Description: </label>
            <textarea type="text" name="description"></textarea>
          </div>
          <div className="form-control">
            <label className="content__post-event__label"> Tag: </label>
            <input type="text" name="tag" /> 
          </div>
          <div className="form-control">                            
            <button className="btn__submit">Submit</button>
          </div>
          </form>
        </div>
      );
    } else {
      content = (
        <div className="content__event-posted">
          <div>The event is posted. If you would like to create another event, please click the button below.</div>
          <div>
            <button 
              onClick={ () => this.props.newPostForm() } 
              className="btn__refresh"> 
              New Event 
            </button>
          </div>
          
        </div>
      );
    }

    return content;
  }
}

function mapStateToProps(state) {
  return {
    events: state.postedEvent.event
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ postEvent, newPostForm }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(PostEvent);