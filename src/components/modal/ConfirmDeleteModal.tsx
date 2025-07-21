import { Modal, Text, Button, Group, Box, Center, Alert } from '@mantine/core'
import { IconAlertCircle, IconTrash } from '@tabler/icons-react'

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  isLoading?: boolean
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Deletion',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading = false,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={title}
      centered
      size="sm"
      radius="md"
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <Box>
        <Center mb="lg">
          <Alert
            variant="light"
            color="red"
            title="Warning"
            icon={<IconAlertCircle size={24} />}
            w="100%"
          >
            {description}
          </Alert>
        </Center>

        <Text size="sm" mb="xl" c="dimmed">
          This action is permanent and cannot be reversed.
        </Text>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={onClose} disabled={isLoading}>
            {cancelText}
          </Button>
          <Button
            color="red"
            leftSection={<IconTrash size={18} />}
            onClick={onConfirm}
            loading={isLoading}
          >
            {confirmText}
          </Button>
        </Group>
      </Box>
    </Modal>
  )
}
