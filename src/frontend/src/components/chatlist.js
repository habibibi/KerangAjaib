import React, { useState } from 'react';
import Chat from './chat.js'

function ChatList({messageList}){
    return (
        <div className='ChatList'>
            {messageList.map((message) => (
                <Chat message={message} />
            ))}
        </div>
    )
}

export default ChatList;