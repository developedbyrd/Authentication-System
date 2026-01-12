// import { useState, useEffect, useCallback } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
// } from "../store/slices/todoSlice";

// const debounce = (func, delay) => {
//   let timeoutId;
//   return (...args) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func(...args), delay);
//   };
// };

// const TodoApp = () => {
//   const dispatch = useDispatch();
//   const { todos, loading, error } = useSelector((state) => state.todos);

//   const [search, setSearch] = useState("");
//   const [newTodo, setNewTodo] = useState({ title: "", description: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ title: "", description: "" });

//   const debouncedSearch = useCallback(
//     debounce((searchTerm) => {
//       dispatch(fetchTodos(searchTerm));
//     }, 300),
//     [dispatch]
//   );

//   useEffect(() => {
//     debouncedSearch(search);
//   }, [search, debouncedSearch]);

//   useEffect(() => {
//     dispatch(fetchTodos());
//   }, [dispatch]);

//   const handleCreateTodo = (e) => {
//     e.preventDefault();
//     if (newTodo.title.trim()) {
//       dispatch(createTodo(newTodo));
//       setNewTodo({ title: "", description: "" });
//     }
//   };

//   const handleUpdateTodo = (id, updates) => {
//     dispatch(updateTodo({ id, updates }));
//     setEditingId(null);
//   };

//   const handleDeleteTodo = (id) => {
//     dispatch(deleteTodo(id));
//   };

//   const startEdit = (todo) => {
//     setEditingId(todo._id);
//     setEditForm({ title: todo.title, description: todo.description || "" });
//   };

//   const toggleComplete = (todo) => {
//     handleUpdateTodo(todo._id, { completed: !todo.completed });
//   };

//   return (
//     <div className="todo-app">
//       <h2>Todo App</h2>

//       {/* Search */}
//       <div className="search-section">
//         <input
//           type="text"
//           placeholder="Search todos..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="search-input"
//         />
//       </div>

//       {/* Create Todo */}
//       <form onSubmit={handleCreateTodo} className="create-form">
//         <input
//           type="text"
//           placeholder="Todo title"
//           value={newTodo.title}
//           onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description (optional)"
//           value={newTodo.description}
//           onChange={(e) =>
//             setNewTodo({ ...newTodo, description: e.target.value })
//           }
//         />
//         <button type="submit">Add Todo</button>
//       </form>

//       {/* Error Display */}
//       {error && <div className="error">{error}</div>}

//       {/* Loading */}
//       {loading && <div className="loading">Loading...</div>}

//       {/* Todo List */}
//       <div className="todo-list">
//         {todos.map((todo) => (
//           <div
//             key={todo._id}
//             className={`todo-item ${todo.completed ? "completed" : ""}`}
//           >
//             {editingId === todo._id ? (
//               <div className="edit-form">
//                 <input
//                   type="text"
//                   value={editForm.title}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, title: e.target.value })
//                   }
//                 />
//                 <input
//                   type="text"
//                   value={editForm.description}
//                   onChange={(e) =>
//                     setEditForm({ ...editForm, description: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handleUpdateTodo(todo._id, editForm)}>
//                   Save
//                 </button>
//                 <button onClick={() => setEditingId(null)}>Cancel</button>
//               </div>
//             ) : (
//               <div className="todo-content">
//                 <div className="todo-text">
//                   <h4>{todo.title}</h4>
//                   {todo.description && <p>{todo.description}</p>}
//                 </div>
//                 <div className="todo-actions">
//                   <button onClick={() => toggleComplete(todo)}>
//                     {todo.completed ? "Undo" : "Complete"}
//                   </button>
//                   <button onClick={() => startEdit(todo)}>Edit</button>
//                   <button onClick={() => handleDeleteTodo(todo._id)}>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TodoApp;

import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../store/slices/todoSlice";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const TodoApp = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "" });

  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      dispatch(fetchTodos(searchTerm));
    }, 300),
    [dispatch]
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleCreateTodo = (e) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      dispatch(createTodo(newTodo));
      setNewTodo({ title: "", description: "" });
    }
  };

  const handleUpdateTodo = (id, updates) => {
    dispatch(updateTodo({ id, updates }));
    setEditingId(null);
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditForm({ title: todo.title, description: todo.description || "" });
  };

  const toggleComplete = (todo) => {
    handleUpdateTodo(todo._id, { completed: !todo.completed });
  };

  return (
    <div className="text-left">
      <h2 className="text-gray-800 mb-6 text-2xl font-semibold">Todo App</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search todos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border-2 border-gray-200 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition"
        />
      </div>

      <form onSubmit={handleCreateTodo} className="flex flex-wrap gap-3 mb-8">
        <input
          type="text"
          placeholder="Todo title"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          required
          className="flex-1 min-w-[200px] p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          className="flex-1 min-w-[200px] p-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl font-medium text-white bg-linear-to-br from-blue-500 to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition cursor-pointer"
        >
          Add Todo
        </button>
      </form>

      {error && (
        <div className="mb-4 p-4 rounded-xl border border-red-200 bg-red-50 text-red-600 font-medium">
          {error}
        </div>
      )}

      {loading && (
        <div className="text-center text-gray-500 py-8 text-lg">Loading...</div>
      )}

      <div>
        {todos.map((todo) => (
          <div
            key={todo._id}
            className={`mb-4 p-5 rounded-2xl border bg-white shadow-sm transition hover:shadow-lg
              ${todo.completed ? "opacity-60 bg-slate-50" : "border-gray-200"}`}
          >
            {editingId === todo._id ? (
              <div className="flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="flex-1 min-w-[150px] p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="flex-1 min-w-[150px] p-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleUpdateTodo(todo._id, editForm)}
                  className="px-4 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h4
                    className={`mb-2 text-lg font-semibold text-gray-800 ${
                      todo.completed ? "line-through" : ""
                    }`}
                  >
                    {todo.title}
                  </h4>
                  {todo.description && (
                    <p className="text-sm text-gray-500 leading-snug">
                      {todo.description}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleComplete(todo)}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition cursor-pointer"
                  >
                    {todo.completed ? "Undo" : "Complete"}
                  </button>
                  <button
                    onClick={() => startEdit(todo)}
                    className="px-3 py-2 text-xs font-medium rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo._id)}
                    className="px-3 py-2 text-xs font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
