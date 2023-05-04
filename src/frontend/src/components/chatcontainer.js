import React from "react";
import ChatList from "./chatlist.js";
import ChatInput from "./chatinput.js";

function ChatContainer({messageList}) {
    return (
        <div className='ChatContainer'>
            <ChatList messageList={messageList} />
        </div>
    )
}

export default ChatContainer;