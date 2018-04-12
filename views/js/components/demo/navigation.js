import React from 'react';
import {Link} from 'react-router';


export default function Navigation(props) {
  return (
    <div className="nav">
      <input type="checkbox" id="navbar" checked={props.checked} />
      <label onClick={ props.toggleNavbar } htmlFor="navbar"></label>
      <ul>
        <li className="nav__brand"><Link onClick={ props.toggleNavbar } to="/app/home">Happen'n</Link></li>
        <li className="nav__item"><Link onClick={ props.toggleNavbar }  activeStyle={{ color: '#63ccff' }} to="/app/events" >All Events</Link></li>
        <li className="nav__item"><Link onClick={ props.toggleNavbar }  activeStyle={{ color: '#63ccff' }} to="/app/postevents" >Add Event</Link></li>

        <li className="nav__item"><Link onClick={ props.toggleNavbar } activeStyle={{ color: '#63ccff' }} to="/app/profile">My Events</Link></li>
                <li className="nav__item"><a href="api/user/auth/logout">Logout</a></li> 
      </ul>
    </div>
  );
}