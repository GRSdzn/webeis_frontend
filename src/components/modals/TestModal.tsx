import { Button, Text } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";

export const TestModal = ({
    context,
    id,
    innerProps,
  }: ContextModalProps<{ modalBody: string }>) => (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button fullWidth mt="md" onClick={() => context.closeModal(id)}>
        Close modal
      </Button>
    </>
  );