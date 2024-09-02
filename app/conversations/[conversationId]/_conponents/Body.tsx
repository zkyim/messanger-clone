"use client"
import useConversation from '@/app/hooks/useConversation';
import { FullMessageType } from '@/app/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox';
import axios from 'axios';
import { pusherClient } from '@/app/libs/pusher';
import {find} from "lodash"

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({
  initialMessages
}) => {
  const [messages, setMessages] = useState(initialMessages)
  const buttonRef = useRef<HTMLDivElement>(null);

  const {conversationId} = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId)
    buttonRef?.current?.scrollIntoView();

    const messageHandler = (messages: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`)
      setMessages((current) => {
        if (find(current, {id: messages.id})) return current;
        return [...current, messages];
      });

    }

    const updateMessageHandler =  (newMessage: FullMessageType) => {
      setMessages((current) => current.map(currentMessage => {
        if (currentMessage.id === newMessage.id) return newMessage;
        return currentMessage;
      }));
    }

    pusherClient.bind('message:new', messageHandler);
    pusherClient.bind('message:update', updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind('message:new', messageHandler);
      pusherClient.unbind('message:update', updateMessageHandler);
    }
  }, [conversationId]);

  return (
    <div className='flex-1 overflow-y-auto'>
      {messages.map((message, i) => (
        <MessageBox
          key={message.id}
          isLast={i === messages.length - 1}
          data={message}
        />
      ))}
      <div ref={buttonRef} className='pt-24' />
    </div>
  )
}

export default Body
