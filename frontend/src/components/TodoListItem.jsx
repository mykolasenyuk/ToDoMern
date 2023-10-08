import { SlNote, SlNotebook } from "react-icons/sl";
import { TiDeleteOutline } from "react-icons/ti";
import { useState } from "react";

export default function TodoListItem({
  todo,
  openModal,
  onDelete,
  onComplete,
}) {
  const [isDone, setIsDone] = useState(todo.isDone ? todo.isDone : false);
  const handleChangeCheckbox = async (e) => {
    const { name, checked } = e.currentTarget;
    switch (name) {
      case "isDone":
        await setIsDone(checked);
        onComplete(todo._id, { isDone: checked });
        break;
    }
  };
  return (
    <>
      <li
        key={todo._id}
        className={`${
          todo.isDone ? "bg-green-600" : "border-gray-600"
        } p-2 m-2 border-2 rounded  hover:border-gray-400 ease-in-out duration-300`}
      >
        <div className={"flex justify-between mb-4 "}>
          <div>
            <div
              className={"flex items-center  border bg-zinc-500 rounded p-2 "}
            >
              <SlNotebook className={"w-6 h-6   text-yellow-500 mr-2 "} />
              <span className={"text-lg uppercase "}>{todo.title}:</span>
            </div>
          </div>
          <div>
            <div className={"flex  justify-end"}>
              <button
                className={"flex items-center"}
                type="button"
                onClick={async () => {
                  openModal(todo._id);
                }}
              >
                <SlNote
                  className={
                    "w-6 h-6 text-green-500 hover:scale-125 ease-in-out duration-300 "
                  }
                />
              </button>
              <button
                className={"flex items-center"}
                type="button"
                onClick={async () => {
                  onDelete(todo._id);
                }}
              >
                <TiDeleteOutline
                  className={
                    "w-6 h-6 text-red-500 hover:scale-125 ease-in-out duration-300"
                  }
                />
              </button>
            </div>

            <div className="flex mt-4 px-1">
              <span className={"mr-2"}>Completed:</span>
              <div className={"flex relative "}>
                <input
                  className={"w-4 "}
                  name={"isDone"}
                  type="checkbox"
                  checked={isDone}
                  onChange={handleChangeCheckbox}
                  id="flexCheckDisabled"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={" w-full border rounded border-gray-500 p-2 bg-white"}>
          <p>{todo.description}</p>
        </div>
      </li>
    </>
  );
}
