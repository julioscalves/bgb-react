import { useState } from "react";

import TextField from "@mui/material/TextField";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const moment = require("moment");

const auctionMinDate = () => {
  const currentDate = new Date();
  const minDate = currentDate.setHours(currentDate.getHours() + 24);

  return minDate;
};

const auctionMaxDate = () => {
  const currentDate = new Date();
  const maxDate = currentDate.setMonth(currentDate.getMonth() + 12);

  return maxDate;
};

function SelectDate(props) {
  const [endingDate, setEndingDate] = useState("");

  const handleEndingDateChange = (event) => {
    const date = moment(new Date(event));
    setEndingDate(date);
    props.onChangeUserData({ ending_date: date.format("DD/MM/yyyy HH:mm") });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Encerramento"
        ampm={false}
        ampmInClock={false}
        inputFormat={"dd/MM/yyyy HH:mm"}
        minDateTime={auctionMinDate()}
        maxDate={auctionMaxDate()}
        value={endingDate}
        onChange={(e) => handleEndingDateChange(e)}
        renderInput={(props) => (
          <TextField
            {...props}
            id="datetime-ending-formfield"
            label="Encerramento"
            variant="standard"
            value={endingDate}
            required
            fullWidth
            sx={{ mt: 2, ml: 2 }}
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default SelectDate;
