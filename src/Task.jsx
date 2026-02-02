import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useState, useContext } from "react";
import { TasksContext } from "./Contexts/TasksContext";

// Modal
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  color: "black",
  direction: "rtl",
};

export default function Task({ task }) {
  // Context=========================
  const { tasks, setTasks } = useContext(TasksContext);

  // Editing Modal============================
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete Modal==========================
  const [openTwo, setOpenTwo] = useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  // Editing Modal Inputs======================
  const [labelValue, setLabelValue] = useState("");
  const [detailsValue, setDetailsValue] = useState("");

  // Edit============================================
  function handleEdit(taskId) {
    let newTasks = tasks.map((task) => {
      if (task.id == taskId) {
        setLabelValue(task.title);
        setDetailsValue(task.details);
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

  // Delete================================================
  function handleDelete(taskId) {
    let newTasks = tasks.filter((task) => {
      return task.id != taskId;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "15px",
          backgroundColor: "#283593",
          color: "white",
          padding: "20px",
          transition: "0.2s",
          "&: hover": {
            paddingTop: "30px",
            paddingBottom: "30px",
            boxShadow: "0px 5px 5px rgba(0,0,0,0.4)",
          },
          borderRadius: "5px",
        }}
      >
        {/* Tasks Title and Details */}
        <Stack spacing={2} sx={{ flex: "1.5" }}>
          <h2
            style={{
              margin: "0",
              width: "fit-content",
              textDecoration: task.isChecked ? "line-through" : "none",
            }}
          >
            {task.title}
          </h2>
          <p style={{ margin: "0", width: "fit-content" }}>{task.details}</p>
        </Stack>
        {/*================ Tasks Title and Details ===================*/}

        {/* Tasks Icons */}
        <Stack
          direction="row"
          sx={{ flex: "1", justifyContent: "space-between" }}
        >
          <IconButton
            onClick={() => {
              handleCheck(task.id);
            }}
            sx={{
              background: task.isChecked ? "green" : "white",
              color: task.isChecked ? "white" : "green",
              border: task.isChecked ? "2px solid white" : "2px solid green",
              "&: hover": { background: "#b1a9a9" },
              padding: "12px",
            }}
          >
            <CheckIcon />
          </IconButton>

          <IconButton
            sx={{
              background: "white",
              color: "blue",
              border: "2px solid blue",
              "&: hover": { background: "#b1a9a9" },
              padding: "12px",
            }}
            onClick={() => {
              handleOpen();
              handleEdit(task.id);
            }}
          >
            <EditOutlinedIcon />
          </IconButton>

          <IconButton
            sx={{
              background: "white",
              color: "red",
              border: "2px solid red",
              "&: hover": { background: "#b1a9a9" },
              padding: "12px",
            }}
            onClick={() => {
              handleOpenTwo();
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
        {/*============= Tasks Icons ================*/}
      </Box>

      {/*========= Updating Modal Start ========*/}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            تعديل المهمة
          </Typography>
          <TextField
            id="standard-basic"
            label="العنوان"
            variant="standard"
            style={{ width: "100%" }}
            value={labelValue}
            onChange={(e) => {
              setLabelValue(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="التفاصيل"
            variant="standard"
            style={{ width: "100%" }}
            value={detailsValue}
            onChange={(e) => {
              setDetailsValue(e.target.value);
            }}
          />
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <Button
              onClick={handleClose}
              style={{ fontSize: "20px", padding: "0" }}
              color="primary"
            >
              الغاء
            </Button>
            <Button
              onClick={() => {
                handleClose();
                let newTasks = tasks.map((t) => {
                  if (t.id == task.id) {
                    t.title = labelValue;
                    t.details = detailsValue;
                  }
                  return t;
                });
                setTasks(newTasks);
                localStorage.setItem("tasks", JSON.stringify(newTasks));
              }}
              style={{ fontSize: "20px", padding: "0" }}
              color="primary"
            >
              تعديل
            </Button>
          </div>
        </Box>
      </Modal>

      {/*========= Updating Modal End ==========*/}

      {/*========= Delete Modal Start ===========*/}

      <Modal
        open={openTwo}
        onClose={handleCloseTwo}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            هل انت متأكد؟
          </Typography>
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <Button
              onClick={handleCloseTwo}
              style={{ fontSize: "20px", padding: "0" }}
              color="primary"
            >
              الغاء
            </Button>
            <Button
              onClick={() => {
                handleCloseTwo();
                handleDelete(task.id);
              }}
              style={{ fontSize: "20px", padding: "0" }}
              color="primary"
            >
              حذف
            </Button>
          </div>
        </Box>
      </Modal>

      {/*========= Delete Modal End ===========*/}
    </>
  );
}
