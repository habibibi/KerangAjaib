import React, {useState} from "react";
import { MdSend } from 'react-icons/md';

function ChatInput({pushUserMsgIdx, currSessionIdx, addSession, setSentMessage}) {
    const [chatInputText, setChatInputText] = useState('');

    function onClickPush() {
        if (chatInputText !== '') {
            if (currSessionIdx === -1){
                addSession(chatInputText);
            } else {
                pushUserMsgIdx(currSessionIdx,chatInputText);
                setSentMessage(chatInputText);
            }
            setChatInputText('');
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
          onClickPush();
        }
      }

    return (
        <div className='relative my-5 w-[45rem]'>
            <input 
                className="m-0 w-full resize-none border-0 outline-ungu2 p-0 py-2 pr-8 pl-3 text-black"
                type='text' 
                value={chatInputText} 
                placeholder='Type a message...' 
                onKeyDown={handleKeyDown}
                onChange={e => setChatInputText(e.target.value)}
            />
            <div className="absolute right-0 top-[13px] right-[10px]">
            <MdSend className="text-ungu2 hover:text-ungu3 active:text-ungu1  cursor-pointer" onClick={onClickPush}/>
            </div>
        </div>
    )
}

export default ChatInput;