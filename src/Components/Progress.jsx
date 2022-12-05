import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import UserDetails from './UserDetails';
import YearVal from './YearVal';
import InputData from './InputData';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
const steps = ['Please fill your data', 'Add rain fall data', 'Generate report'];

export default function HorizontalLinearStepper({ sendDataToBackend, setEnteredval, handleDepend, handleUserData, enteredval, handleChange, submit, deleteHandle, generateReport, setnoYear, setArea, setType }) {
    enteredval = enteredval.sort((a, b) => a.year - b.year)
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    console.log(enteredval, "HERRRRRRRRRR")
    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    console.log(activeStep)
    React.useEffect(() => {

    }, [enteredval])

    return (
        <Box sx={{ width: '70%', margin: "25px auto" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};

                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep == 0 ? <UserDetails handleUserData={handleUserData} /> : activeStep == 1 ? < YearVal sendDataToBackend={sendDataToBackend} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} /> : activeStep == 2 ? <InputData handleDepend={handleDepend} generateReport={generateReport} setType={setType} setArea={setArea} setnoYear={setnoYear} setEnteredval={setEnteredval} enteredval={enteredval} handleChange={handleChange} submit={submit} deleteHandle={deleteHandle} /> : ""}
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext}>

                            {activeStep === steps.length - 1 ? '' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
            {
                <div>
                    {enteredval.length > 0 ?
                        <table className='strtable'>
                            <thead>

                                <tr>
                                    <th>Sr</th>
                                    <th>Year</th>
                                    <th>Monsoon Rainfall in mm</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody style={{ overflowY: "scroll" }}>
                                {enteredval?.map((item, index) => {
                                    // console.log(item)
                                    return (<tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.year}</td>
                                        <td>{item.val}  </td>
                                        <td onClick={() => deleteHandle(item)}><DeleteForeverOutlinedIcon style={{ color: "red", }} /> </td>
                                    </tr>)
                                })}
                            </tbody>
                        </table> : ""}

                </div>
            }
        </Box>
    );
}