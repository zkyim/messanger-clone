"use client";
import React from 'react'
import useConversation from '../hooks/useConversation'
import EmptyState from '../_components/EmptyState';
import clsx from 'clsx';

const ConversationsPage = () => {
    const {isOpen} = useConversation();

  return (
    <div
        className={clsx("lg:pl-80 h-full lg:block", isOpen ? 'block' : 'hidden')}
    >
        <EmptyState />
    </div>
  )
}

export default ConversationsPage
