/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Schema, Table, Tooltip, Whisper } from "rsuite";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { FolderPlus } from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Category,
  createCategory,
  getCategories,
  updateCategory,
} from "../redux/slices/categoriesSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название категории"),
});

const CategoryModalForm = ({
  open,
  onClose,
  categoryData,
}: {
  open: boolean;
  onClose: () => void;
  categoryData: Category | null;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<Partial<Category>>({ name: "" });

  useEffect(() => {
    if (categoryData) {
      setFormValue({ name: categoryData.name });
    } else {
      setFormValue({ name: "" });
    }
  }, [categoryData, open]);

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Category = {
      name: String(formValue.name || "").trim(),
    };

    if (categoryData?.id) {
      dispatch(
        updateCategory({
          id: Number(categoryData.id),
          updatedData: payload,
        })
      );
    } else {
      dispatch(createCategory(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="xs" className="product-dark-modal">
      <Modal.Header>
        <Modal.Title>
          {categoryData ? "Редактировать категорию" : "Добавить категорию"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as Partial<Category>)}
          className="rs-dark-form"
        >
          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Название категории</Form.ControlLabel>
            <Form.Control name="name" accepter={Input} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button appearance="subtle" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            {categoryData ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const CategoriesPage = () => {
  const dispatch = useAppDispatch();
  const { categories, isLoading, error } = useAppSelector(
    (state) => state.categoriesReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleDelete = (category: Category) => {
    setDeleteTarget(category);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Категории</h2>
          <p className="text-slate-400 mt-2">
            Управление категориями товаров в системе складского учета.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          onClick={handleAdd}
          className="!rounded-xl"
          startIcon={<FolderPlus size={18} />}
        >
          Добавить категорию
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка категорий...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={categories}
            autoHeight
            bordered
            cellBordered
            wordWrap="break-word"
            hover
          >
            <Column width={100} align="center" fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1}>
              <HeaderCell>Название категории</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: Category) => (
                  <div className="flex items-center justify-center gap-2 pt-2">
                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Редактировать</Tooltip>}
                    >
                      <Button
                        appearance="subtle"
                        onClick={() => handleEdit(rowData)}
                      >
                        <MdEdit color="#22c55e" size={20} />
                      </Button>
                    </Whisper>

                    <Whisper
                      placement="top"
                      trigger="hover"
                      speaker={<Tooltip>Удалить</Tooltip>}
                    >
                      <Button
                        appearance="subtle"
                        onClick={() => handleDelete(rowData)}
                      >
                        <MdDeleteOutline color="#ef4444" size={20} />
                      </Button>
                    </Whisper>
                  </div>
                )}
              </Cell>
            </Column>
          </Table>
        </div>
      )}

      <CategoryModalForm
        open={showModal}
        onClose={() => {
          setEditCategory(null);
          setShowModal(false);
        }}
        categoryData={editCategory}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteCategory"
        title="Удалить категорию"
        message={`Вы уверены, что хотите удалить категорию "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default CategoriesPage;
