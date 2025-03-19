import React from 'react';
import { Button, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import ObjectGeneratorPage from '@/pages/examples/ObjectGeneratorPage';

export const ObjectGeneratorModal = ({
  context,
  id,
  innerProps,
  ...props
}: ContextModalProps<{ modalBody: string }>) => {
  console.log('modal: \n', context, '\n', id, '\n', innerProps, '\n', props);

  return (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <ObjectGeneratorPage />
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  );
};

export default ObjectGeneratorModal;
