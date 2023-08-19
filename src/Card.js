import React from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AssignmentLateIcon from "@mui/icons-material/AssignmentLate";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import SignalCellularAlt2BarIcon from "@mui/icons-material/SignalCellularAlt2Bar";
import SignalCellularAlt1BarIcon from "@mui/icons-material/SignalCellularAlt1Bar";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Badge } from "@mui/material";

function Card({ card, groupValue, grouping, users }) {
  let prior;
  let isprior = true;

  if (grouping !== "priority") {
    isprior = false;
    switch (card.priority) {
      case 4:
        prior = (
          <AssignmentLateIcon
            sx={{ fontSize: 10 }}
            color="warning"
            className=""
          />
        );

        break;

      case 3:
        prior = <SignalCellularAltIcon sx={{ fontSize: 10 }} className="" />;

        break;

      case 2:
        prior = (
          <SignalCellularAlt2BarIcon sx={{ fontSize: 10 }} className="" />
        );

        break;

      case 1:
        prior = (
          <SignalCellularAlt1BarIcon sx={{ fontSize: 10 }} className="" />
        );

        break;

      case 0:
        prior = (
          <MoreHorizIcon sx={{ fontSize: 13 }} className="" color="disabled" />
        );

        break;

      default:
        break;
    }
  }

  let stat;

  if (grouping !== "status") {
    switch (card.status) {
      case "Todo":
        stat = (
          <CircleOutlinedIcon
            sx={{ fontSize: 10 }}
            color="disabled"
            className="space"
          />
        );

        break;

      case "In progress":
        stat = (
          <AccessTimeFilledIcon
            sx={{ fontSize: 10 }}
            color="warning"
            className="space"
          />
        );

        break;

      case "Backlog":
        stat = (
          <CheckCircleIcon
            sx={{ fontSize: 10 }}
            color="primary"
            className="space"
          />
        );

        break;

      default:
        break;
    }
  }

  let setuser1 = true;
  if (grouping === "userId") {
    setuser1 = false;
    switch (card.user) {
      case "Todo":
        stat = (
          <CircleOutlinedIcon
            sx={{ fontSize: 10 }}
            color="disabled"
            className="space"
          />
        );

        break;

      case "In progress":
        stat = (
          <AccessTimeFilledIcon
            sx={{ fontSize: 10 }}
            color="warning"
            className="space"
          />
        );

        break;

      case "Backlog":
        stat = (
          <CheckCircleIcon
            sx={{ fontSize: 10 }}
            color="primary"
            className="space"
          />
        );

        break;

      default:
        break;
    }
  }

  const user = users.find((user) => user.id === card.userId);
  return (
    <div className={`card ${card.tag[0].toLowerCase()}`}>
      <div className="card-header">
        <span className="card-id">{card.id}</span>

        {setuser1 === true && (
          <Badge
            overlap="circular"
            className="Badge"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <FiberManualRecordIcon color="primary" sx={{ fontSize: 5 }} />
            }
          >
            <img
              className="user-avatar"
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={card.userId}
            />
          </Badge>
        )}
      </div>
      <h3 className="card-title">
        {stat}
        {card.title}
      </h3>
      <div className="feature-req">
        {isprior !== true && <div className="ass">{prior}</div>}

        <div className="tag">
          <FiberManualRecordIcon color="disabled" sx={{ fontSize: 12 }} />{" "}
          {card.tag[0]}
        </div>
      </div>
      <div className="card-info-container"></div>
    </div>
  );
}

export default Card;
