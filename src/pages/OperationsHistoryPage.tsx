/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Input, SelectPicker, Table, Tag } from "rsuite";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getReceipts } from "../redux/slices/receiptsSlice";
import { getWriteOffs } from "../redux/slices/writeOffsSlice";
import { getProducts } from "../redux/slices/productsSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";

const { Column, HeaderCell, Cell } = Table;

type OperationRow = {
  id: string;
  originalId: number;
  type: "receipt" | "writeOff";
  typeLabel: string;
  productId: number;
  supplierId?: number;
  quantity: number;
  amount?: number;
  reason?: string;
  comment: string;
  date: string;
};

const OperationsHistoryPage = () => {
  const dispatch = useAppDispatch();

  const { receipts } = useAppSelector((state) => state.receiptsReducer);
  const { writeOffs } = useAppSelector((state) => state.writeOffsReducer);
  const { products } = useAppSelector((state) => state.productsReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getReceipts());
    dispatch(getWriteOffs());
    dispatch(getProducts());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getProductName = (productId: number) => {
    const product = products.find((item) => Number(item.id) === Number(productId));
    return product?.name || "Неизвестный товар";
  };

  const getSupplierName = (supplierId?: number) => {
    if (!supplierId) return "—";
    const supplier = suppliers.find((item) => Number(item.id) === Number(supplierId));
    return supplier?.name || "Неизвестный поставщик";
  };

  const operations: OperationRow[] = useMemo(() => {
    const mappedReceipts: OperationRow[] = receipts.map((item) => ({
      id: `receipt-${item.id}`,
      originalId: Number(item.id),
      type: "receipt",
      typeLabel: "Поступление",
      productId: Number(item.productId),
      supplierId: Number(item.supplierId),
      quantity: Number(item.quantity),
      amount: Number(item.totalAmount),
      comment: item.comment,
      date: item.date,
    }));

    const mappedWriteOffs: OperationRow[] = writeOffs.map((item) => ({
      id: `writeoff-${item.id}`,
      originalId: Number(item.id),
      type: "writeOff",
      typeLabel: "Списание",
      productId: Number(item.productId),
      quantity: Number(item.quantity),
      reason: item.reason,
      comment: item.comment,
      date: item.date,
    }));

    return [...mappedReceipts, ...mappedWriteOffs].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [receipts, writeOffs]);

  const filteredOperations = useMemo(() => {
    return operations.filter((item) => {
      const productName = getProductName(item.productId).toLowerCase();
      const supplierName = getSupplierName(item.supplierId).toLowerCase();
      const comment = String(item.comment || "").toLowerCase();
      const reason = String(item.reason || "").toLowerCase();
      const date = String(item.date || "").toLowerCase();
      const typeLabel = item.typeLabel.toLowerCase();
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        productName.includes(searchValue) ||
        supplierName.includes(searchValue) ||
        comment.includes(searchValue) ||
        reason.includes(searchValue) ||
        date.includes(searchValue) ||
        typeLabel.includes(searchValue);

      const matchesType = !typeFilter || item.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [operations, search, typeFilter]);

  const typeOptions = [
    { label: "Все операции", value: null },
    { label: "Поступления", value: "receipt" },
    { label: "Списания", value: "writeOff" },
  ];

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col gap-4">
        <div>
          <h2 className="text-3xl font-bold">История операций</h2>
          <p className="text-slate-400 mt-2">
            Общий журнал поступлений и списаний товаров на складе.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Поиск по товару, поставщику, комментарию, дате..."
            value={search}
            onChange={(value) => setSearch(value)}
          />

          <SelectPicker
            data={typeOptions}
            value={typeFilter}
            onChange={(value) => setTypeFilter(value as string | null)}
            style={{ width: "100%" }}
            placeholder="Фильтр по типу операции"
            cleanable
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <Table
          data={filteredOperations}
          autoHeight
          bordered
          cellBordered
          wordWrap="break-word"
          hover
        >
          <Column width={90} align="center" fixed>
            <HeaderCell>ID</HeaderCell>
            <Cell dataKey="originalId" />
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Тип операции</HeaderCell>
            <Cell>
              {(rowData: OperationRow) =>
                rowData.type === "receipt" ? (
                  <Tag color="green">Поступление</Tag>
                ) : (
                  <Tag color="orange">Списание</Tag>
                )
              }
            </Cell>
          </Column>

          <Column flexGrow={1.8} minWidth={240}>
            <HeaderCell>Товар</HeaderCell>
            <Cell>
              {(rowData: OperationRow) => getProductName(rowData.productId)}
            </Cell>
          </Column>

          <Column flexGrow={1.4} minWidth={220}>
            <HeaderCell>Поставщик</HeaderCell>
            <Cell>
              {(rowData: OperationRow) => getSupplierName(rowData.supplierId)}
            </Cell>
          </Column>

          <Column width={110} align="center">
            <HeaderCell>Кол-во</HeaderCell>
            <Cell dataKey="quantity" />
          </Column>

          <Column width={140} align="center">
            <HeaderCell>Сумма</HeaderCell>
            <Cell>
              {(rowData: OperationRow) =>
                rowData.type === "receipt" ? `${rowData.amount} сом` : "—"
              }
            </Cell>
          </Column>

          <Column flexGrow={1.2} minWidth={180}>
            <HeaderCell>Причина</HeaderCell>
            <Cell>
              {(rowData: OperationRow) => rowData.reason || "—"}
            </Cell>
          </Column>

          <Column flexGrow={1.6} minWidth={240}>
            <HeaderCell>Комментарий</HeaderCell>
            <Cell dataKey="comment" />
          </Column>

          <Column width={150} align="center">
            <HeaderCell>Дата</HeaderCell>
            <Cell dataKey="date" />
          </Column>
        </Table>
      </div>
    </div>
  );
};

export default OperationsHistoryPage;
