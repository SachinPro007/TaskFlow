import React, { useState } from "react";
import { getContext } from "../context/context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTask } from "../api/apiData";

function AddTaskBtn() {
  const { theme, setNewTaskHover, newTaskHover, themeStyles } = getContext();
  const queryClient = useQueryClient();
  const [isFocused, setIsFocused] = useState(false);

  const [newTask, setNewTask] = useState({
    userId: 1,
    id: "N" + Math.round(Math.random() * 100),
    title: "",
    body: "",
  });

  const handleTaskInput = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const addMutation = useMutation({
    mutationFn: () => addNewTask(newTask),
    onSuccess: (data) => {
      if(data){
        queryClient.setQueryData(["posts"], (curElem) => {               
          return [...curElem, data];
        });
        setNewTask({
          ...newTask,
          title: '',
          body: ''
        });
        setIsFocused(false);
      }
    },
    onError: (err) => {
      alert(err.message);
    }
  });

  const handleNewTask = () => {
    if (newTask.title && newTask.body) {
      addMutation.mutate(newTask);
    } else {
      alert("Please fill in both fields");
    }   
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNewTask();
    }
  };

  // Component-specific theme styles
  const componentStyles = {
    container: isFocused 
      ? 'ring-2 ring-blue-500' 
      : theme === "dark" 
        ? "bg-gray-900/60 border-gray-700 shadow-gray-900/30" 
        : "bg-white border-blue-100 shadow-blue-100/60",
    input: theme === "dark" 
      ? "bg-gray-800/80 placeholder-gray-400 text-gray-100 focus:ring-2 focus:ring-blue-500" 
      : "bg-blue-50/80 placeholder-gray-400 text-gray-800 focus:ring-2 focus:ring-blue-400",
    button: theme === "dark" 
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
      : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    iconContainer: theme === "dark" 
      ? "bg-gray-700" 
      : "bg-blue-100"
  };

  return (
    <div
      className={`relative mb-8 p-1 rounded-xl transition-all duration-300 border shadow-lg ${
        componentStyles.container
      } ${newTaskHover ? "scale-[1.005] shadow-xl" : ""}`}
      onMouseEnter={() => setNewTaskHover(true)}
      onMouseLeave={() => setNewTaskHover(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="relative flex flex-col sm:flex-row gap-3 p-4 items-center">
        {/* Plus Icon Container */}
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            componentStyles.iconContainer
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Input Fields */}
        <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Task title"
            name="title"
            value={newTask.title}
            onChange={handleTaskInput}
            onKeyDown={handleKeyDown}
            className={`w-full px-4 py-3 rounded-lg font-medium focus:outline-none transition-all ${
              componentStyles.input
            }`}
          />
          <input
            type="text"
            placeholder="Task description"
            name="body"
            value={newTask.body}
            onChange={handleTaskInput}
            onKeyDown={handleKeyDown}
            className={`w-full px-4 py-3 rounded-lg font-medium focus:outline-none transition-all ${
              componentStyles.input
            }`}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleNewTask}
          disabled={addMutation.isLoading}
          className={`w-full sm:w-auto px-6 py-3 font-medium rounded-lg transition-all ${
            componentStyles.button
          } text-white hover:shadow-md flex items-center justify-center gap-2 disabled:opacity-70`}
        >
          {addMutation.isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Adding...
            </>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </div>
  );
}

export default AddTaskBtn;