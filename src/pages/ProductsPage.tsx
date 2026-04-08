/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Table, Whisper, Tooltip, Tag } from "rsuite";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { getProducts, Product } from "../redux/slices/productsSlice";
import { getCategories } from "../redux/slices/categoriesSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { PackagePlus } from "lucide-react";
import "rsuite/dist/rsuite.min.css";
import ProductModalForm from "../components/ProductModalForm";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;

const ProductsPage = () => {
  const dispatch = useAppDispatch();

  const { products, isLoading, error } = useAppSelector(
    (state) => state.productsReducer
  );
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategories());
    dispatch(getSuppliers());
  }, [dispatch]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((item) => item.id === categoryId);
    return category?.name || "Без категории";
  };

  const getSupplierName = (supplierId: number) => {
    const supplier = suppliers.find((item) => item.id === supplierId);
    return supplier?.name || "Без поставщика";
  };

  const handleAdd = () => {
    setEditProduct(null);
    setShowModal(true);
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDelete = (product: Product) => {
    setDeleteTarget(product);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Товары</h2>
          <p className="text-slate-400 mt-2">
            Управление товарами, их количеством, минимальным остатком,
            категориями и поставщиками.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          onClick={handleAdd}
          className="!rounded-xl"
          startIcon={<PackagePlus size={18} />}
        >
          Добавить товар
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка товаров...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={products}
            autoHeight
            bordered
            cellBordered
            wordWrap="break-word"
            hover
          >
            <Column width={70} align="center" fixed>
              <HeaderCell>ID</HeaderCell>
              <Cell dataKey="id" />
            </Column>

            <Column width={110}>
              <HeaderCell>Фото</HeaderCell>
              <Cell>
                {(rowData: Product) => (
                  <div className="py-2">
                    <img
                      src={rowData.image}
                      alt={rowData.name}
                      className="w-[60px] h-[60px] object-cover rounded-lg border border-slate-700"
                    />
                  </div>
                )}
              </Cell>
            </Column>

            <Column flexGrow={1.5} minWidth={220}>
              <HeaderCell>Название</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={1} minWidth={140}>
              <HeaderCell>Артикул</HeaderCell>
              <Cell dataKey="article" />
            </Column>

            <Column flexGrow={1.2} minWidth={160}>
              <HeaderCell>Категория</HeaderCell>
              <Cell>
                {(rowData: Product) => getCategoryName(rowData.categoryId)}
              </Cell>
            </Column>

            <Column flexGrow={1.4} minWidth={180}>
              <HeaderCell>Поставщик</HeaderCell>
              <Cell>
                {(rowData: Product) => getSupplierName(rowData.supplierId)}
              </Cell>
            </Column>

            <Column width={100} align="center">
              <HeaderCell>Ед.</HeaderCell>
              <Cell dataKey="unit" />
            </Column>

            <Column width={120} align="center">
              <HeaderCell>Цена</HeaderCell>
              <Cell>
                {(rowData: Product) => `${rowData.price} сом`}
              </Cell>
            </Column>

            <Column width={120} align="center">
              <HeaderCell>Кол-во</HeaderCell>
              <Cell>
                {(rowData: Product) => (
                  <span className="font-semibold">{rowData.quantity}</span>
                )}
              </Cell>
            </Column>

            <Column width={150} align="center">
              <HeaderCell>Мин. остаток</HeaderCell>
              <Cell dataKey="minStock" />
            </Column>

            <Column width={170} align="center">
              <HeaderCell>Статус</HeaderCell>
              <Cell>
                {(rowData: Product) => {
                  if (Number(rowData.quantity) === 0) {
                    return <Tag color="red">Нет в наличии</Tag>;
                  }

                  if (Number(rowData.quantity) <= Number(rowData.minStock)) {
                    return <Tag color="orange">Заканчивается</Tag>;
                  }

                  return <Tag color="green">В наличии</Tag>;
                }}
              </Cell>
            </Column>

            <Column flexGrow={2} minWidth={260}>
              <HeaderCell>Описание</HeaderCell>
              <Cell dataKey="description" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: Product) => (
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

      {/* ADD / EDIT */}
      <ProductModalForm
        open={showModal}
        onClose={() => {
          setEditProduct(null);
          setShowModal(false);
        }}
        productData={editProduct}
      />

      {/* DELETE */}
      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteProduct"
        title="Удалить товар"
        message={`Вы уверены, что хотите удалить "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default ProductsPage;