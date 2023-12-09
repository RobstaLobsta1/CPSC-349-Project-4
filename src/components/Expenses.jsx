import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  useTheme,
  MenuItem,
  Select,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import Header from "../components/Header";
import {
  getExpenses,
  createExpense,
  deleteExpense,
} from "../lib/pocketbase";

const spendingCategories = [
  "Food",
  "Transportation",
  "Housing",
  "Entertainment",
  "Utilities",
  "Investments",
  "Shopping",
  "Others",
];

const Expenses = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to hold the fetched expenses
  const [expenses, setExpenses] = useState([]);

  // Fetch all data from the 'expenses' collection in PocketBase
  useEffect(() => {
    getExpenses().then((res) => setExpenses(res));
  }, []);

  const [expenseName, setExpenseName] = useState(null);
  const [expenseValue, setExpenseValue] = useState(null);
  const [expenseCategory, setExpenseCategory] = useState(null);

  const handleNameChange = (event) => {
    setExpenseName(event.target.value);
  };

  const handleValueChange = (event) => {
    setExpenseValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setExpenseCategory(event.target.value);
  };

  const handleAddExpense = async () => {
    try {
      const newExpense = await createExpense(
        expenseName,
        parseFloat(expenseValue),
        expenseCategory
      );

      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setExpenseValue("");
      setExpenseCategory("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
    window.location.reload();
  };

  const handleDeleteExpense = async (id) => {
    deleteExpense(id)
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "amount", headerName: "Cost", flex: 1 },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      valueGetter: (params) => params.row.category || "N/A",
    }, // Display 'N/A' if category is undefined
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => handleDeleteExpense(params.row.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header subtitle="Input your expenses here" />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        m="20px 0"
      >
        <TextField
          label="Expense Name"
          value={expenseName}
          onChange={handleNameChange}
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <TextField
          label="Expense Value"
          value={expenseValue}
          onChange={handleValueChange}
          variant="outlined"
          margin="dense"
          fullWidth
        />
        <Select
          value={expenseCategory}
          onChange={handleCategoryChange}
          variant="outlined"
          displayEmpty
          fullWidth
          renderValue={(selected) => (selected ? selected : "Category")}
        >
          <MenuItem disabled value="">
            Category
          </MenuItem>
          {spendingCategories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="secondary" onClick={handleAddExpense}>
          Add Expense
        </Button>
      </Box>

      <Box
        height="calc(100vh - 280px)"
        sx={
          {
            
          }
        }
      >
        <DataGrid rows={expenses} columns={columns} />
      </Box>
    </Box>
  );
};

export default Expenses;