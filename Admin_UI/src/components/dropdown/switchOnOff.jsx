import React, { useState } from "react";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const OnOffDropdown = () => {
  const [status, setStatus] = useState("On");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select value={status} onChange={handleChange} >
        <MenuItem value="On">On</MenuItem>
        <MenuItem value="Off">Off</MenuItem>
      </Select>
    </FormControl>
  );
};

export default OnOffDropdown;
