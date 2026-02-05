import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useContext } from "react";
import { TasksContext } from "./Contexts/TasksContext";
import "./Task.css";

import Typography from "@mui/material/Typography";

export default function Task({
  task,
  handleOpen,
  setLabelValue,
  setDetailsValue,
  setTodo,
  handleOpenTwo,
}) {
  // Context=========================
  const { tasks, setTasks } = useContext(TasksContext);

  // Edit============================================
  function handleEdit(taskId) {
    let newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        setLabelValue(task.title);
        setDetailsValue(task.details);
        setTodo(task);
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  // Check==============================================
  function handleCheck(taskId) {
    let newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        return { ...task, isChecked: !task.isChecked };
      } else {
        return task;
      }
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <Box className="task-box">
      {/* Tasks Title and Details */}
      <Stack spacing={2} sx={{ flex: "1.5", justifyContent: "center" }}>
        <h2
          className="task-title"
          style={{
            textDecoration: task.isChecked ? "line-through" : "none",
          }}
        >
          {task.title}
        </h2>
        {task.details != "" ? (
          <p className="task-details">{task.details}</p>
        ) : (
          ""
        )}
      </Stack>
      {/*================ Tasks Title and Details ===================*/}

      {/* Tasks Icons */}
      <Stack
        direction="row"
        sx={{
          flex: "1",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <IconButton
          className={task.isChecked ? "icon-btn icon-btn--check" : "icon-btn"}
          onClick={() => {
            handleCheck(task.id);
          }}
        >
          <CheckIcon />
        </IconButton>

        <IconButton
          className="icon-btn icon-btn--blue"
          onClick={() => {
            handleOpen();
            handleEdit(task.id);
          }}
        >
          <EditOutlinedIcon />
        </IconButton>

        <IconButton
          className="icon-btn icon-btn--red"
          onClick={() => {
            handleOpenTwo();
            setTodo(task);
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
      {/*============= Tasks Icons ================*/}
    </Box>
  );
}
