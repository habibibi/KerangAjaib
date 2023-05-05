import React, {useState, useEffect, useRef} from "react";
import ChatContainer from './chatcontainer.js';
import SessionList from './sessionlist.js';
import ChatInput from './chatinput.js';
import ScrollToBottom from 'react-scroll-to-bottom';

function message(sender, profileType, text) {
    this.profileType = profileType;
    this.sender = sender;
    this.text = text;
}

function session(name) {
    this.name = name;
    this.id = -1;
    this.profileType = Math.floor(Math.random() * 2);
    this.messageList = [];
    this.pushMessage = function(sender, text) {
        this.messageList.push(new message(sender, this.profileType, text));
    }
}

function ChatManager() {
    const [sessionList, setSessionList] = useState([]);
    const [currSessionID, setCurrSessionID] = useState(-1);
    const [algo, setAlgo] = useState("kmp");
    const inputChat = useRef(null);

    function pushMessageCurrID(sender, text) {
        const tmp = sessionList.slice();
        tmp[currSessionID].pushMessage(sender, text);
        setSessionList(tmp);
    }

    function addSession(firstMessage) {
        const tmp = sessionList.slice();
        tmp.push(new session("Session " + (tmp.length+1)));
        tmp[tmp.length-1].pushMessage("user", firstMessage);
        setSessionList(tmp);
        setCurrSessionID(tmp.length-1);
    }
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [sessionList, currSessionID]);

    const onOptionChange = e => {
    setAlgo(e.target.value)
    }

    return (
        <div className='flex h-full w-full' onClick={console.log(sessionList)}>
            <div className="flex flex-none flex-col overflow-hidden w-[260px] p-2 bg-ungu4 h-full">
                <div className="flex-1 min-h-0">
                    <SessionList
                        sessionList={sessionList} 
                        currSessionID={currSessionID}
                        setCurrSessionId={setCurrSessionID}
                        setSessionList={setSessionList}
                        addSession={addSession} />

                </div>
                <div className="flex-none py-5 mt-2 border-t-4 border-ungu3">
                    <p className="text-center text-white mb-3">Algoritma</p>
                    <form>
                        <input className="m-1 mb-5" type="radio" id="KMP" name="KMP" value="kmp" checked={algo === "kmp"} onChange={onOptionChange}/>
                        <label className="text-white" for="KMP">Knuth-Morris-Pratt (KMP)</label><br />
                        <input className="m-1" type="radio" id="BM" name="BM" value="bm" checked={algo === "bm"} onChange={onOptionChange}/>
                        <label className="text-white" for="BM">Boyer-Moore (BM)</label><br />
                    </form>
                </div>
            </div>
            <div className="flex-1 relative flex w-full h-full flex-row bg-ungu0">
                <div className='w-full overflow-auto scroll-smooth scrollbar-thin scrollbar-track-white scrollbar-thumb-ungu2 scrollbar-thumb-rounded-lg' initialScrollBehavior={'auto'}>
                    {currSessionID === -1 ? 
                        <></> 
                        :
                        <ChatContainer
                        key={currSessionID}
                        messageList={sessionList[currSessionID].messageList} 
                        />
                    }
                    <div ref={bottomRef} />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-ungu0 mt-5">
                    <div className="stretch mx-2 flex flex-row gap-3">
                        <div className="relative flex h-full flex-1 items-center md:flex-col">
                            <ChatInput currSessionID={currSessionID} addSession={addSession} pushMessageCurrID={pushMessageCurrID}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatManager;