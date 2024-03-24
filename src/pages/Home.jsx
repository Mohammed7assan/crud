import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getuser, deluser } from "../redux/usersSlice";
import { useDispatch } from "react-redux";

import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Padding } from "@mui/icons-material";
import Swal from "sweetalert2";
const intialvalue = {
  Category: "",
  subCategory: "",
  priority: "",
  Agent: "",
  Requester: "",
  SRNumber: "",
  
};
const Home = () => {
  const [data, setdata] = useState(intialvalue);

  let dispatch = useDispatch();
  async function getUsersFun() {
    let data = await dispatch(getuser());
    //  console.log(data.payload);
    setdata(data.payload);
    setrecord(data.payload);

  }
  async function deluserFun(row) {
    Swal.fire({
      title:`Are you sure to delete ${row.SRNumber} ?`,
      showCancelButton:true,
    }).then((res)=>{
      if(res.isConfirmed)
      {
        let data =  dispatch(deluser(row.id));
        console.log(data.payload);
        toast.success("تم الحذف بنجاح");
        
      }
      getUsersFun();
    })
  }
  useEffect(() => {
    getUsersFun();
    //  console.log(data);
  }, []);
  const [record, setrecord] = useState();

  const FilterRequester = (e) => {
    setrecord(data?.filter((f) => f.Requester.toLowerCase().includes(e.target.value)));
  };
  const FilterStatus = (e) => {
    setrecord(data?.filter((f) => f.Status.includes(e.target.value)));
  };
  const FilterSRNumber = (e) => {
    setrecord(data?.filter((f) => f.SRNumber.toLowerCase().includes(e.target.value)));
  };
  const serchfun = (e) => {
    setrecord(data?.filter((f) => f.SRNumber.toLowerCase().includes(e.target.value)));

  }
  
  return (
    <>
    <Typography>
      <box sx={{
                    "& > :not(style)": { m: 2, width: "100ch" },
                  }}>  
      <div className="col-md-8">
        <br></br>
        <div className="row"  >
          <Link className="nav-link" to="add">
            <Button
              color="primary"
              variant="contained"
              style={{ marginRight: 30, marginLeft:20 }}
            >
              Add
            </Button>
          </Link>
        </div>
        <div className="row">
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label" >
              Search
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="Match"
                control={<Radio />}
                label="Match"
              />
              <FormControlLabel value="All" control={<Radio />} label="All" />
              <FormControlLabel value="Any" control={<Radio />} label="Any" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="row">
          <div className="col-md-6 text-align-center">
            <TextField
              fullWidth
              label="SRNumber"
              id="SRNumber"
              name="SRNumber"
              variant="outlined"
              value={data.SRNumber}
               onChange={FilterSRNumber}
            />
            <br />
            <br />

            <TextField
              fullWidth
              id="Requester"
              label="Requester"
              variant="outlined"
               onChange={FilterRequester}
            />
          </div>
          <div className="col-md-6">
            <FormControl fullWidth>
              <InputLabel id="Status">Status</InputLabel>
              <Select labelId="Status"
                        id="Status"
                        name="Status"
                        value={data.Status}
                        label="Status"
                         onChange={FilterStatus}
                        >
                <MenuItem value="Assigned">Assigned</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Closed">Closed</MenuItem>
              </Select>
            </FormControl>
            <br />
            <br />

            <TextField
              fullWidth
              id="Subject"
              label="Subject"
              variant="outlined"
              //  onChange={FilterSubject}
            />
          </div>
        </div>
        <br />
        <div className="row">
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="error">
              Advanced
            </Button>
            <Button variant="contained" color="error" type="submit" onChange={serchfun} >
              Search
            </Button>
            <Button variant="contained" color="error" 
            >
              Reset
            </Button>
          </Stack>
        </div>
        <br />
      </div>
      </box>
      </Typography>
      {/* //////////// */}
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">SR Number</TableCell>
              <TableCell align="center">Category</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Requester</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {record?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" key={row.SRNumber}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {row.avatar}
                  </Avatar>
                </TableCell>
                <TableCell align="center">{row.SRNumber}</TableCell>
                <TableCell align="center">{row.Category}</TableCell>
                <TableCell align="center">{row.Status}</TableCell>
                <TableCell align="center">{row.Requester}</TableCell>
                <TableCell align="center">
                  <Link to={`/edit/${row.id}`}>
                    <Button
                      color="success"
                      variant="contained"
                      style={{ marginRight: 10 }}
                      onClick={() => {
                        console.log(row.id);
                      }}
                    >
                      Update
                    </Button>
                  </Link>

                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => deluserFun(row)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Home;
