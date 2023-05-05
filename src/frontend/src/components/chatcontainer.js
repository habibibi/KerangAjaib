import React from "react";
import ChatList from "./chatlist.js";

function ChatContainer({messageList}) {
    return (
        <ChatList messageList={messageList} />
    )
}

export default ChatContainer;