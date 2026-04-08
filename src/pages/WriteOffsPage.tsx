/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Schema,
  SelectPicker,
  Table,
  Tooltip,
  Whisper,
} from "rsuite";
import { MdDeleteOutline } from "react-icons/md";
import { PackageMinus } from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  WriteOff,
  createWriteOff,
  getWriteOffs,
} from "../redux/slices/writeOffsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import DeleteModal from "../components/deleteModal";
const { Column, HeaderCell, Cell } = Table;
const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
  productId: NumberType().isRequired("Выберите товар"),
  quantity: NumberType("Количество должно быть числом")
    .isRequired("Укажите количество")
    .min(1, "Количество должно быть больше 0"),
  reason: StringType().isRequired("Укажите причину списания"),
  date: StringType().isRequired("Укажите дату"),
  comment: StringType().isRequired("Укажите комментарий"),
});

const WriteOffModalForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const { products } = useAppSelector((state) => state.productsReducer);

  const [formValue, setFormValue] = useState<Partial<WriteOff>>({
    productId: undefined,
    quantity: 1,
    reason: "",
    date: new Date().toISOString().split("T")[0],
    comment: "",
  });

  useEffect(() => {
    if (open) {
      setFormValue({
        productId: undefined,
        quantity: 1,
        reason: "",
        date: new Date().toISOString().split("T")[0],
        comment: "",
      });
    }
  }, [open]);

  const productOptions = products.map((item) => ({
    label: `${item.name} (остаток: ${item.quantity})`,
    value: Number(item.id),
  }));

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: WriteOff = {
      productId: Number(formValue.productId),
      quantity: Number(formValue.quantity),
      reason: String(formValue.reason || "").trim(),
      date: String(formValue.date),
      comment: String(formValue.comment || "").trim(),
    };

    dispatch(createWriteOff(payload));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" className="product-dark-modal">
      <Modal.Header>
        <Modal.Title>Добавить списание</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as Partial<WriteOff>)}
          className="rs-dark-form"
        >
          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Товар</Form.ControlLabel>
            <SelectPicker
              data={productOptions}
              value={formValue.productId as number}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  productId: Number(value),
                }))
              }
              style={{ width: "100%" }}
              placeholder="Выберите товар"
              cleanable={false}
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Количество</Form.ControlLabel>
            <Form.Control name="quantity" accepter={Input} type="number" min={1} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Причина списания</Form.ControlLabel>
            <Form.Control name="reason" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Дата</Form.ControlLabel>
            <Form.Control name="date" accepter={Input} type="date" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Комментарий</Form.ControlLabel>
            <Form.Control name="comment" accepter={Input} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button appearance="subtle" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            Добавить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

const WriteOffsPage = () => {
  const dispatch = useAppDispatch();

  const { writeOffs, isLoading, error } = useAppSelector(
    (state) => state.writeOffsReducer
  );
  const { products } = useAppSelector((state) => state.productsReducer);

  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<WriteOff | null>(null);

  useEffect(() => {
    dispatch(getWriteOffs());
    dispatch(getProducts());
  }, [dispatch]);

  const getProductName = (productId: number) => {
    const product = products.find((item) => Number(item.id) === Number(productId));
    return product?.name || "Неизвестный товар";
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleDelete = (writeOff: WriteOff) => {
    setDeleteTarget(writeOff);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Списания</h2>
          <p className="text-slate-400 mt-2">
            Учет списаний товаров со склада с автоматическим уменьшением остатков.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          onClick={handleAdd}
          className="!rounded-xl"
          startIcon={<PackageMinus size={18} />}
        >
          Добавить списание
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка списаний...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={writeOffs}
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

            <Column flexGrow={1.8} minWidth={260}>
              <HeaderCell>Товар</HeaderCell>
              <Cell>
                {(rowData: WriteOff) => getProductName(rowData.productId)}
              </Cell>
            </Column>

            <Column width={120} align="center">
              <HeaderCell>Кол-во</HeaderCell>
              <Cell dataKey="quantity" />
            </Column>

            <Column flexGrow={1.2} minWidth={180}>
              <HeaderCell>Причина</HeaderCell>
              <Cell dataKey="reason" />
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Дата</HeaderCell>
              <Cell dataKey="date" />
            </Column>

            <Column flexGrow={1.8} minWidth={260}>
              <HeaderCell>Комментарий</HeaderCell>
              <Cell dataKey="comment" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: WriteOff) => (
                  <div className="flex items-center justify-center gap-2 pt-2">
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

      <WriteOffModalForm
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteWriteOff"
        title="Удалить списание"
        message={`Вы уверены, что хотите удалить списание #${deleteTarget?.id}?`}
      />
    </div>
  );
};

export default WriteOffsPage;
