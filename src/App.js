import React, { useEffect, useState } from "react";
import axios from "axios";
import KanbanBoard from "./KanbanBoard";
import { Select, MenuItem } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState("status"); // Default grouping by status
  const [sorting, setSorting] = useState("priority"); // Default sorting by priority
  const [displayOptions, setDisplayOptions] = useState(false); // State for showing/hiding select elements

  useEffect(() => {
    axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => {
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDisplayClick = () => {
    setDisplayOptions(!displayOptions);
  };

  return (
    <div className="app">
      <div className="displayButton" onClick={handleDisplayClick}>
        <TuneRoundedIcon sx={{ fontSize: 15 }} />
        Display
        <ExpandMoreIcon sx={{ fontSize: 15 }} />
      </div>
      {displayOptions && (
        <div className="selectOptions">
          <div className="controls">
            <div className="grouping">
              Grouping
              <Select
                id="sorting-select"
                value={grouping}
                onChange={(e) => setGrouping(e.target.value)}
              >
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="userId">User</MenuItem>
                <MenuItem value="priority">Priority</MenuItem>
              </Select>
            </div>

            <div className="ordering">
              Ordering
              <Select
                id="sorting-select"
                value={sorting}
                onChange={(e) => setSorting(e.target.value)}
              >
                <MenuItem value="priority">Priority</MenuItem>
                <MenuItem value="title">Title</MenuItem>
              </Select>
            </div>
          </div>
        </div>
      )}
      <KanbanBoard
        tickets={tickets}
        users={users}
        grouping={grouping}
        sorting={sorting}
      />
    </div>
  );
}

export default App;
