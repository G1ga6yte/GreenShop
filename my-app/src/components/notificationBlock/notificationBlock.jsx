import React, {useEffect, useState} from 'react';
import "./notificationBlock.scss"
import { IoClose } from "react-icons/io5";


function NotificationBlock({status, setStatus, message}) {
    const [notification, setNotification] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        let timeout;

        if (status) {
            setNotification(true);
            setBlock(true);

            // Automatically close after 4.5 seconds
            timeout = setTimeout(() => {
                setNotification(false);
                setBlock(false);
                setStatus(false); // Notify parent that the notification has ended
            }, 4500);
        }

        // Cleanup function to prevent overlapping timers
        return () => {
            clearTimeout(timeout);
            setNotification(false); // Ensure notification hides properly
            setBlock(false);        // Ensure progress animation stops
        };
    }, [status, setStatus]);



    return (
        <div className={`notificationBlock ${notification && "activeNotification"}`}>

            <div className="textBlock">
                <p className="header">New notification!</p>
                <p className="message">{message}</p>

                <button onClick={()=>{
                    setStatus(false)
                    setNotification(false)
                }} className="closeBtn"><IoClose className="icon"/></button>
            </div>

            <div className="progressBlock">
            <div className={`progressLine ${block && "progressLineAnim"}`}></div>
            </div>
        </div>
    )
}

export default NotificationBlock;