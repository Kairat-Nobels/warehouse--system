/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Table, Whisper, Tooltip } from "rsuite";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { MdEdit, MdDeleteOutline } from "react-icons/md";
import { getRooms, Room } from "../redux/slices/roomsSlice";
import DeleteModal from "../components/deleteModal";
import RoomsModalForm from "../components/RoomsModalForm";
import { useAppDispatch } from "../hooks/hooks";

const RoomManagement = () => {
  const dispatch = useAppDispatch();
  const { rooms, isLoading, error } = useSelector(
    (state: any) => state.roomsReducer
  );

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editEvent, setEditEvent] = useState<Room | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleEdit = (event: Room) => {
    setEditEvent(event);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditEvent(null);
    setShowModal(true);
  };

  return (
    <div className="adminStaff">
      <div className="flex justify-between items-center mb-4">
        <h3>Мероприятия</h3>
        <Button appearance="primary" onClick={handleAdd}>
          + Добавить мероприятие
        </Button>
      </div>

      {isLoading ? (
        <div className="w-full mt-8 mx-auto flex flex-col gap-4 justify-center items-center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={rooms} autoHeight wordWrap="break-word">
          <Table.Column width={60} align="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column width={100} fixed>
            <Table.HeaderCell>Фото</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <img
                  src={rowData.img}
                  alt="Фото"
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1.2}>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Категория</Table.HeaderCell>
            <Table.Cell dataKey="category" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Цена</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => `${rowData.price} сом`}
            </Table.Cell>
          </Table.Column>

          <Table.Column flexGrow={1.4}>
            <Table.HeaderCell>Место</Table.HeaderCell>
            <Table.Cell dataKey="location" />
          </Table.Column>

          <Table.Column flexGrow={1.2}>
            <Table.HeaderCell>Дата</Table.HeaderCell>
            <Table.Cell dataKey="date" />
          </Table.Column>

          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Описание</Table.HeaderCell>
            <Table.Cell dataKey="description" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Всего мест</Table.HeaderCell>
            <Table.Cell dataKey="totalSeats" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Осталось</Table.HeaderCell>
            <Table.Cell dataKey="availableSeats" />
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell className="deleteBtnTable">
              {(rowData: Room) => (
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
                    <Button
                      onClick={() => setDeleteTarget(rowData)}
                      appearance="subtle"
                    >
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}

      <RoomsModalForm
        open={showModal}
        onClose={() => {
          setEditEvent(null);
          setShowModal(false);
        }}
        roomData={editEvent}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={String(deleteTarget.id)}
          deleteFunc="deleteRoom"
        />
      )}
    </div>
  );
};

export default RoomManagement;
