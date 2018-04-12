import React , { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postComment, cancelComment } from '../actions/index';
import * as Cookies from 'js-cookie';


class Comment extends Component {
  render() {
    let content;

    content = (
      <div className="content__post-comment">
        <form onSubmit={(event) => {
          event.preventDefault();

          let comment = event.target.comment.value;
          const accessToken = Cookies.get('accessToken');
          
          this.props.postComment(this.props.eventId, comment, accessToken);
        }}>

					<div className="content__event__comment">
		        <div>Event: { this.props.title}</div>
		        <div>
		          <textarea name="comment" className="content__event__commentbox" maxLength="120" placeholder="120 maximum character"></textarea>
		        </div>
		        <div>
		          <button className="btn__rsvp"> Submit </button>
		          <button onClick={() => this.props.cancelComment() } className="btn__cancel"> Cancel </button>            
		        </div>
			    </div> 
        </form>
      </div>
    );

    return content;
  }
}

function mapStateToProps(state) {
  return {
    comment: state.commentReducer.comment
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ postComment, cancelComment }, dispatch)
}


export default connect(mapStateToProps, matchDispatchToProps)(Comment);