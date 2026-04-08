/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Table, Tooltip, Whisper } from "rsuite";
import { MdDeleteOutline } from "react-icons/md";
import { MessageSquare } from "lucide-react";
import "rsuite/dist/rsuite.min.css";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Feedback, getFeedback } from "../redux/slices/feedbackSlice";
import DeleteModal from "../components/deleteModal";

const { Column, HeaderCell, Cell } = Table;

const FeedbackPage = () => {
  const dispatch = useAppDispatch();
  const { feedback, isLoading, error } = useAppSelector(
    (state) => state.feedbackReducer
  );

  const [deleteTarget, setDeleteTarget] = useState<Feedback | null>(null);

  useEffect(() => {
    dispatch(getFeedback());
  }, [dispatch]);

  const handleDelete = (item: Feedback) => {
    setDeleteTarget(item);
  };

  return (
    <div className="text-white">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Обратная связь</h2>
          <p className="text-slate-400 mt-2">
            Сообщения, отправленные пользователями через форму обратной связи.
          </p>
        </div>

        <Button
          appearance="primary"
          color="cyan"
          size="lg"
          className="!rounded-xl"
          startIcon={<MessageSquare size={18} />}
        >
          Всего сообщений: {feedback.length}
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center text-slate-400">
          Загрузка сообщений...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
          {error}
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
          <Table
            data={feedback}
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

            <Column flexGrow={1.1} minWidth={180}>
              <HeaderCell>Имя</HeaderCell>
              <Cell dataKey="name" />
            </Column>

            <Column flexGrow={1.4} minWidth={220}>
              <HeaderCell>Email</HeaderCell>
              <Cell dataKey="email" />
            </Column>

            <Column flexGrow={2} minWidth={320}>
              <HeaderCell>Сообщение</HeaderCell>
              <Cell dataKey="message" />
            </Column>

            <Column width={160} align="center">
              <HeaderCell>Дата</HeaderCell>
              <Cell dataKey="createdAt" />
            </Column>

            <Column width={130} align="center" fixed="right">
              <HeaderCell>Действия</HeaderCell>
              <Cell>
                {(rowData: Feedback) => (
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

      <DeleteModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        id={deleteTarget?.id?.toString() || ""}
        deleteFunc="deleteFeedback"
        title="Удалить сообщение"
        message={`Вы уверены, что хотите удалить сообщение от "${deleteTarget?.name}"?`}
      />
    </div>
  );
};

export default FeedbackPage;
