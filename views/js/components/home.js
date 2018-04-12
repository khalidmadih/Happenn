import React from 'react';


export default function Home() {
  return (
    <div className="content__home">
        <div className="content__home__message">
            <div>Welcome to Happen'n. You can start browsing the application by clicking the menu bar above.<p></p></div>
            <div>About us: <p></p></div>
            <div>
                Happen'n is dedicated to help people find events in their city.
                <br />
                Also, we provides a platform so that everyone can post events and share them with the world.
                <p></p>
            </div>
            <div>FAQ <p></p></div>
            <div className="content__home__message--question">How do I create an event?</div>
            <div className="content__home__message--answer">Click "Event" tab above, then you can start create an event.<p></p></div>
            <div className="content__home__message--question">Can I cancel the event that I reserverd or created?</div>
            <div className="content__home__message--answer">Of course! Just go to "Account" tab, then you can cancel the event you reserverd or created. <p></p></div>
            <div className="content__home__message--question">Can I leave a comment for the event?</div>
            <div className="content__home__message--answer">Go to "Account" tab, and you can see there is a "Comment" button in the "Past" session. </div>
        </div>
    </div>
  )
}