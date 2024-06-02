import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useMediaQuery } from 'react-responsive';
import ChatContainer from './chatcontainer.js';
import SessionList from './sessionlist.js';
import ChatInput from './chatinput.js';
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
    this.pushMessage = function (sender, text) {
        this.messageList.push(new message(sender, this.profileType, text));
    }
}

function ChatManager() {
    const [sessionList, setSessionList] = useState([]);
    const [currSessionIdx, setCurrSessionIdx] = useState(-1);
    const [sentMessage, setSentMessage] = useState('');
    const [algo, setAlgo] = useState("KMP");
    const [isLoading, setIsLoading] = useState(true);
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    async function pushUserMsgIdx(idx, text) {
        const tmp = sessionList.slice();
        tmp[idx].pushMessage("user", text);
        setSessionList(tmp);
    }

    async function fetchSessionMsg() {
        try {
            const response = await axios.get("/api/session/messages");
            const data = response.data;
            console.log(data);
            const arr = [];
            for (let i = 0; i < data.length; i++) {
                const id = data[i]._id;
                const name = data[i].name;
                const tmp = new session(id, name);
                for (let j = 0; j < data[i].messages.length; j++) {
                    const sender = data[i].messages[j].sender;
                    const text = data[i].messages[j].text;
                    tmp.pushMessage(sender, text);
                }
                arr.push(tmp);
            }
            setSessionList(arr);
            setIsLoading(false);
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }


    function handleSideBarButtonClick() {
        setIsSideBarOpen(!isSideBarOpen);
    }

    useEffect(() => {
        fetchSessionMsg();
    }, [])

    useEffect(() => {
        async function pushUserMsg() {
            try {
                if (sentMessage === '') return;
                const tmp = sessionList.slice();
                const response = await axios.post("/api/query", { query: sentMessage, sessionID: tmp[currSessionIdx].id, algo: algo });
                tmp[currSessionIdx].pushMessage("bot", response.data.answer);
                setSessionList(tmp);
                setSentMessage('');
            } catch (err) {
                console.log(err);
            }
        }
        pushUserMsg();
    }, [sentMessage, algo, currSessionIdx, sessionList])

    async function addSession(firstMessage) {
        const tmp = sessionList.slice();
        const response = await axios.post("/api/session", { name: "New Session" });
        const id = response.data.sessionID;
        tmp.push(new session(id, "New Session"));
        tmp[tmp.length - 1].pushMessage("user", firstMessage);
        setCurrSessionIdx(tmp.length - 1);
        setSessionList(tmp);
        setSentMessage(firstMessage);
    }

    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [sessionList, currSessionIdx]);

    const onOptionChange = e => {
        setAlgo(e.target.value)
    }

    const isMdOrLarger = useMediaQuery({ minWidth: 768 }); // Adjust this value according to your Tailwind configuration


    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-ungu0">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-ungu3"></div>
                    <p className="text-black text-xl mt-5">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className='flex h-full w-full'>
            {isMdOrLarger ?
                <></> :
                <div className={`fixed z-10 h-full w-full bg-black black-overlay ${isSideBarOpen ? 'black-overlay-enable' : 'black-overlay-disable'}`} onClick={handleSideBarButtonClick}></div>
            }
            <div className={`flex max-md:fixed sidebar ${isSideBarOpen ? 'sidebar-visible ' : 'sidebar-hidden'} z-10 flex-none flex-col w-[260px] p-2 bg-ungu4 h-full`}>
                {isMdOrLarger ?
                    <></> :
                    <button className={`absolute right-[-37px] bg-ungu0 p-1 rounded-md border-ungu2 border-2 shadow-md" onClick={handleSideBarButtonClick} ${isSideBarOpen ? 'rotate-720' : 'rotate-0'}`} onClick={handleSideBarButtonClick}>
                        <FaBars className="text-ungu3 w-5 h-5" />
                    </button>
                }
                <div className="flex-1">
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
                        <input className="m-1 mb-5" type="radio" id="KMP" name="KMP" value="KMP" checked={algo === "KMP"} onChange={onOptionChange} />
                        <label className="text-white" htmlFor="KMP">Knuth-Morris-Pratt (KMP)</label><br />
                        <input className="m-1" type="radio" id="BM" name="BM" value="BM" checked={algo === "BM"} onChange={onOptionChange} />
                        <label className="text-white" htmlFor="BM">Boyer-Moore (BM)</label><br />
                    </form>
                </div>
            </div>
            <div className="flex-1 relative flex h-full flex-row bg-ungu0">
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
                            {currSessionIdx === -1 ? 
                                <div className="relative bottom-0 text-ungu2 text-center">
                                    <p>Command Help:</p>
                                    <ul>
                                        <li>Add/update question: "tambahkan pertanyaan [pertanyaan] dengan jawaban [jawaban]"</li>
                                        <li>Delete question: "hapus pertanyaan [pertanyaan]"</li>
                                        <li>Math question: tambahkan persamaan matematika pada pesan text </li>
                                        <li>Date question: tambahkan format tanggal dd/mm/yyyy pada pesan text </li>
                                    </ul>
                                </div>
                                :
                                <></>
                            }
                            <ChatInput currSessionIdx={currSessionIdx} addSession={addSession} pushUserMsgIdx={pushUserMsgIdx} setSentMessage={setSentMessage}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChatManager;