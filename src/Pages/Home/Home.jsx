import { Box, Stack, Typography } from '@mui/material';
import Intial from '../../Components/Chatcard/Initialcard';
import ChatInput from '../../Components/Chatinput/Input';
import ChattingCard from '../../Components/Chattingcard/Chattingcard';
import FeedbackModal from '../../Components/Feedback/Feedback';
import { useEffect, useRef, useState } from 'react';
import data from '../../Data/SampleData.json'
import { useOutletContext } from "react-router-dom";
import Navbar from '../../Components/Navbar/Navbar';
import { ThemeContext } from '../theme/Themecontext';
import { useContext } from 'react';

export default function Home() {

    const [showModal, setShowModal] = useState(false)
    const listRef = useRef(null)
    const [chatId, setChatId] = useState(1)
    const [selectedChatId, setSelectedChatId] = useState(null)
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const { chat, setChat } = useOutletContext();
    const { mode } = useContext(ThemeContext)

    // GENERATING AI RESPONSE
    const generateResponse = (input) => {

        const response = data.find(item => input.toLowerCase() == item.question.toLowerCase())

        let answer = "Sorry, Did not understand your query!"

        if (response != undefined) {
            answer = response.response
        }

        setChat(prev => ([...prev,
        {
            type: 'Human',
            text: input,
            time: new Date(),
            id: chatId
        },
        {
            type: 'AI',
            text: answer,
            time: new Date(),
            id: chatId + 1
        }
        ]))

        setChatId(prev => prev + 2)

    }

    //AUTOSCROLL TO LAST ELEMENT
    useEffect(() => {
        listRef.current?.lastElementChild?.scrollIntoView()
    }, [scrollToBottom])

    return (
        <Stack
            height={'100vh'}
            justifyContent={'space-between'}
            sx={{
                '@media (max-width:767px)': {
                    background: mode == 'light' ? 'linear-gradient(#F9FAFA 60%, #EDE4FF)' : ''
                }
            }}
        >

            <Navbar />

            {chat.length == 0 && <Intial generateResponse={generateResponse} />}

            {chat.length > 0 && (
                <Stack
                    height={1}
                    flexGrow={0}
                    p={{ xs: 2, md: 3 }}
                    spacing={{ xs: 2, md: 3 }}
                    sx={{
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '10px',
                        },
                        '&::-webkit-scrollbar-track': {
                            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
                            borderRadius: '8px'
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: 'rgba(151, 133, 186,0.4)',
                            borderRadius: '8px'
                        }
                    }}
                    ref={listRef}
                >
                    {chat.map((item, index) => (
                        <ChattingCard
                            details={item}
                            key={index}
                            updateChat={setChat}
                            setSelectedChatId={setSelectedChatId}
                            showFeedbackModal={() => setShowModal(true)}
                        />
                    ))}
                </Stack>
            )}

            <ChatInput generateResponse={generateResponse} setScroll={setScrollToBottom} chat={chat} clearChat={() => setChat([])} />

            <FeedbackModal open={showModal} updateChat={setChat} chatId={selectedChatId} handleClose={() => setShowModal(false)} />
        </Stack>
    )
}