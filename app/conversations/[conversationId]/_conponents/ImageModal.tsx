import Modal from '@/app/_components/Modal';
import Image from 'next/image';
import React from 'react'

interface ImageModalProps {
    isOpen?: boolean;
    onClose: () => void;
    src?: string | null;
}

const ImageModal = ({
    isOpen,
    onClose,
    src
}: ImageModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <div className='w-80 h-80'>
            <Image 
                alt='Imaga'
                className='object-cover'
                fill
                src={src!}
            />
        </div>
    </Modal>
  )
}

export default ImageModal
