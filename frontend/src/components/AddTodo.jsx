import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "./ui/Input.jsx";
import ConfirmModal from "./ui/ConfirmModal.jsx";
import Modal from "./Modal.jsx";
import { addTodo, getTodoById, updateTodoById } from "../services/api.js";

export default function AddTodo({ id, closeModal }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [todoId, setTodoId] = useState(id ? id : "");

  const clearForm = () => {
    setDescription("");
    setTitle("");
  };

  const getTodo = async (id) => {
    const { result } = await getTodoById(id);
    result.title ? setTitle(result.title) : "";
    result.description ? setDescription(result.description) : "";
  };

  const handleChange = async (e) => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
    }
  };
  const onCloseModal = () => {
    closeModal();
  };
  const onCancel = async () => {
    if (title || description) {
      setModalIsOpen(true);
    } else {
      clearForm();
      onCloseModal();
    }
  };
  const onCancelConfirm = async () => {
    clearForm();
    setModalIsOpen(false);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = {
      description,
      title,
    };
    if (!description || !title) {
      setIsSubmitted(true);
      toast.warning(`⏰ Check required fields`);
      return;
    }
    if (todoId) {
      const { result } = await updateTodoById(todoId, todo);
      if (result) {
        toast.success(`🚀  todo '${result.title}' edited`);
        closeModal();
      } else {
        toast.warning(`☎️  something  wrong`);
      }
    } else {
      const { result } = await addTodo(todo);

      if (result) {
        toast.success(`🚀  todo '${result.title}'  added`);
        closeModal();
      } else {
        toast.warning(`☎️  something  wrong`);
      }
    }
  };

  useEffect(() => {
    (async () => {
      try {
        if (todoId) {
          await getTodo(todoId);
        }
      } catch (error) {}
    })();
  }, [todoId]);

  return (
    <>
      <div className={"w-full "}>
        <h1 className={"text-2xl font-bold text-gray-800 my-2"}>{`${
          todoId ? "Edit Todo" : "Add Todo"
        }`}</h1>
        <form
          className={"flex flex-col border-2 rounded-xl mt-2 p-4"}
          onSubmit={handleSubmit}
          noValidate
        >
          <Input
            name={"title"}
            inputClass={"w-full bg-white  border text-base h-8 px-3 rounded-xl"}
            onChange={handleChange}
            value={title}
            type={"text"}
            required={true}
            isSubmitted={isSubmitted}
          />

          <label htmlFor="description" className={"text-lg "}>
            Description:
            <textarea
              rows={3}
              className={`w-full bg-white border  text-base px-3 rounded-xl  focus:outline-none  focus:border-blue-200 ${
                !description && isSubmitted
                  ? " border-red-500 focus:border-red-500"
                  : ""
              }`}
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
            ></textarea>
            <span
              className={`${
                isSubmitted && !description
                  ? "block text-sm  text-right text-red-500"
                  : " hidden  "
              } `}
            >
              {!description ? "Required" : ""}
            </span>
          </label>

          <div className={"flex justify-between py-4"}>
            <div className={"w-full flex "}>
              <button
                type="submit"
                className={
                  "text-base  mr-2 text-center border-2 truncate w-1/2 py-2  bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-gray-200 hover:scale-95 "
                }
              >
                Save
              </button>
              <button
                className={
                  "text-base text-center border truncate  py-2 w-1/2   bg-white whitespace-nowrap rounded-xl ease-in-out duration-300 hover:bg-red-200 hover:scale-95 "
                }
                type="button"
                onClick={onCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>

        {modalIsOpen && (
          <Modal
            onClose={() => {
              setModalIsOpen(false);
            }}
          >
            <ConfirmModal
              confirm={onCancelConfirm}
              cancel={() => {
                setModalIsOpen(false);
              }}
            />
          </Modal>
        )}
      </div>
    </>
  );
}
