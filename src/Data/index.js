const data = {
  cards: {
    "feature-1": {
      id: "feature-1",
      name: "A feature requested from user to improve overall efficiency."
    },
    "backlog-2": {
      id: "backlog-2",
      name:
        "Enhancement requested from product owner to improve overall design."
    }
  },
  columns: {
    todos: {
      id: "todos",
      title: "Todos",
      ids: []
    },
    doing: {
      id: "doing",
      title: "Doing",
      ids: []
    },
    completed: {
      id: "completed",
      title: "Completed",
      ids: []
    },
    qa: {
      id: "qa",
      title: "QA",
      ids: []
    },
    closed: {
      id: "closed",
      title: "Closed",
      ids: []
    },
    backlog: {
      id: "backlog",
      title: "Backlog",
      ids: ["feature-1", "backlog-2"]
    }
  },
  columnsort: ["todos", "doing", "completed", "qa", "closed", "backlog"]
};
export default data;
