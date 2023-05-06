import React, {useState, useEffect, useRef} from "react";
import ChatContainer from './chatcontainer.js';
import SessionList from './sessionlist.js';
import ChatInput from './chatinput.js';
import ScrollToBottom from 'react-scroll-to-bottom';
import axios from 'axios';

function message(sender, profileType, text) {
    this.profileType = profileType;
    this.sender = sender;
    this.text = text;
}

function session(id, name) {
    this.name = name;
    this.id = id;
    this.profileType = Math.floor(Math.random() * 2);
    this.messageList = [];
    this.pushMessage = function(sender, text) {
        this.messageList.push(new message(sender, this.profileType, text));
    }
}

function ChatManager() {
    const [sessionList, setSessionList] = useState([]);
    const [currSessionIdx, setCurrSessionIdx] = useState(-1);
    const [sentMessage, setSentMessage] = useState('');
    const [algo, setAlgo] = useState("KMP");

    async function pushUserMsgIdx(idx,text) {
        const tmp = sessionList.slice();
        tmp[idx].pushMessage("user", text);
        setSessionList(tmp);
    }

    useEffect(()=>{
        async function getSession() {
            const response = await axios.get("http://localhost:3000/session");
            const data = response.data;
            console.log(data);
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const id = data[i]._id;
                const name = data[i].name;
                const tmp = new session(id, name);
                for (let j = 0; j < data[i].message.length; j++) {
                    const sender = data[i].message[j].sender;
                    const text = data[i].message[j].text;
                    tmp.pushMessage(sender, text);
                }
                arr.push(tmp);
            }
            console.log(arr);
            setSessionList(arr);
        }
        getSession();
    }, [])

    useEffect( () => {
        async function pushUserMsg() {
            try{
                if (sentMessage === '')  return;
                const tmp = sessionList.slice();
                console.log(sessionList)
                console.log(currSessionIdx)
                console.log(tmp[currSessionIdx].id)
                const response = await axios.post("http://localhost:3000/query", {query : sentMessage, sessionID : tmp[currSessionIdx].id, algo : algo});
                tmp[currSessionIdx].pushMessage("bot", response.data.answer);
                setSessionList(tmp);
                setSentMessage('');
            } catch (err) {
                console.log(err);
            }
        }
        pushUserMsg();
    }, [sentMessage, currSessionIdx, algo, sessionList])

    async function addSession(firstMessage) {
        const tmp = sessionList.slice();
        const response  = await axios.post("http://localhost:3000/session", {name: "New Session"});
        const id = response.data.sessionID;
        tmp.push(new session(id, "New Session"));
        tmp[tmp.length-1].pushMessage("user", firstMessage);
        setCurrSessionIdx(tmp.length-1);
        setSessionList(tmp);
        setSentMessage(firstMessage);
    }

    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [sessionList, currSessionIdx]);

    const onOptionChange = e => {
    setAlgo(e.target.value)
    }

    return (
        <div className='flex h-full w-full'>
            <div className="flex flex-none flex-col overflow-hidden w-[260px] p-2 bg-ungu4 h-full">
                <div className="flex-1 min-h-0">
                    <SessionList
                        sessionList={sessionList} 
                        currSessionIdx={currSessionIdx}
                        setCurrSessionIdx={setCurrSessionIdx}
                        setSessionList={setSessionList}
                        addSession={addSession} />

                </div>
                <div className="flex-none py-5 mt-2 border-t-4 border-ungu3">
                    <p className="text-center text-white mb-3">Algoritma</p>
                    <form>
                        <input className="m-1 mb-5" type="radio" id="KMP" name="KMP" value="KMP" checked={algo === "KMP"} onChange={onOptionChange}/>
                        <label className="text-white" htmlFor="KMP">Knuth-Morris-Pratt (KMP)</label><br />
                        <input className="m-1" type="radio" id="BM" name="BM" value="BM" checked={algo === "BM"} onChange={onOptionChange}/>
                        <label className="text-white" htmlFor="BM">Boyer-Moore (BM)</label><br />
                    </form>
                </div>
            </div>
            <div className="flex-1 relative flex w-full h-full flex-row bg-ungu0">
                <div className='w-full overflow-auto scroll-smooth scrollbar-thin scrollbar-track-white scrollbar-thumb-ungu2 scrollbar-thumb-rounded-lg'>
                    {currSessionIdx === -1 ? 
                        <></> 
                        :
                        <ChatContainer
                        key={currSessionIdx}
                        messageList={sessionList[currSessionIdx].messageList} 
                        />
                    }
                    <div ref={bottomRef} />
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-ungu0 mt-5">
                    <div className="stretch mx-2 flex flex-row gap-3">
                        <div className="relative flex h-full flex-1 items-center md:flex-col">
                            <ChatInput currSessionIdx={currSessionIdx} addSession={addSession} pushUserMsgIdx={pushUserMsgIdx} setSentMessage={setSentMessage}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatManager;