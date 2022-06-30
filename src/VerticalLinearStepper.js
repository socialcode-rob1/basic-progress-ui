import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import RocketIcon from '@mui/icons-material/Rocket';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ReactJson from '@microlink/react-json-view';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import Slide from '@mui/material/Slide';
import './App.css';

const defaultSteps = [
  {
    label: 'Select campaign settings',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [steps, setSteps] = React.useState(defaultSteps);
  const [bufferSteps, setBufferSteps] = React.useState(defaultSteps);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setBufferSteps(steps);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onUpdate = () => {
    setSteps()
  };

  const handleCloseSave = () => {
    handleReset();
    setSteps(bufferSteps)
    setOpen(false);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                        <RocketIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Agenda Progress UI
                    </Typography>
                    <Button color="inherit" onClick={handleClickOpen}>Config</Button>
                </Toolbar>
            </AppBar>
        </Box>
        <div className="App-header">
        <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel
                optional={
                    index === steps.length - 1 ? (
                    <Typography variant="caption">Last step</Typography>
                    ) : null
                }
                >
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        {index === steps.length - 1 ? 'Finish' : 'Continue'}
                    </Button>
                    <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Back
                    </Button>
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
            </Button>
            </Paper>
        )}
        </Box>
        </div>
        <Dialog open={open} onClose={handleClose} fullScreen TransitionComponent={Transition} >
            <AppBar sx={{ position: 'relative' }}>
            <Toolbar>
                <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                >
                <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    Steps
                </Typography>
                <Button autoFocus color="inherit" onClick={handleCloseSave}>
                    Apply
                </Button>
            </Toolbar>
            </AppBar>            
            <DialogTitle>Steps</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To define steps please fill in the array below.
                </DialogContentText>
                <ReactJson 
                    src={steps} 
                    displayDataTypes={false}
                    onEdit={e => {
                        console.log("edit callback", e)
                        if (e.new_value == "error") {
                            return false
                        }
                        setBufferSteps(e.updated_src);
                    }}
                    onDelete={e => {
                        console.log("delete callback", e)
                        setBufferSteps(e.updated_src);
                    }}
                    onAdd={e => {
                        console.log("add callback", e)
                        if (e.new_value == "error") {
                            return false
                        }
                        setBufferSteps(e.updated_src);
                    }}
                    enableClipboard={copy => {
                        console.log("you copied to clipboard!", copy)
                    }}
                />
            </DialogContent>
            {/* <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleCloseSave}>Update</Button>
            </DialogActions> */}
        </Dialog>
    </>
  );
}
