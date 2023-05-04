import React, {useState} from "react";
import ChatContainer from './chatcontainer.js';
import SessionList from './sessionlist.js';
import ChatInput from './chatinput.js';

function message(sender, text) {
    this.sender = sender;
    this.text = text;
}

function session(name) {
    this.name = name;
    this.messageList = [];
    this.pushMessage = function(sender, text) {
        this.messageList.push(new message(sender, text));
    }
}

function ChatManager() {
    const [sessionList, setSessionList] = useState([]);
    const [currSessionID, setCurrSessionID] = useState(-1);

    function pushMessageCurrID(sender, text) {
        const tmp = sessionList.slice();
        tmp[currSessionID].messageList.push(new message(sender, text));
        setSessionList(tmp);
    }

    function addSession(firstMessage) {
        const tmp = sessionList.slice();
        tmp.push(new session("Session " + (tmp.length+1)));
        tmp[tmp.length-1].pushMessage("user", firstMessage);
        setSessionList(tmp);
        setCurrSessionID(tmp.length-1);
    }

    return (
        <div className='ChatManager'>
            <SessionList 
                sessionList={sessionList} 
                currSessionID={currSessionID}
                setCurrSessionId={setCurrSessionID}
                setSessionList={setSessionList}
                addSession={addSession} />
            {currSessionID === -1 ? 
                <></> 
                :
                <div>
                    <ChatContainer  
                    key={currSessionID}
                    messageList={sessionList[currSessionID].messageList} 
                    />
                </div>
            }
            <ChatInput currSessionID={currSessionID} addSession={addSession} pushMessageCurrID={pushMessageCurrID}/>
        </div>
    )
}

export default ChatManager;