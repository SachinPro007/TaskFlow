import React from "react";
import { AddTaskBtn, TaskList, ApiDemoNotice } from "../components";

function HomePage() {
  return (
    <main className="container mx-auto px-4 py-6 max-w-4xl">
      {/* Notice for api Behviar  */}
      <ApiDemoNotice />
      {/* Add Task Button */}
      <AddTaskBtn />

      {/* Task List */}
      <TaskList />
    </main>
  );
}

export default HomePage;
