import React from 'react';
import Chat from './chat.js'

function ChatList({messageList}){
    return (
        <div className='w-full flex flex-col'>
            {messageList.map((message,idx) => (
                <div key={idx} className='flex-auto'>
                    <Chat message={message} />
                </div>
            ))}
            <div className='flex-none h-20 min-w-0'></div>
        </div>
    )
}

export default ChatList;