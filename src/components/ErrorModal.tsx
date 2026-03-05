/// internal dependencies.

// components.

import Modal from '@/components/Modal'

/// component.

export default function ErrorModal({
  error,

  onClose,
}: {
  error: string

  onClose: () => void
}) {
  return <Modal
    title  ='error.'
    onClose={onClose}
  >
    <p>{error}</p>
  </Modal>
}