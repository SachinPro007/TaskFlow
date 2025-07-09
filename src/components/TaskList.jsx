import React, { useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getApiData } from "../api/apiData";
import { TaskListCard, Loader, ErrorComponent } from "./index";

function TaskList() {
  const { 
    data, 
    isLoading, 
    isError, 
    error, 
    refetch,
    isFetching,
    isPlaceholderData
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getApiData,
    staleTime: 1000 * 60, 
    placeholderData: keepPreviousData,
    retry: 2, // Retry failed requests twice
    retryDelay: 1000 // Delay between retries
  });

  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    if (data) {
      const userTodos = data.filter((todo) => todo.userId === 1);
      setFilteredTodos(userTodos);
    }
  }, [data]);

  if(isLoading){
    return (
      <Loader />
    )
  }

  if (isError) {
    return (
      <ErrorComponent 
        error={error.message} 
        onRetry={refetch} 
        className="my-8"
      />
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          No tasks found for this user
        </h3>
        <button
          onClick={() => refetch()}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          Refresh Tasks
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          Your Tasks ({filteredTodos.length})
        </h2>
        <button
          onClick={() => refetch()}
          disabled={isFetching}
          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors flex items-center gap-1"
        >
          {isFetching ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></span>
              Refreshing...
            </>
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        {filteredTodos.map((todo) => (
          <TaskListCard 
            key={`${todo.id}-${todo.userId}`} 
            todo={todo} 
          />
        ))}
      </ul>
    </>
  );
}

export default TaskList;