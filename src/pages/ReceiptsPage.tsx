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
import { Inbox } from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  Receipt,
  createReceipt,
  getReceipts,
} from "../redux/slices/receiptsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;
const { NumberType, StringType } = Schema.Types;

const model = Schema.Model({
  productId: NumberType().isRequired("Выберите товар"),
  supplierId: NumberType().isRequired("Выберите поставщика"),
  quantity: NumberType("Количество должно быть числом")
    .isRequired("Укажите количество")
    .min(1, "Количество должно быть больше 0"),
  price: NumberType("Цена должна быть числом")
    .isRequired("Укажите цену")
    .min(0, "Цена не может быть отрицательной"),
  date: StringType().isRequired("Укажите дату"),
  comment: StringType().isRequired("Укажите комментарий"),
});

const ReceiptModalForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [formValue, setFormValue] = useState<Partial<Receipt>>({
    productId: undefined,
    supplierId: undefined,
    quantity: 1,
    price: 0,
    totalAmount: 0,
    date: new Date().toISOString().split("T")[0],
    comment: "",
  });

  useEffect(() => {
    if (open) {
      setFormValue({
        productId: undefined,
        supplierId: undefined,
        quantity: 1,
        price: 0,
        totalAmount: 0,
        date: new Date().toISOString().split("T")[0],
        comment: "",
      });
    }
  }, [open]);

  const productOptions = products.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const supplierOptions = suppliers.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const handleChange = (value: Partial<Receipt>) => {
    const quantity = Number(value.quantity || 0);
    const price = Number(value.price || 0);

    setFormValue({
      ...value,
      totalAmount: quantity * price,
    });
  };

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Receipt = {
      productId: Number(formValue.productId),
      supplierId: Number(formValue.supplierId),
      quantity: Number(formValue.quantity),
      price: Number(formValue.price),
      totalAmount: Number(formValue.quantity) * Number(formValue.price),
      date: String(formValue.date),
      comment: String(formValue.comment || "").trim(),
    };

    dispatch(createReceipt(payload));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm" className="product-dark-modal">
      <Modal.Header>
        <Modal.Title>Добавить поступление</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => handleChange(value as Partial<Receipt>)}
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
            <Form.ControlLabel style={{ color: "white" }}>Поставщик</Form.ControlLabel>
            <SelectPicker
              data={supplierOptions}
              value={formValue.supplierId as number}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  supplierId: Number(value),
                }))
              }
              style={{ width: "100%" }}
              placeholder="Выберите поставщика"
              cleanable={false}
            />
          </Form.Group>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Количество</Form.ControlLabel>
              <Form.Control name="quantity" accepter={Input} type="number" min={1} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel style={{ color: "white" }}>Цена за единицу</Form.ControlLabel>
              <Form.Control name="price" accepter={Input} type="number" min={0} />
            </Form.Group>
          </div>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Дата</Form.ControlLabel>
            <Form.Control name="date" accepter={Input} type="date" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Комментарий</Form.ControlLabel>
            <Form.Control name="comment" accepter={Input} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel style={{ color: "white" }}>Итоговая сумма</Form.ControlLabel>
            <Input
              value={String(
                Number(formValue.quantity || 0) * Number(formValue.price || 0)
              )}
              readOnly
            />
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

const ReceiptsPage = () => {
  const dispatch = useAppDispatch();

  const { receipts, isLoading, error } = useAppSelector(
    (state) => state.receiptsReducer
  );
  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Receipt | null>(null);

  useEffect(() => {
    dispatch(getReceipts());
    dispatch(getProducts());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getProductName = (productId: number) => {
    const product = products.find((item) => Number(item.id) === Number(productId));
    return product?.name || "Неизвестный товар";
  };

  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find((item) => Number(item.id) === Number(supplierId));
    return supplier?.name || "Неизвестный поставщик";
  };

  const handleAdd = () => {
    setShowModal(true);
  };

  const handleDelete = (receipt: Receipt) => {
    setDeleteTarget(receipt);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Поступления</h2>
          <p className="text-slate-400 mt-2">
            Учет поступлений товаров на склад с автоматическим увеличением остатков.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          onClick={handleAdd}
          className="!rounded-xl"
          startIcon={<Inbox size={18} />}
        >
          Добавить поступление
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка поступлений...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={receipts}
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

            <Column flexGrow={1.7} minWidth={240}>
              <HeaderCell>Товар</HeaderCell>
              <Cell>
                {(rowData: Receipt) => getProductName(rowData.productId)}
              </Cell>
            </Column>

            <Column flexGrow={1.4} minWidth={220}>
              <HeaderCell>Поставщик</HeaderCell>
              <Cell>
                {(rowData: Receipt) => getSupplierName(rowData.supplierId)}
              </Cell>
            </Column>

            <Column width={110} align="center">
              <HeaderCell>Кол-во</HeaderCell>
              <Cell dataKey="quantity" />
            </Column>

            <Column width={130} align="center">
              <HeaderCell>Цена</HeaderCell>
              <Cell>
                {(rowData: Receipt) => `${rowData.price} сом`}
              </Cell>
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Сумма</HeaderCell>
              <Cell>
                {(rowData: Receipt) => `${rowData.totalAmount} сом`}
              </Cell>
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Дата</HeaderCell>
              <Cell dataKey="date" />
            </Column>

            <Column flexGrow={1.5} minWidth={220}>
              <HeaderCell>Комментарий</HeaderCell>
              <Cell dataKey="comment" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: Receipt) => (
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

      <ReceiptModalForm
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      />

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteReceipt"
        title="Удалить поступление"
        message={`Вы уверены, что хотите удалить поступление #${deleteTarget?.id}?`}
      />
    </div>
  );
};

export default ReceiptsPage;
