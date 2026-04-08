import React from "react";
import { Modal, Button } from "rsuite";
import { useAppDispatch } from "../hooks/hooks";
import { deleteProduct } from "../redux/slices/productsSlice";
import { deleteCategory } from "../redux/slices/categoriesSlice";
import { deleteSupplier } from "../redux/slices/suppliersSlice";
import { deleteReceipt } from "../redux/slices/receiptsSlice";
import { deleteWriteOff } from "../redux/slices/writeOffsSlice";
import { deleteFeedback } from "../redux/slices/feedbackSlice";

interface DeleteModalProps {
  deleteFunc:
  | "deleteProduct"
  | "deleteCategory"
  | "deleteSupplier"
  | "deleteReceipt"
  | "deleteWriteOff"
  | "deleteFeedback";
  open: boolean;
  onClose: () => void;
  id: string;
  title?: string;
  message?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  deleteFunc,
  open,
  onClose,
  id,
  title = "Удалить запись",
  message = "Вы уверены, что хотите удалить этот элемент?",
}) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (deleteFunc === "deleteProduct") {
      dispatch(deleteProduct(Number(id)));
    } else if (deleteFunc === "deleteCategory") {
      dispatch(deleteCategory(Number(id)));
    } else if (deleteFunc === "deleteSupplier") {
      dispatch(deleteSupplier(Number(id)));
    } else if (deleteFunc === "deleteReceipt") {
      dispatch(deleteReceipt(Number(id)));
    } else if (deleteFunc === "deleteWriteOff") {
      dispatch(deleteWriteOff(Number(id)));
    } else if (deleteFunc === "deleteFeedback") {
      dispatch(deleteFeedback(Number(id)));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs" className="product-dark-modal">
      <Modal.Header>
        <Modal.Title color="white">{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-slate-300">{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button onClick={onClose} appearance="primary" color="yellow">
            Отмена
          </Button>
          <Button onClick={handleDelete} appearance="primary" color="red">
            Удалить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
