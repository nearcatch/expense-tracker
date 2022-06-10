import React, { useState } from "react";
import { Link } from "react-router-dom";

<<<<<<< HEAD
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
=======
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
>>>>>>> 5ed5a0904b479091f2210c3b9c82c9ac80e0524f

import { useMutation } from "@apollo/client";
import { ADD_EXPENSE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const ExpenseForm = ({ projectId }) => {
  const [expenseText, setExpenseText] = useState("");
  const [expenseCount, setExpenseCount] = useState("");
  const [expensePrice, setExpensePrice] = useState("");

  const [addExpense, { error }] = useMutation(ADD_EXPENSE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addExpense({
        variables: {
          projectId,
          expenseText,
          expenseCount,
          expensePrice,
        },
      });

      setExpenseText("");
      setExpenseCount(0);
      setExpensePrice(0.0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "expenseText") {
      setExpenseText(value);
    }
    if (name === "expenseCount") {
      let intValue = Number(value);
      setExpenseCount(intValue);
    }
    if (name === "expensePrice") {
      let intValue = Number(value);
      setExpensePrice(intValue);
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <form
          onSubmit={handleFormSubmit}
          // style={{ marginLeft: "2rem", marginRight: "2rem" }}
        >
          <Input
            placeholder="item..."
            name="expenseText"
            value={expenseText}
            onChange={handleChange}
            sx={{ width: "25%", paddingLeft: "1rem" }}
          />
          <Input
            placeholder="unit count..."
            name="expenseCount"
            type="number"
            value={expenseCount}
            onChange={handleChange}
            sx={{ width: "25%", paddingLeft: "2rem", textAlign: "right" }}
          />
          <Input
            placeholder="unit price..."
            name="expensePrice"
            type="number"
            value={expensePrice}
            onChange={handleChange}
            sx={{ width: "25%", paddingLeft: "2rem" }}
          />
          <Button
            size="small"
            style={{ width: "25%", cursor: "pointer" }}
            type="submit"
            variant="outlined"
          >
            ➕
          </Button>
        </form>
      ) : (
        <p>
          You need to be logged in to register your expenses for a project.
          Please <Link to="/login">login</Link> or{" "}
          <Link to="/signup">signup.</Link>
        </p>
      )}
    </>
  );
};

export default ExpenseForm;
