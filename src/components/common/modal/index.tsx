// CustomModal.tsx
import React from 'react';
import { Modal } from '@mantine/core';

type CustomModalProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

const CustomModal: React.FC<CustomModalProps> = ({ opened, onClose, title, children }) => {
  return (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      {children}
    </Modal>
  );
};

export default CustomModal;
