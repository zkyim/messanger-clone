import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
    id: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    required?: boolean;
    type?: string;
    placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
    id,
    register,
    errors,
    required,
    type,
    placeholder,
}) => {
  return (
    <div className='relative w-full'>
        <input 
            id={id}
            type={type}
            autoComplete={id}
            {...register(id, {required})}
            placeholder={placeholder}
            className='text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none border-none'
        />
    </div>
  )
}

export default MessageInput
