import React from 'react';


export default function Login() {
  return (
    <div className="login">
      <div className="login__bed">
        <div className="login__title">
          <h1> Welcome to Happen'n </h1>
          <h2> Where finding events in your city is made easy </h2>
        </div>
        <div className="login__button">
          <a href="api/user/auth/google"><button className="btn__google">Login with Google</button></a> 
        </div>
        
      </div>
    </div>
  )
}