import React, { useState } from 'react';
import './App.css';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ChatManager from './components/chatmanager.js';
function App() {
	const [messageInputValue, setMessageInputValue] = useState("");
	return (
		<div className="App">
      		<ChatManager />
		</div>
	);
}

export default App;
