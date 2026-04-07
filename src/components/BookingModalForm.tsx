/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Schema,
  SelectPicker,
} from "rsuite";
import { Booking, updateBooking } from "../redux/slices/bookingsSlice";
import { useAppDispatch } from "../hooks/hooks";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired("Укажите имя"),
  phone: StringType().isRequired("Укажите телефон"),
  ticketsCount: NumberType("Количество билетов должно быть числом").isRequired(
    "Укажите количество билетов"
  ),
  status: StringType().isRequired("Укажите статус"),
});

const statusOptions = [
  { label: "Оплачено", value: "paid" },
  { label: "Забронировано", value: "reserved" },
  { label: "Отменено", value: "cancelled" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  bookData: Booking | null;
  allBookings: Booking[];
}

const BookingModalForm: React.FC<Props> = ({
  open,
  onClose,
  bookData,
}) => {
  const formRef = useRef<any>(null);
  const [formValue, setFormValue] = useState<Partial<Booking>>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (bookData) {
      setFormValue({
        name: bookData.name,
        phone: bookData.phone,
        ticketsCount: bookData.ticketsCount,
        status: bookData.status,
        amount: bookData.amount,
      });
    } else {
      setFormValue({});
    }
  }, [bookData]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;
    if (!bookData) return;

    const ticketPrice =
      bookData.ticketsCount > 0 ? bookData.amount / bookData.ticketsCount : 0;

    const updatedTicketsCount = Number(formValue.ticketsCount || 0);

    const payload = {
      ...bookData,
      ...formValue,
      ticketsCount: updatedTicketsCount,
      amount: ticketPrice * updatedTicketsCount,
    };

    dispatch(
      updateBooking({
        id: Number(bookData.id),
        updatedData: payload,
      })
    );

    onClose();
  };

  const maxTickets = Math.min(bookData?.event?.availableSeats || 0, 10);

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <Modal.Header>
        <Modal.Title>Редактировать заказ</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {bookData?.event?.img && (
          <img
            src={bookData.event.img}
            alt="event"
            style={{ width: "100%", borderRadius: 8, marginBottom: 10 }}
          />
        )}

        <div style={{ fontWeight: "bold", marginBottom: 10 }}>
          Мероприятие: {bookData?.eventName || bookData?.event?.name}
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
        >
          <Form.Group>
            <Form.ControlLabel>Имя</Form.ControlLabel>
            <Form.Control name="name" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Телефон</Form.ControlLabel>
            <Form.Control name="phone" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Количество билетов</Form.ControlLabel>
            <Form.Control
              name="ticketsCount"
              accepter={SelectPicker}
              data={
                maxTickets > 0
                  ? Array.from({ length: maxTickets }, (_, index) => ({
                    label: String(index + 1),
                    value: index + 1,
                  }))
                  : [{ label: "0", value: 0 }]
              }
              value={formValue.ticketsCount || null}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  ticketsCount: Number(value),
                }))
              }
              cleanable={false}
              searchable={false}
              placeholder="Выберите количество"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Статус</Form.ControlLabel>
            <Form.Control
              name="status"
              accepter={SelectPicker}
              data={statusOptions}
              value={formValue.status || null}
              onChange={(value) =>
                setFormValue((prev) => ({
                  ...prev,
                  status: String(value),
                }))
              }
              cleanable={false}
              searchable={false}
            />
          </Form.Group>

          <div style={{ fontWeight: "bold", marginTop: 10 }}>
            Стоимость: {formValue.ticketsCount && bookData?.ticketsCount
              ? Math.round(
                (bookData.amount / bookData.ticketsCount) *
                Number(formValue.ticketsCount)
              )
              : bookData?.amount || 0}{" "}
            сом
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button appearance="primary" onClick={handleSubmit}>
          Сохранить изменения
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModalForm;
