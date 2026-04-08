/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Schema,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { Truck } from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Supplier,
  createSupplier,
  getSuppliers,
  updateSupplier,
} from "../redux/slices/suppliersSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название поставщика"),
  contactPerson: StringType().isRequired("Укажите контактное лицо"),
  phone: StringType().isRequired("Укажите номер телефона"),
  email: StringType()
    .isEmail("Введите корректный email")
    .isRequired("Укажите email"),
  address: StringType().isRequired("Укажите адрес"),
});

const SupplierModalForm = ({
  open,
  onClose,
  supplierData,
}: {
  open: boolean;
  onClose: () => void;
  supplierData: Supplier | null;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const [formValue, setFormValue] = useState<Partial<Supplier>>({
    name: "",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (supplierData) {
      setFormValue({
        name: supplierData.name,
        contactPerson: supplierData.contactPerson,
        phone: supplierData.phone,
        email: supplierData.email,
        address: supplierData.address,
      });
    } else {
      setFormValue({
        name: "",
        contactPerson: "",
        phone: "",
        email: "",
        address: "",
      });
    }
  }, [supplierData, open]);

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Supplier = {
      name: String(formValue.name || "").trim(),
      contactPerson: String(formValue.contactPerson || "").trim(),
      phone: String(formValue.phone || "").trim(),
      email: String(formValue.email || "").trim(),
      address: String(formValue.address || "").trim(),
    };

    if (supplierData?.id) {
      dispatch(
        updateSupplier({
          id: Number(supplierData.id),
          updatedData: payload,
        })
      );
    } else {
      dispatch(createSupplier(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" className="product-dark-modal">
      <Modal.Header>
        <Modal.Title>
          {supplierData ? "Редактировать поставщика" : "Добавить поставщика"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as Partial<Supplier>)}
          className="rs-dark-form"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Название поставщика</Form.ControlLabel>
              <Form.Control name="name" accepter={Input} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Контактное лицо</Form.ControlLabel>
              <Form.Control name="contactPerson" accepter={Input} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Телефон</Form.ControlLabel>
              <Form.Control name="phone" accepter={Input} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Email</Form.ControlLabel>
              <Form.Control name="email" accepter={Input} />
            </Form.Group>
          </div>

          <Form.Group className="mt-2">
            <Form.ControlLabel style={{ color: "white" }}>Адрес</Form.ControlLabel>
            <Form.Control name="address" accepter={Input} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button appearance="subtle" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            {supplierData ? "Сохранить" : "Добавить"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const SuppliersPage = () => {
  const dispatch = useAppDispatch();
  const { suppliers, isLoading, error } = useAppSelector(
    (state) => state.suppliersReducer
  );

  const [showModal, setShowModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleAdd = () => {
    setEditSupplier(null);
    setShowModal(true);
  };

  const handleEdit = (supplier: Supplier) => {
    setEditSupplier(supplier);
    setShowModal(true);
  };

  const handleDelete = (supplier: Supplier) => {
    setDeleteTarget(supplier);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Поставщики</h2>
          <p className="text-slate-400 mt-2">
            Управление поставщиками, их контактными данными и адресами.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          onClick={handleAdd}
          className="!rounded-xl"
          startIcon={<Truck size={18} />}
        >
          Добавить поставщика
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка поставщиков...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={suppliers}
            autoHeight
            bordered
            cellBordered
            wordWrap="break-word"
            hover
          >
            <Column width={90} align="center" fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column flexGrow={1.4} minWidth={220}>
              <HeaderCell>Название</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={1.2} minWidth={180}>
              <HeaderCell>Контактное лицо</HeaderCell>
              <Cell dataKey="contactPerson" />
            </Column>

            <Column flexGrow={1.1} minWidth={160}>
              <HeaderCell>Телефон</HeaderCell>
              <Cell dataKey="phone" />
            </Column>

            <Column flexGrow={1.4} minWidth={220}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column flexGrow={1.8} minWidth={260}>
              <HeaderCell>Адрес</HeaderCell>
              <Cell dataKey="address" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: Supplier) => (
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

      <SupplierModalForm
        open={showModal}
        onClose={() => {
          setEditSupplier(null);
          setShowModal(false);
        }}
        supplierData={editSupplier}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteSupplier"
        title="Удалить поставщика"
        message={`Вы уверены, что хотите удалить поставщика "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default SuppliersPage;
