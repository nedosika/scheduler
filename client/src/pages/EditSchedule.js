import React from 'react';
import {useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import SaveIcon from '@mui/icons-material/Save';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Stack from "@mui/material/Stack";
import Slide from '@mui/material/Slide';
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";

import BackButton from "../components/BackButton";
import useActions from "../hooks/useActions";
import {RouteNames} from "../utils/consts";
import Layout from "../components/Layout";
import Masonry from "@mui/lab/Masonry";
import MasonryItem from "@mui/lab/MasonryItem";

import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const EditSchedule = () => {
    const {id} = useParams();
    const history = useHistory();
    const {updateSchedule, deleteSchedule} = useActions();
    const schedule = useSelector(state => state.schedules.schedules.find((schedule) => schedule.id === id));
    const [open, setOpen] = React.useState(false);

    const today = new Date();
    const month = today.getMonth();

    const getNumberDaysOfMonth = (month, year) => new Date(year, month, 0).getDate();
    const numberDaysOfMonth = getNumberDaysOfMonth(month + 1, today.getFullYear());

    const days = [];
    for (let i = 1; i <= numberDaysOfMonth; i++)
        days.push(i);

    const [state, setState] = React.useState({
        ...schedule
    });
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = () => {
        updateSchedule({...state})
            .then(() => {
                history.push(RouteNames.SCHEDULES)
            });
    };

    const handleDeleteUser = () => {
        deleteSchedule(id)
            .then(() => history.push(RouteNames.SCHEDULES));
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
    };


    return (
        <Layout title="Edit schedule" backButton>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >

                {/*<Masonry columns={7} spacing={2} sx={{maxWidth: '50%'}}>*/}
                {/*    {days.map((item, index) => (*/}
                {/*        <MasonryItem key={index}>*/}
                {/*            <Button variant="outlined">{item}</Button>*/}
                {/*        </MasonryItem>*/}
                {/*    ))}*/}
                {/*</Masonry>*/}

                {
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell>User</TableCell>
                                    {
                                        days.map((item) => <TableCell align="right">{item}</TableCell>)
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <React.Fragment>
                                    <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => setOpen(!open)}
                                            >
                                                {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            User
                                        </TableCell>
                                        {
                                            days.map((item) => <TableCell align="right">{item}</TableCell>)
                                        }
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <Box sx={{margin: 1}}>
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        History
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Date</TableCell>
                                                                <TableCell>Customer</TableCell>
                                                                <TableCell align="right">Amount</TableCell>
                                                                <TableCell align="right">Total price ($)</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow>
                                                                <TableCell component="th" scope="row">
                                                                    ffff
                                                                </TableCell>
                                                                <TableCell>111</TableCell>
                                                                <TableCell align="right">222</TableCell>
                                                                <TableCell align="right">
                                                                    qqq
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </Box>
            <Stack
                direction="row"
                spacing={2}
                alignItems="flex-end"
                justifyContent="flex-end"
                sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                }}
            >
                <Fab
                    size="medium"
                    color="secondary"
                    onClick={() => setIsDeleteDialogOpen(true)}
                >
                    <DeleteOutlineIcon/>
                </Fab>
                <Fab
                    size="medium"
                    color="primary"
                    onClick={handleSubmit}
                >
                    <SaveIcon/>
                </Fab>
            </Stack>
            <Dialog
                open={isDeleteDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDeleteDialog}
            >
                <DialogTitle>{"Question dialog"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure to delete user?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
                    <Button onClick={handleDeleteUser}>Agree</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default EditSchedule;