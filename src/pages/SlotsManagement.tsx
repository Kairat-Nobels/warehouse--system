/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdDeleteOutline } from 'react-icons/md';
import 'rsuite/dist/rsuite.min.css';
import { getReviews, Review } from '../redux/slices/reviewsSlice';
import DeleteModal from '../components/deleteModal';
import { useAppDispatch } from '../hooks/hooks';

const SlotsManagement = () => {
  const dispatch = useAppDispatch();
  const { reviews, loading, error } = useSelector((state: any) => state.reviewsReducer);
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);
  return (
    <div className="p-6 md:p-10">
      <h2 className="text-2xl font-bold text-center mb-6">Управление отзывами</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10">
          <RotatingLines strokeColor="grey" width="60" />
          <p className="text-gray-600">Загрузка...</p>
        </div>
      ) : error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : (
        <Table bordered cellBordered data={reviews} autoHeight wordWrap="break-word" locale={{
          emptyMessage: 'Нет отзывов',
        }}>
          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Имя</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Телефон</Table.HeaderCell>
            <Table.Cell dataKey="phone" />
          </Table.Column>

          <Table.Column flexGrow={3} fixed>
            <Table.HeaderCell>Отзыв</Table.HeaderCell>
            <Table.Cell dataKey="comment" />
          </Table.Column>

          <Table.Column width={100} align="center">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell className='deleteBtnTable'>
              {(rowData: any) => (
                < Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Удалить</Tooltip>}
                >
                  <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                    <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                  </Button>
                </Whisper>
              )}
            </Table.Cell>
          </Table.Column>
        </Table >
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc='deleteReview'
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={String(deleteTarget?.id)}
        />
      )}
    </div>
  );
};

export default SlotsManagement;
