/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import Card from "./Card";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import { Badge } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function Column({
  groupValue,
  cards,
  sorting,
  statusCount,
  priorityCount,
  userCount,
  grouping,
  users,
}) {
  const sortedCards = [...cards].sort((a, b) => {
    if (sorting === "priority") {
      return b.priority - a.priority;
    } else {
      return a.title.localeCompare(b.title);
    }
  });

  let icon;
  if (groupValue === "Todo") {
    icon = (
      <CircleOutlinedIcon
        sx={{ fontSize: 10 }}
        color="disabled"
        className="space"
      />
    );
  } else if (groupValue === "In progress") {
    icon = (
      <AccessTimeFilledIcon
        sx={{ fontSize: 10 }}
        color="warning"
        className="space"
      />
    );
  } else if (groupValue === "Backlog") {
    icon = (
      <CheckCircleIcon
        sx={{ fontSize: 10 }}
        color="primary"
        className="space"
      />
    );
  } else if (groupValue === 4) {
    icon = (
      <AssignmentLateIcon
        sx={{ fontSize: 10 }}
        color="warning"
        className="space"
      />
    );
    groupValue = "Urgent";
  } else if (groupValue === 3) {
    icon = <SignalCellularAltIcon sx={{ fontSize: 10 }} className="space" />;
    groupValue = "High";
  } else if (groupValue === 2) {
    icon = (
      <SignalCellularAlt2BarIcon sx={{ fontSize: 10 }} className="space" />
    );
    groupValue = "Medium";
  } else if (groupValue === 1) {
    icon = (
      <SignalCellularAlt1BarIcon sx={{ fontSize: 10 }} className="space" />
    );
    groupValue = "Low";
  } else if (groupValue === 0) {
    icon = (
      <MoreHorizIcon sx={{ fontSize: 13 }} className="space" color="disabled" />
    );
    groupValue = "No Priority";
  }

  let user;
  cards.map((card) => user = users.find((user) => user.id === card.userId));

  // eslint-disable-next-line no-lone-blocks
  {
    if (grouping === "userId") {
      icon = (
        <Badge
          overlap="circular"
          className="Badge1"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <FiberManualRecordIcon color="secondary" sx={{ fontSize: 5 }} />
          }
        >
          {/* Display the user's initials */}

          <img
            className="user-avatar"
            src={`https://ui-avatars.com/api/?name=${user.name}`}
          />
        </Badge>
      );
    }
  }

  return (
    <div className="column">
      <div className="statusDiv">
        <div className="left">
          {icon} {groupValue}
          <div className="status-counts">
            {statusCount && <span className="status-count">{statusCount}</span>}
            {priorityCount && (
              <span className="status-count">{priorityCount}</span>
            )}
            {userCount && <span className="status-count">{userCount}</span>}
          </div>
        </div>
        <div className="right">
          <AddIcon sx={{ fontSize: 13 }} />
          <MoreHorizIcon sx={{ fontSize: 13 }} />
        </div>
      </div>

      {sortedCards.map((card) => (
        <Card
          key={card.id}
          card={card}
          groupValue={groupValue}
          grouping={grouping}
          users={users}
        />
      ))}
    </div>
  );
}

export default Column;
