import React from 'react';
import { Modal, Button } from 'rsuite';
import { useAppDispatch } from '../hooks/hooks';
import { deleteBooking } from '../redux/slices/bookingsSlice';
import { deleteRoom } from '../redux/slices/roomsSlice';
import { deleteReview } from '../redux/slices/reviewsSlice';

// Типы для пропсов
interface DeleteModalProps {
  deleteFunc: string; // предполагаем, что id — строка
  open: boolean;
  onClose: () => void;
  id: string; // id должно быть строкой
}

const DeleteModal: React.FC<DeleteModalProps> = ({ deleteFunc, open, onClose, id }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (deleteFunc === 'deleteBooking') dispatch(deleteBooking(Number(id)));
    else if (deleteFunc === 'deleteRoom') dispatch(deleteRoom(Number(id)));
    else if (deleteFunc === 'deleteReview') dispatch(deleteReview(Number(id)));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs">
      <Modal.Header>
        <Modal.Title>Удалить запись</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить это?</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleDelete} appearance="primary" color="red">
          Удалить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
