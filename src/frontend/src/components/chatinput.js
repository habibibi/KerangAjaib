import React, {useState} from "react";

function ChatInput({pushMessageCurrID, currSessionID, addSession}) {
    const [chatInputText, setChatInputText] = useState('');

    function onClickPush() {
        if (chatInputText !== '') {
            if (currSessionID === -1){
                addSession(chatInputText);
            } else {
                pushMessageCurrID("user", chatInputText);
            }
            setChatInputText('');
        }
    }

    return (
        <div className='ChatInput'>
            <input 
                type='text' 
                value={chatInputText} 
                placeholder='Type a message...' 
                onChange={e => setChatInputText(e.target.value)}
            />
            <button onClick={onClickPush}>Send</button>
        </div>
    )
}

export default ChatInput;