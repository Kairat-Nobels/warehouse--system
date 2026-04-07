/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Button, Table, Whisper, Tooltip } from "rsuite";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import DeleteModal from "../components/deleteModal";
import { Booking, getBookings } from "../redux/slices/bookingsSlice";
import BookingModalForm from "./BookingModalForm";
import { useAppDispatch } from "../hooks/hooks";

const BookingManagement = () => {
  const dispatch = useAppDispatch();
  const { bookings, isLoading, error } = useSelector(
    (state: any) => state.bookingsReducer
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBooking, setEditBooking] = useState<Booking | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);

  useEffect(() => {
    setFilteredBookings(bookings || []);
  }, [bookings]);

  const handleEdit = (booking: Booking) => {
    setEditBooking(booking);
    setShowModal(true);
  };

  const filterAll = () => {
    setFilteredBookings(bookings || []);
  };

  const filterUpcoming = () => {
    const now = new Date();

    const upcoming = (bookings || []).filter((booking: Booking) => {
      const eventDateRaw =
        booking.event?.date || (booking as any).date || booking?.createdAt;
      if (!eventDateRaw) return false;

      const eventDate = new Date(eventDateRaw);
      return !Number.isNaN(eventDate.getTime()) && eventDate > now;
    });

    setFilteredBookings(upcoming);
  };

  const filterUnpaid = () => {
    const unpaid = (bookings || []).filter(
      (booking: Booking) => booking.status !== "paid" && booking.status !== "оплачено"
    );
    setFilteredBookings(unpaid);
  };

  const safeBookings = useMemo(() => filteredBookings || [], [filteredBookings]);

  return (
    <div className="adminStaff">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl">Управление заказами</h3>
        <div className="flex gap-2">
          <Button appearance="primary" onClick={filterAll}>
            Все
          </Button>
          <Button appearance="primary" onClick={filterUpcoming}>
            Актуальные
          </Button>
          <Button appearance="primary" onClick={filterUnpaid}>
            Не оплаченные
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex w-full flex-col gap-4 items-center justify-center mx-auto mt-6">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={safeBookings} autoHeight wordWrap="break-word">
          <Table.Column width={260} align="center">
            <Table.HeaderCell>Мероприятие</Table.HeaderCell>
            <Table.Cell>
              {(rowData: Booking) =>
                rowData.eventName ||
                rowData.event?.name ||
                (rowData as any).roomName ||
                (rowData as any).room?.name ||
                "Без названия"
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={180}>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Телефон</Table.HeaderCell>
            <Table.Cell dataKey="phone" />
          </Table.Column>

          <Table.Column flexGrow={1.3}>
            <Table.HeaderCell>Дата события</Table.HeaderCell>
            <Table.Cell>
              {(rowData: Booking) =>
                rowData.event?.date || (rowData as any).date || "Не указана"
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Билетов</Table.HeaderCell>
            <Table.Cell>
              {(rowData: Booking) => rowData.ticketsCount ?? 0}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.Cell>
              {(rowData: Booking) => `${rowData.amount} сом`}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Статус</Table.HeaderCell>
            <Table.Cell>
              {(rowData: Booking) =>
                rowData.status === "paid" ? "Оплачено" : rowData.status
              }
            </Table.Cell>
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell className="deleteBtnTable">
              {(rowData: Booking) => (
                <div className="actionButtons">
                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Редактировать</Tooltip>}
                  >
                    <Button onClick={() => handleEdit(rowData)} appearance="subtle">
                      <MdEdit color="#1caf68" size={20} />
                    </Button>
                  </Whisper>

                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Удалить</Tooltip>}
                  >
                    <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}

      <BookingModalForm
        open={showModal}
        onClose={() => {
          setEditBooking(null);
          setShowModal(false);
        }}
        bookData={editBooking}
        allBookings={bookings}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={String(deleteTarget.id)}
          deleteFunc="deleteBooking"
        />
      )}
    </div>
  );
};

export default BookingManagement;
