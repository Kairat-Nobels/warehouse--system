/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
  SelectPicker,
} from "rsuite";
import { ImagePlus, Package2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  createProduct,
  Product,
  updateProduct,
} from "../redux/slices/productsSlice";
import { getCategories } from "../redux/slices/categoriesSlice";
import { getSuppliers } from "../redux/slices/suppliersSlice";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название товара"),
  article: StringType().isRequired("Укажите артикул"),
  categoryId: NumberType().isRequired("Выберите категорию"),
  supplierId: NumberType().isRequired("Выберите поставщика"),
  unit: StringType().isRequired("Укажите единицу измерения"),
  price: NumberType("Цена должна быть числом").isRequired("Укажите цену"),
  quantity: NumberType("Количество должно быть числом").isRequired(
    "Укажите количество"
  ),
  minStock: NumberType("Минимальный остаток должен быть числом").isRequired(
    "Укажите минимальный остаток"
  ),
  description: StringType().isRequired("Укажите описание"),
});

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Input>
>((props, ref) => (
  <Input {...props} as="textarea" ref={ref as React.Ref<HTMLTextAreaElement>} />
));
Textarea.displayName = "Textarea";

interface ProductModalFormProps {
  open: boolean;
  onClose: () => void;
  productData: Product | null;
}

const ProductModalForm: React.FC<ProductModalFormProps> = ({
  open,
  onClose,
  productData,
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { suppliers } = useAppSelector((state) => state.suppliersReducer);

  const [formValue, setFormValue] = useState<Partial<Product>>({});
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (productData) {
      setFormValue({
        ...productData,
        price: Number(productData.price),
        quantity: Number(productData.quantity),
        minStock: Number(productData.minStock),
        categoryId: Number(productData.categoryId),
        supplierId: Number(productData.supplierId),
      });
      setImageUrl(productData.image || "");
    } else {
      setFormValue({
        name: "",
        article: "",
        categoryId: undefined,
        supplierId: undefined,
        unit: "шт",
        price: 0,
        quantity: 0,
        minStock: 0,
        image: "",
        description: "",
      });
      setImageUrl("");
    }
  }, [productData, open]);

  const handleSubmit = () => {
    if (!formRef.current?.check()) return;

    const payload: Product = {
      name: String(formValue.name || "").trim(),
      article: String(formValue.article || "").trim(),
      categoryId: Number(formValue.categoryId),
      supplierId: Number(formValue.supplierId),
      unit: String(formValue.unit || "").trim(),
      price: Number(formValue.price || 0),
      quantity: Number(formValue.quantity || 0),
      minStock: Number(formValue.minStock || 0),
      image: imageUrl || "https://placehold.co/100",
      description: String(formValue.description || "").trim(),
    };

    if (payload.price < 0 || payload.quantity < 0 || payload.minStock < 0) {
      alert(
        "Цена, количество и минимальный остаток не могут быть отрицательными"
      );
      return;
    }

    if (productData?.id) {
      dispatch(
        updateProduct({
          id: Number(productData.id),
          updatedData: payload,
        })
      );
    } else {
      dispatch(createProduct(payload));
    }

    onClose();
  };

  const categoryOptions = categories.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const supplierOptions = suppliers.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  return (
    <Modal open={open} onClose={onClose} size="md" overflow={false}>
      <Modal.Header>
        <Modal.Title>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
              <Package2 size={20} />
            </div>
            <div>
              <div className="text-2xl font-semibold text-slate-800">
                {productData ? "Редактировать товар" : "Добавить товар"}
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Заполните данные товара для сохранения в системе
              </p>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="product"
              className="mb-4 h-[220px] w-full rounded-xl object-cover border border-slate-200"
            />
          ) : (
            <div className="mb-4 flex h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white text-slate-400">
              Нет изображения
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Uploader
              action="https://090c35a84ec2833c.mokky.dev/uploads"
              name="file"
              autoUpload
              fileListVisible={false}
              onSuccess={(res: any) => {
                const url = res?.url;
                if (url) setImageUrl(url);
              }}
            >
              <Button appearance="ghost" className="w-full sm:w-auto">
                <span className="flex items-center gap-2">
                  <ImagePlus size={16} />
                  Загрузить фото
                </span>
              </Button>
            </Uploader>

            <Input
              placeholder="Или вставьте ссылку на изображение"
              value={imageUrl}
              onChange={(value) => setImageUrl(value)}
            />
          </div>
        </div>

        <Form
          fluid
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={(value) => setFormValue(value as Partial<Product>)}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Group>
              <Form.ControlLabel>Название товара</Form.ControlLabel>
              <Form.Control name="name" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Артикул</Form.ControlLabel>
              <Form.Control name="article" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Категория</Form.ControlLabel>
              <SelectPicker
                data={categoryOptions}
                value={formValue.categoryId as number}
                onChange={(value) =>
                  setFormValue((prev) => ({
                    ...prev,
                    categoryId: Number(value),
                  }))
                }
                style={{ width: "100%" }}
                placeholder="Выберите категорию"
                cleanable={false}
              />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Поставщик</Form.ControlLabel>
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

            <Form.Group>
              <Form.ControlLabel>Единица измерения</Form.ControlLabel>
              <Form.Control name="unit" />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Цена</Form.ControlLabel>
              <Form.Control name="price" type="number" min={0} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Количество</Form.ControlLabel>
              <Form.Control name="quantity" type="number" min={0} />
            </Form.Group>

            <Form.Group>
              <Form.ControlLabel>Минимальный остаток</Form.ControlLabel>
              <Form.Control name="minStock" type="number" min={0} />
            </Form.Group>
          </div>

          <Form.Group className="mt-2">
            <Form.ControlLabel>Описание</Form.ControlLabel>
            <Form.Control name="description" accepter={Textarea} rows={4} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <div className="flex items-center justify-end gap-3">
          <Button appearance="primary" color="red" onClick={onClose}>
            Отмена
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            {productData ? "Сохранить изменения" : "Добавить товар"}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModalForm;
