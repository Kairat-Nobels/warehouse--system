/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  Uploader,
  Input,
  DatePicker,
} from "rsuite";
import { createRoom, Room, updateRoom } from "../redux/slices/roomsSlice";
import { useAppDispatch } from "../hooks/hooks";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите название"),
  price: NumberType("Цена должна быть числом").isRequired("Укажите цену"),
  location: StringType().isRequired("Укажите место проведения"),
  category: StringType().isRequired("Укажите категорию"),
  description: StringType().isRequired("Укажите описание"),
  totalSeats: NumberType("Количество мест должно быть числом").isRequired(
    "Укажите общее количество мест"
  ),
  availableSeats: NumberType(
    "Количество оставшихся мест должно быть числом"
  ).isRequired("Укажите количество доступных мест"),
});

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<typeof Input>
>((props, ref) => (
  <Input {...props} as="textarea" ref={ref as React.Ref<HTMLTextAreaElement>} />
));
Textarea.displayName = "Textarea";

interface RoomsModalFormProps {
  open: boolean;
  onClose: () => void;
  roomData: Room | null;
}

const formatDateForStorage = (date: Date | null) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const parseStoredDate = (value?: string) => {
  if (!value) return null;

  const parsed = new Date(value.replace(" ", "T"));
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const RoomsModalForm: React.FC<RoomsModalFormProps> = ({
  open,
  onClose,
  roomData,
}) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<any>(null);

  const [formValue, setFormValue] = useState<Partial<Room>>({});
  const [imgUrl, setImgUrl] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (roomData) {
      setFormValue(roomData);
      setImgUrl(roomData.img || "");
      setSelectedDate(parseStoredDate(roomData.date));
    } else {
      setFormValue({
        name: "",
        price: 0,
        location: "",
        date: "",
        category: "",
        description: "",
        totalSeats: 0,
        availableSeats: 0,
      });
      setImgUrl("");
      setSelectedDate(null);
    }
  }, [roomData]);

  const handleFormChange = (value: Partial<Room>) => {
    const nextValue = { ...value };

    const totalSeats = Number(nextValue.totalSeats || 0);
    const availableSeats = Number(nextValue.availableSeats || 0);

    if (!totalSeats) {
      nextValue.availableSeats = 0;
    } else if (availableSeats > totalSeats) {
      nextValue.availableSeats = totalSeats;
    }

    setFormValue(nextValue);
  };

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const totalSeats = Number(formValue.totalSeats || 0);
    const availableSeats = Number(formValue.availableSeats || 0);

    if (!selectedDate) {
      alert("Укажите дату и время мероприятия.");
      return;
    }

    if (totalSeats <= 0) {
      alert("Общее количество мест должно быть больше 0.");
      return;
    }

    if (availableSeats < 0) {
      alert("Количество доступных билетов не может быть отрицательным.");
      return;
    }

    if (availableSeats > totalSeats) {
      alert("Количество доступных билетов не может быть больше общего количества мест.");
      return;
    }

    const payload = {
      ...formValue,
      img: imgUrl,
      date: formatDateForStorage(selectedDate),
      totalSeats,
      availableSeats,
      price: Number(formValue.price || 0),
    };

    if (roomData) {
      dispatch(
        updateRoom({
          id: Number(roomData.id),
          updatedData: payload,
        })
      );
    } else {
      dispatch(createRoom(payload as Room));
    }

    onClose();
  };

  const totalSeatsValue = Number(formValue.totalSeats || 0);
  const availableSeatsDisabled = totalSeatsValue <= 0;

  return (
    <Modal open={open} onClose={onClose} size="md" className="doctor-modal">
      <Modal.Header>
        <Modal.Title className="text-center">
          {roomData ? "Редактировать мероприятие" : "Добавить мероприятие"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="doctor-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="img"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://637027467ddad67f.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: "15px" }}
            fileListVisible={false}
            onSuccess={(res: any) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить главное фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={(value) => setImgUrl(value)}
            style={{ marginTop: 10 }}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={handleFormChange}
          fluid
          className="doctor-modal__form"
        >
          <Form.Group>
            <Form.ControlLabel>Название:</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Цена билета:</Form.ControlLabel>
            <Form.Control name="price" type="number" min={0} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Место проведения:</Form.ControlLabel>
            <Form.Control name="location" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Дата и время:</Form.ControlLabel>
            <DatePicker
              oneTap
              format="yyyy-MM-dd HH:mm"
              value={selectedDate}
              onChange={(value) => setSelectedDate(value || null)}
              style={{ width: "100%" }}
              placement="autoVerticalStart"
              placeholder="Выберите дату и время"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Категория:</Form.ControlLabel>
            <Form.Control name="category" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Всего мест:</Form.ControlLabel>
            <Form.Control name="totalSeats" type="number" min={0} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Осталось билетов:</Form.ControlLabel>
            <Form.Control
              name="availableSeats"
              type="number"
              min={0}
              disabled={availableSeatsDisabled}
            />
            {availableSeatsDisabled && (
              <div style={{ fontSize: 12, color: "#999", marginTop: 6 }}>
                Сначала укажите общее количество мест
              </div>
            )}
          </Form.Group>

          <Form.Group className="doctor-modal__textarea">
            <Form.ControlLabel>Описание:</Form.ControlLabel>
            <Form.Control name="description" accepter={Textarea} rows={4} />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          {roomData ? "Сохранить изменения" : "Добавить мероприятие"}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomsModalForm;
