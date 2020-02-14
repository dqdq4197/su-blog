import React,{useCallback} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import SaveIcon from '@material-ui/icons/Save';
import PrintIcon from '@material-ui/icons/Print';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import FacebookShare from '../../lib/ShareBtn/FacebookShare';
import ClipBoard from '../../lib/snackbar/ClipBoard';
import {useHistory,useLocation} from 'react-router-dom';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';




export default function ToggleDial({id,author, width , left}) {

  const useStyles = makeStyles(theme => ({
    root: {
      width,
      left,
      height: 100,
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position:'fixed',
      zIndex:100,
      bottom:0,
    },
    speedDial: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = React.useState(false);
  const [valid, setValid] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

    const copyAddress = () => {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = window.document.location.href;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    setSnack(true);
    setValid(!valid)
  }
  
  const movePoster = () => {
    console.log(location);
    history.push(location.pathname)
  }

  const actions = [
    { icon: <FileCopyIcon/>, name: 'Copy', onclick:copyAddress },
    { icon: <PrintIcon />, name: 'Print' },
    // { icon: <FacebookShare path={`/poster/${id}/${author}`}/>, name: 'Share' },
    { icon: <FavoriteIcon />, name: 'Like' },
    { icon: <OpenInNewIcon />, name: 'openPoster', onclick:movePoster },
  ];
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const OpenSnack = useCallback(() => (
    snack ? <ClipBoard ok={snack}/>: null
  ),[valid])

  return (
    <div className={classes.root}>
      <OpenSnack />
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onclick}
          />
        ))}
      </SpeedDial>
    </div>
  );
}