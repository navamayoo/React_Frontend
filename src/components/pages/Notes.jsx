import React, { useState, useEffect } from "react";
import PageHeader from "../layout/PageHeader";
import NotesForm from "./NotesForm";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Control from "../controls/Control";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import Popup from "../controls/Dialog/Popup";
import NotesService from "../../service/NotesService";

export default function Notes() {
  const [openPopup, setOpenPopup] = useState(false);
  const [records, setRecords] = useState({});
  const [selectedCode, setSelectedCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [FormSubmitted, setFormSubmitted] = useState(0);


  const getNotes = async () => {
    await NotesService.getAll()
      .then((response) => {
        setRecords(response.Notes);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getNotes();
  }, []);




  return (
    <>
      <PageHeader title="Notes" icon={<MenuBookIcon fontSize="large" />} />
      <Paper
        elevation={0}
        variant="outlined"
        style={{ margin: "16px 0px", padding: 10 }}
      >
        <Toolbar>
          <Control.Button
            text="Add New"
            variant="outlined"
            onClick={() => {
              setOpenPopup(true);
            }}
            startIcon={<AddIcon />}
          />
        </Toolbar>
      </Paper>

      <Paper
        elevation={0}
        variant="outlined"
        style={{ margin: "16px 0px", padding: 10 }}
      >
        <Toolbar>
        <Grid justify="center">
        {records.length > 0
            ? records.map((record) => (
                <Card  m={5} p={5} spacing={2}  key={record.code}>
                  <CardContent>
                  <Typography gutterBottom variant="body2" component="div">
                    {record.code} 
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                    <u>{record.title}</u>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {record.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  <Control.Button
                         
                          color="primary"
                          text="Update"
                      variant="outlined"
                          onClick={() => {
                             setOpenPopup(true);
                             setSelectedCode(record.code);
                             
                            // setLoading(false);
                          }}
                          startIcon={<EditIcon />}
                        />
                         

                        <Control.Button text="Delete"  variant="outlined" color="warning" startIcon={<DeleteIcon />}/>
                       
                  </CardActions>
                </Card>
                
              ))
            : "Loading"}
        </Grid>

            
        </Toolbar>
      </Paper>

      <Popup
        title={selectedCode !=null ? "Update Note": "Create New Note"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <NotesForm 
          electedNoteCode={selectedCode}
          loading={loading}
          setLoading={(val) => setLoading(val)}
          setFormSubmitted={setFormSubmitted}
        />
      </Popup>
    </>
  );
}
