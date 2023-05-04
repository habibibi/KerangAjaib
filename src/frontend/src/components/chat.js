import React, { useState } from 'react';

function Chat({message}){
    if (message.sender === "bot") { 
        return (
            <div className='chatbox_bot'>
                <p>{message.text}</p>
            </div>
        )
    } 
    else {
        
        console.assert(message.sender === "user");
        return (
            <div className='chatbox_user'>
                <p>{message.text}</p>
            </div>
        )
    }
}

export default Chat;