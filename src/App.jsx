import "./App.css";
import Task from "./Task";
import { useState, useEffect } from "react";
import { TasksContext } from "./Contexts/TasksContext";

// Mui===================================================
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Modal===============================================
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

// uuid=================================================
import { v4 as uuidv4 } from "uuid";

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

// Tasks Array=========================================
let myTasks = [
  {
    id: uuidv4(),
    title: "Task 1",
    details: "Details of Task 1",
    isChecked: false,
  },
  {
    id: uuidv4(),
    title: "Task 2",
    details: "Details of Task 2",
    isChecked: false,
  },
  {
    id: uuidv4(),
    title: "Task 3",
    details: "Details of Task 3",
    isChecked: false,
  },
];

// Theme===============================================
const theme = createTheme({
  palette: {
    primary: {
      main: "#ed6c02",
    },
  },
  typography: {
    fontFamily: ["Alexandria"],
  },
});
// Theme============================================

function App() {
  const [tasks, setTasks] = useState(myTasks);
  const [todo, setTodo] = useState({});

  useEffect(() => {
    let storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storageTasks);
  }, []);

  // Editing Modal============================
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Editing Modal Inputs======================
  const [labelValue, setLabelValue] = useState("");
  const [detailsValue, setDetailsValue] = useState("");

  // Delete Modal==========================
  const [openTwo, setOpenTwo] = useState(false);
  const handleOpenTwo = () => setOpenTwo(true);
  const handleCloseTwo = () => setOpenTwo(false);

  // Delete================================================
  function handleDelete(taskId) {
    let newTasks = tasks.filter((task) => {
      return task.id != taskId;
    });
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  // Toggle Start=========================

  const [toggle, setToggle] = useState("الكل");

  const handleChange = (event, newToggle) => {
    setToggle(newToggle);
    let storageTasks = JSON.parse(localStorage.getItem("tasks"));
    let checkedTasks = storageTasks.filter((task) => {
      return task.isChecked;
    });
    let unCheckedTasks = storageTasks.filter((task) => {
      return !task.isChecked;
    });
    if (newToggle == "الكل") {
      setTasks(storageTasks);
    } else if (newToggle == "المنجز") {
      setTasks(checkedTasks);
    } else if (newToggle == "غير المنجز") {
      setTasks(unCheckedTasks);
    }
  };

  // Toggle End==========================

  // TasksList Start==================================

  let tasksList = tasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        handleOpen={handleOpen}
        setLabelValue={setLabelValue}
        setDetailsValue={setDetailsValue}
        setTodo={setTodo}
        handleOpenTwo={handleOpenTwo}
      />
    );
  });

  // TasksList End=====================================

  // InputSection Start=================================

  const [inputValue, setInputValue] = useState("");

  function handleAdd() {
    let newTasks = [
      ...tasks,
      {
        id: uuidv4(),
        title: inputValue,
        details: "",
        isChecked: false,
      },
    ];
    setTasks(newTasks);
    setInputValue("");
    localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  // InputSection End=================================
  return (
    <ThemeProvider theme={theme}>
      <TasksContext value={{ tasks, setTasks }}>
        <Container maxWidth="sm">
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
                style={{ width: "100%", marginTop: "10px" }}
                value={labelValue}
                onChange={(e) => {
                  setLabelValue(e.target.value);
                }}
              />
              <TextField
                id="standard-basic"
                label="التفاصيل"
                variant="standard"
                style={{ width: "100%", marginTop: "10px" }}
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
                      if (t.id == todo.id) {
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
          {/*========= Updating Modal End ========*/}

          {/*========= Delete Modal Start ===========*/}

          <Modal
            open={openTwo}
            onClose={handleCloseTwo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                هل انت متأكد من رغبتك في حذف المهمة؟
              </Typography>
              <p>لا يمكنك التراجع عن الحذف بعد اتمامه</p>
              <div style={{ textAlign: "left", marginTop: "10px" }}>
                <Button
                  onClick={handleCloseTwo}
                  style={{ fontSize: "20px", padding: "0" }}
                  color="primary"
                >
                  اغلاق
                </Button>
                <Button
                  onClick={() => {
                    handleCloseTwo();
                    handleDelete(todo.id);
                  }}
                  style={{ fontSize: "20px", padding: "0" }}
                  color="primary"
                >
                  نعم قم بالحذف
                </Button>
              </div>
            </Box>
          </Modal>

          {/*========= Delete Modal End ===========*/}

          <Box
            sx={{
              p: 1,
              backgroundColor: "white",
              color: "black",
              minWidth: "500px",
              maxHeight: "80vh",
              overflowY: "scroll",
            }}
          >
            <h1 style={{ margin: "0" }}>مهامي</h1>

            <hr style={{ color: "#80808030" }} />

            <Box sx={{ marginTop: "20px", direction: "ltr" }}>
              <ToggleButtonGroup
                color="primary"
                value={toggle}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="غير المنجز">غير المنجز</ToggleButton>
                <ToggleButton value="المنجز">المنجز</ToggleButton>
                <ToggleButton value="الكل">الكل</ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/*======= TasksList Start ==========*/}

            <Box
              component="section"
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
              }}
            >
              {tasksList}
            </Box>

            {/*======= TasksList End ==========*/}

            {/*======= InputSection Start=========*/}

            <Box component="section" sx={{ p: 2, display: "flex" }}>
              <TextField
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                id="outlined-basic"
                label="عنوان المهمة"
                variant="outlined"
                sx={{ flex: "3", marginLeft: "10px", direction: "ltr" }}
              />
              <Button
                onClick={handleAdd}
                variant="contained"
                color="primary"
                sx={{ flex: "1" }}
                disabled={inputValue.length == 0}
              >
                اضافة
              </Button>
            </Box>

            {/*======= InputSection End=========*/}
          </Box>
        </Container>
      </TasksContext>
    </ThemeProvider>
  );
}

export default App;
