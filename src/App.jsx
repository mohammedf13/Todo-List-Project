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

// uuid=================================================
import { v4 as uuidv4 } from "uuid";

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
});
// Theme============================================

function App() {
  const [tasks, setTasks] = useState(myTasks);

  useEffect(() => {
    let storageTasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
    setTasks(storageTasks);
  }, []);

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
    return <Task key={task.id} task={task} />;
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
