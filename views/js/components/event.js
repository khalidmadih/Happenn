import React from 'react';


export default function Event(props) {
  return (
    <div className="content__event">
      <img className="content__event__image"src={ props.image } />
      <div className="content__event__name">{ props.name }</div>
      <div className="content__event__description">
        { props.description }
      </div>
      <div className="content__event__tag"><b>Tag:</b> { props.tag }</div>
      <div className="content__event__price"><b>Price:</b> ${ props.price }</div>
      <div className="content__event__location"><b>Location: </b>{ props.location }</div>
      <div className="content__event__time"><b>Time:</b> { props.time }</div>      
      <div className="content__event__button">
        <button onClick={ props.eventClick } className={ props.buttonEvent } disabled={ props.ifRsvp }>{ props.cancel || 'RSVP' }</button>
        <span className="content__event__notice"> { props.notice } </span>
      </div>        
    </div>
  );
}