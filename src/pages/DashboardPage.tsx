import { useEffect } from "react";
import { Panel, Table, Tag } from "rsuite";
import {
  Package,
  Tags,
  Truck,
  Inbox,
  ArrowUpDown,
  MessageSquare,
  AlertTriangle,
  Warehouse,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProducts } from "../redux/slices/productsSlice";
import { getCategories } from "../redux/slices/categoriesSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import { getReceipts } from "../redux/slices/receiptsSlice";
import { getWriteOffs } from "../redux/slices/writeOffsSlice";
import { getFeedback } from "../redux/slices/feedbackSlice";

const { Column, HeaderCell, Cell } = Table;

const statCards = [
  {
    title: "Товары",
    key: "products",
    icon: <Package className="w-6 h-6 text-cyan-400" />,
    bg: "from-cyan-500/10 to-cyan-400/5",
    border: "border-cyan-500/20",
  },
  {
    title: "Категории",
    key: "categories",
    icon: <Tags className="w-6 h-6 text-violet-400" />,
    bg: "from-violet-500/10 to-violet-400/5",
    border: "border-violet-500/20",
  },
  {
    title: "Поставщики",
    key: "suppliers",
    icon: <Truck className="w-6 h-6 text-emerald-400" />,
    bg: "from-emerald-500/10 to-emerald-400/5",
    border: "border-emerald-500/20",
  },
  {
    title: "Поступления",
    key: "receipts",
    icon: <Inbox className="w-6 h-6 text-blue-400" />,
    bg: "from-blue-500/10 to-blue-400/5",
    border: "border-blue-500/20",
  },
  {
    title: "Списания",
    key: "writeOffs",
    icon: <ArrowUpDown className="w-6 h-6 text-amber-400" />,
    bg: "from-amber-500/10 to-amber-400/5",
    border: "border-amber-500/20",
  },
  {
    title: "Сообщения",
    key: "feedback",
    icon: <MessageSquare className="w-6 h-6 text-pink-400" />,
    bg: "from-pink-500/10 to-pink-400/5",
    border: "border-pink-500/20",
  },
];

const DashboardPage = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading: productsLoading } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);
  const { receipts } = useAppSelector((state) => state.receiptsReducer);
  const { writeOffs } = useAppSelector((state) => state.writeOffsReducer);
  const { feedback } = useAppSelector((state) => state.feedbackReducer);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSuppliers());
    dispatch(getReceipts());
    dispatch(getWriteOffs());
    dispatch(getFeedback());
  }, [dispatch]);

  const lowStockProducts = products.filter(
    (item) => Number(item.quantity) <= Number(item.minStock)
  );

  const statsMap: Record<string, number> = {
    products: products.length,
    categories: categories.length,
    suppliers: suppliers.length,
    receipts: receipts.length,
    writeOffs: writeOffs.length,
    feedback: feedback.length,
  };

  const latestReceipts = [...receipts].slice(-5).reverse();
  const latestWriteOffs = [...writeOffs].slice(-5).reverse();

  return (
    <div className="text-white">
      <div className="mb-8 flex flex-col gap-3">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
          <Warehouse className="w-4 h-4" />
          Панель управления складом
        </div>

        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="text-slate-400 max-w-3xl">
          Здесь отображается основная информация о товарах, поступлениях,
          списаниях, поставщиках и сообщениях. Панель помогает быстро оценить
          текущее состояние складской системы.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
        {statCards.map((card) => (
          <div
            key={card.key}
            className={`rounded-3xl border ${card.border} bg-gradient-to-br ${card.bg} p-6 shadow-sm`}
          >
            <div className="flex items-center justify-between">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/70 border border-slate-700">
                {card.icon}
              </div>
              <span className="text-slate-400 text-sm">Всего</span>
            </div>

            <div className="mt-6">
              <h3 className="text-slate-300 text-sm">{card.title}</h3>
              <p className="mt-2 text-3xl font-bold">
                {statsMap[card.key] ?? 0}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <div className="flex items-center gap-3 mb-5">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="text-xl font-semibold">Товары с низким остатком</h3>
          </div>

          {productsLoading ? (
            <p className="text-slate-400">Загрузка данных...</p>
          ) : lowStockProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
              Все товары имеют достаточный остаток.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <Table
                data={lowStockProducts}
                autoHeight
                bordered
                cellBordered
                wordWrap="break-word"
                className="bg-slate-950"
              >
                <Column width={80} align="center">
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1.4}>
                  <HeaderCell>Название</HeaderCell>
                  <Cell dataKey="name" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Артикул</HeaderCell>
                  <Cell dataKey="article" />
                </Column>

                <Column width={120} align="center">
                  <HeaderCell>Остаток</HeaderCell>
                  <Cell>
                    {(rowData) => (
                      <span className="text-amber-400 font-semibold">
                        {rowData.quantity}
                      </span>
                    )}
                  </Cell>
                </Column>

                <Column width={160} align="center">
                  <HeaderCell>Мин. остаток</HeaderCell>
                  <Cell dataKey="minStock" />
                </Column>

                <Column width={180} align="center">
                  <HeaderCell>Статус</HeaderCell>
                  <Cell>
                    {(rowData) =>
                      Number(rowData.quantity) === 0 ? (
                        <Tag color="red">Нет в наличии</Tag>
                      ) : (
                        <Tag color="orange">Заканчивается</Tag>
                      )
                    }
                  </Cell>
                </Column>
              </Table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold mb-5">Краткая сводка</h3>

          <div className="space-y-4">
            <Panel bordered shaded className="bg-slate-950 border-slate-800">
              <p className="text-slate-400 text-sm">Общее количество единиц товара</p>
              <p className="text-2xl font-bold mt-2">
                {products.reduce(
                  (sum, item) => sum + Number(item.quantity || 0),
                  0
                )}
              </p>
            </Panel>

            <Panel bordered shaded className="bg-slate-950 border-slate-800">
              <p className="text-slate-400 text-sm">Проблемных позиций</p>
              <p className="text-2xl font-bold mt-2 text-amber-400">
                {lowStockProducts.length}
              </p>
            </Panel>

            <Panel bordered shaded className="bg-slate-950 border-slate-800">
              <p className="text-slate-400 text-sm">Последних сообщений</p>
              <p className="text-2xl font-bold mt-2 text-pink-400">
                {feedback.length}
              </p>
            </Panel>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold mb-5">Последние поступления</h3>

          {latestReceipts.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
              Поступлений пока нет.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <Table
                data={latestReceipts}
                autoHeight
                bordered
                cellBordered
                wordWrap="break-word"
              >
                <Column width={80} align="center">
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>ID товара</HeaderCell>
                  <Cell dataKey="productId" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Количество</HeaderCell>
                  <Cell dataKey="quantity" />
                </Column>

                <Column flexGrow={1.2}>
                  <HeaderCell>Дата</HeaderCell>
                  <Cell dataKey="date" />
                </Column>
              </Table>
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">
          <h3 className="text-xl font-semibold mb-5">Последние списания</h3>

          {latestWriteOffs.length === 0 ? (
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 text-slate-400">
              Списаний пока нет.
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-slate-800">
              <Table
                data={latestWriteOffs}
                autoHeight
                bordered
                cellBordered
                wordWrap="break-word"
              >
                <Column width={80} align="center">
                  <HeaderCell>ID</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>ID товара</HeaderCell>
                  <Cell dataKey="productId" />
                </Column>

                <Column flexGrow={1}>
                  <HeaderCell>Количество</HeaderCell>
                  <Cell dataKey="quantity" />
                </Column>

                <Column flexGrow={1.2}>
                  <HeaderCell>Дата</HeaderCell>
                  <Cell dataKey="date" />
                </Column>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
