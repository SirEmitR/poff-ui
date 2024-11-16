'use client'
import { createContext, useCallback, useContext, useState } from 'react';
import Sending from '../experience/sending';

const SendingContext = createContext();

export const useSending = () => useContext(SendingContext);

export const SendingProvider = ({ children }) => {
    const [sending, setSending] = useState(false);
    const [position, setPosition] = useState('top');

    const showSender = useCallback((position = 'top') => setSending(true), [])

    const hideSender = () => setSending(false);

    return(
        <SendingContext.Provider value={{showSender, hideSender, isSending: sending}}>
            <Sending visible={sending} position={position} />
            {children}
        </SendingContext.Provider>
    )
}