import axios from "axios";

const baseUrl = `http://localhost:3000/api`;
axios.defaults.baseURL = baseUrl;

export const getAllTodos = async (offset) => {
  try {
    const { data } = await axios.get("/todos");
    return data;
  } catch (e) {
    console.log("error", e);
  }
};
export const getTodoById = async (id) => {
  try {
    const { data } = await axios.get(`/todos/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const addTodo = async (todo) => {
  try {
    const { data } = await axios.post(`/todos`, todo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const updateTodoById = async (id, todo) => {
  try {
    const { data } = await axios.put(`/todos/${id}`, todo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const updateTodosIsDoneById = async (id, todo) => {
  try {
    const { data } = await axios.patch(`/todos/${id}`, todo);
    return data;
  } catch (e) {
    console.log(e);
  }
};
export const deleteTodo = async (id) => {
  try {
    const { data } = await axios.delete(`/todos/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
