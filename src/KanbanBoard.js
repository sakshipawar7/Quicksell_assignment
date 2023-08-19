import React from "react";
import Column from "./Column";

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const groupOptions = {
    status: ["Todo", "In progress", "Backlog"],
    userId: users.map((user) => user.name),
    priority: [0, 4, 3, 2, 1],
  };

  const groupedTickets = {};

  const statusCounts = { Todo: 0, "In progress": 0, Backlog: 0 };
  const priorityCounts = { 4: 0, 3: 0, 2: 0, 1: 0, 0: 0 };
  const userCounts = {};

  tickets.forEach((ticket) => {
    let groupValue = ticket[grouping];

    if (grouping === "userId") {
      const user = users.find((user) => user.id === groupValue);
      if (user) {
        groupValue = user.name;
      }

      if (!userCounts[groupValue]) {
        userCounts[groupValue] = 0;
      }
      userCounts[groupValue]++;
    } else if (grouping === "status") {
      statusCounts[groupValue]++;
    } else if (grouping === "priority") {
      priorityCounts[groupValue]++;
    }

    if (!groupedTickets[groupValue]) {
      groupedTickets[groupValue] = [];
    }
    groupedTickets[groupValue].push(ticket);
  });

  return (
    <div className="kanban-board">
      {groupOptions[grouping].map((groupValue) => (
        <Column
          key={groupValue}
          groupValue={groupValue}
          tickets={groupedTickets[groupValue] || []}
          sorting={sorting}
          statusCount={statusCounts[groupValue]}
          priorityCount={priorityCounts[groupValue]}
          userCount={userCounts[groupValue]}
          grouping={grouping}
          users={users}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
