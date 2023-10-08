import { useEffect, useState } from "react";
import {
  deleteTodo,
  getAllTodos,
  updateTodosIsDoneById,
} from "../services/api";
import Modal from "../components/Modal.jsx";
import { AiFillFileAdd } from "react-icons/ai";
import AddTodo from "../components/AddTodo.jsx";
import TodoList from "../components/TodoList.jsx";
import ConfirmModal from "../components/ui/ConfirmModal.jsx";
import { toast } from "react-toastify";

export default function TodosTableView() {
  const [todos, setTodos] = useState([]);
  const [isTodoModal, setIsTodoModal] = useState(false);
  const [id, setId] = useState("");
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const getTodos = async () => {
    const { results } = await getAllTodos();
    if (results) {
      setTodos(results);
    }
  };

  const openModal = async (id) => {
    await setId(id);
    setIsTodoModal(true);
  };
  const onDelete = async (id) => {
    await setId(id);
    setIsDeleteModal(true);
  };
  const onDeleteConfirm = async () => {
    await deleteTodo(id);
    toast.success(`🚀  todo deleted`);
    await closeModal();
  };
  const onComplete = async (id, value) => {
    await setId(id);
    await updateTodosIsDoneById(id, value);
    toast.success(`🚀  todo completed`);
    updateCompleted();
  };
  const updateCompleted = () => {
    setId("");
  };

  const closeModal = async () => {
    await setId("");
    setIsTodoModal(false);
    setIsDeleteModal(false);
  };

  useEffect(() => {
    (async () => {
      try {
        await getTodos();
      } catch (error) {}
    })();
  }, [isTodoModal, id]);
  return (
    <>
      <div className={"w-full   p-4 pr-8 pt-16"}>
        <h1 className={"text-3xl font-bold underline text-center"}>
          Todos List
        </h1>
        <div className={"flex justify-center p-4"}>
          <button
            className={"flex items-center border rounded bg-green-200 p-2"}
            type="button"
            onClick={() => {
              setIsTodoModal(true);
            }}
          >
            <AiFillFileAdd
              className={
                "w-6 h-6 text-green-500 hover:scale-125 ease-in-out duration-300 "
              }
            />
            Add todo
          </button>
        </div>

        <div className={"w-full flex px-6 justify-center"}>
          <TodoList
            todos={todos}
            openModal={openModal}
            onDelete={onDelete}
            onComplete={onComplete}
          />
        </div>
      </div>
      {isTodoModal && (
        <Modal
          onClose={async () => {
            await closeModal();
          }}
        >
          <AddTodo id={id} closeModal={closeModal} />
        </Modal>
      )}
      {isDeleteModal && (
        <Modal
          onClose={async () => {
            await closeModal();
          }}
        >
          <ConfirmModal
            confirm={onDeleteConfirm}
            cancel={async () => {
              await closeModal();
            }}
          />
        </Modal>
      )}
    </>
  );
}
