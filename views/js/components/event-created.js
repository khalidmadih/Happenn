import React from 'react';


export default function EventCreated(props) {
  let comment = props.comments.map((comment, index) => 
    <li key={index}>{comment}</li>
  )
  return (
    <div className="content__event">
      <img className="content__event__image" src={ props.image } />
      <div className="content__event__name">{ props.name }</div>
      <div className="content__event__description">
        { props.description }
      </div>      
      <div className="content__event__tag"><b>Tag: </b>{ props.tag }</div>
      <div className="content__event__price"><b>Price:</b> ${ props.price }</div>
      <div className="content__event__location"><b>Location:</b> { props.location }</div>
      <div className="content__event__time"><b>Time:</b> { props.time }</div> 
      <div className="content__event__button">
        <button onClick={ props.eventClick } className={ props.buttonEvent } disabled={ props.ifRsvp }>{ props.cancel || 'RSVP' }</button>
        <span className="content__event__notice"> { props.notice } </span>
      </div>                     
      <div className="content__event__numberOfRsvp">
        {props.numberOfRsvp} people going
      </div>
      <div className="content__event__expectation">
        <div><b>People's reaction to the event:</b></div>
        <div>
          <span className="separtor"> Liked it: {props.expectedPositive} </span>
          <span className="separtor"> Didn't like it: {props.expectedNegative} </span>
        </div>
      </div>
          
    </div>
  );
}