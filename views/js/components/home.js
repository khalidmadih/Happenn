import React from 'react';


export default function Home() {
  return (
    <div className="content__home">
        <div className="content__home__message">
            <div>Welcome to Happen'n. You can start browsing the application by clicking the menu bar above.<p></p></div>
            <div className="content__home__message__title">About us: <p></p></div>
            <div>
                Happen'n is dedicated to help people find events in their city. We provides a platform that allows everyone to post events and share them with the world.
                <p></p>
            </div>
            <div className="content__home__message__title">FAQ</div><br></br>
            <div className="content__home__message--question">How do I create an event?</div>
            <div className="content__home__message--answer">Click "Add Event" tab above, then you can start create an event.<p></p></div>
            <div className="content__home__message--question">Can I cancel the event that I reserverd or created?</div>
            <div className="content__home__message--answer">Of course! Just go to "My Events" tab, then you can cancel the event you reserverd or created. <p></p></div>
            <div className="content__home__message--question">Can I review the events I attended?</div>
            <div className="content__home__message--answer">Go to "My Events" tab, and under “Past events I RSVP'ed ", you can mark the events you enjoyed with a “yes” or “no”.</div>
        </div>
    </div>
  )
}