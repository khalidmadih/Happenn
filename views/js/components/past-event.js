import React from 'react';


export default function PastEvent(props) {
  return (
    <div className="content__event">
      <img className="content__event__image"src={ props.image } />
      <div className="content__event__name">{ props.name }</div>
      <div className="content__event__tag">Tag: { props.tag }</div>
      <div className="content__event__price">Price: ${ props.price }</div>
      <div className="content__event__location">Location: { props.location }</div>
      <div className="content__event__time">Time: { props.time }</div>              
      <div className="content__event__expectation">
        Did you like this event?
        <div>
          <button className="btn__survey" onClick={props.clickYes}> Yes </button> 
          <button className="btn__survey" onClick={props.clickNo}> No </button>
        </div>
      </div>
           
    </div>
  );
}