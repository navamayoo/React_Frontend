import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardDisplay(props) {

    const {title, description} = props;
  return (
    <Card sx={{ maxWidth: flex }}>

      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {description}
        </Typography>
      </CardContent>
      <CardActions>
      <Control.Button
            text="Add New"
            variant="outlined"
            onClick={() => {
              setOpenPopup(true);
            }}
            startIcon={<AddIcon />}
          />
      </CardActions>
    </Card>
  );
}
