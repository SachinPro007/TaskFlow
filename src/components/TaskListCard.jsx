import React, { useState } from "react";
import { getContext } from "../context/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSingleCard, updateSingleCardData } from "../api/apiData";
import { FiEdit2, FiTrash2, FiSave, FiX, FiCheck } from "react-icons/fi";

function TaskListCard({ todo }) {
  const queryClient = useQueryClient();
  const { theme } = getContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteSingleCard(id),
    onMutate: () => setIsDeleting(true),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts"], (curElem) => 
        curElem.filter((item) => item.id !== id)
      );
    },
    onError: (err) => {
      alert(err.message);
      setIsDeleting(false);
    },
    onSettled: () => setIsDeleting(false)
  });

  const updateMutation = useMutation({
    mutationFn: () => updateSingleCardData(todo.id, editedTodo),
    onSuccess: () => {
      queryClient.setQueryData(["posts"], (element) => 
        element.map((item) => (item.id === todo.id ? editedTodo : item))
      );
      setIsEditing(false);
    },
    onError: (err) => alert(err.message)
  });

  const handleUpdateInput = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      updateMutation.mutate();
    } else {
      setEditedTodo({ ...todo });
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(todo.id);
    }
  };

  // Theme-based styles
  const cardStyles = {
    container: theme === "dark" 
      ? "bg-gray-800/90 border-gray-700 hover:shadow-gray-900/30" 
      : "bg-white border-gray-200 hover:shadow-blue-100/30",
    header: theme === "dark" 
      ? "bg-gray-700 text-gray-300" 
      : "bg-blue-100 text-blue-800",
    content: theme === "dark" 
      ? "text-gray-300" 
      : "text-gray-800",
    input: theme === "dark" 
      ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-purple-500" 
      : "bg-gray-50 border-gray-300 text-gray-800 focus:ring-blue-500"
  };

  return (
    <li className={`w-full rounded-xl border shadow-lg transition-all duration-300 hover:shadow-xl ${cardStyles.container} ${
      isDeleting ? "opacity-50 scale-95" : "opacity-100 scale-100"
    }`}>
      <div className="p-5">
        {/* Card Header */}
        <div className="flex justify-between items-center mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${cardStyles.header}`}>
            ID: {todo?.id}
          </span>
          <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            User ID: {todo?.userId}
          </span>
        </div>

        {/* Content Area */}
        <div className="mb-5">
          {isEditing ? (
            <div className="space-y-3">
              <input
                name="title"
                type="text"
                value={editedTodo.title}
                onChange={handleUpdateInput}
                className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 ${cardStyles.input}`}
                placeholder="Task title"
              />
              <textarea
                name="body"
                value={editedTodo.body}
                onChange={handleUpdateInput}
                className={`w-full p-2 rounded-lg border focus:outline-none focus:ring-2 min-h-[100px] ${cardStyles.input}`}
                placeholder="Task description"
              />
            </div>
          ) : (
            <div className="space-y-2">
              <h3 className={`text-lg font-bold truncate ${cardStyles.content}`}>
                {todo?.title}
              </h3>
              <p className={`text-sm line-clamp-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                {todo?.body}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-red-400" 
                    : "hover:bg-gray-100 text-red-500"
                }`}
              >
                <FiX className="w-4 h-4" />
                <span className="text-sm">Cancel</span>
              </button>
              <button
                onClick={handleEditToggle}
                disabled={updateMutation.isLoading}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-green-400" 
                    : "hover:bg-gray-100 text-green-600"
                }`}
              >
                {updateMutation.isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FiCheck className="w-4 h-4" />
                )}
                <span className="text-sm">Save</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEditToggle}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-blue-400" 
                    : "hover:bg-gray-100 text-blue-600"
                }`}
              >
                <FiEdit2 className="w-4 h-4" />
                <span className="text-sm">Edit</span>
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isLoading}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-red-400" 
                    : "hover:bg-gray-100 text-red-600"
                }`}
              >
                {deleteMutation.isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <FiTrash2 className="w-4 h-4" />
                )}
                <span className="text-sm">Delete</span>
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default TaskListCard;