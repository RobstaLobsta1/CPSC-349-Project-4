import React from "react";
import { Box, Typography } from "@mui/material";

const Legend = ({ data }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="secondary" 
      p={2}
      borderRadius={4}
    >
      {data.map((item) => (
        <Box key={item.id} display="flex" alignItems="center">
          <Box
            width={18}
            height={18}
            borderRadius="50%"
            bgcolor={"secondary"}
            mr={1}
          />
          <Typography variant="h4" color="secondary">
            {`${item.label} : $${item.value} | ${item.percentage}%`}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Legend;

