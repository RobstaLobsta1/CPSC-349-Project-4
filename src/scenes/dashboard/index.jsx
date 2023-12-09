import React from "react";
import { Box, Grid } from "@mui/material";
import PieChart from "../../components/PieChart";
import Expenses from "../../components/Expenses";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="5px">
      <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box height="450px">
            <PieChart />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} display="flex" justifyContent="center">
          <Box width="80%">
            <Expenses />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
