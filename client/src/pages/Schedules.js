import React from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';

import Fab from '@mui/material/Fab';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import AddIcon from '@mui/icons-material/Add';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText/ListItemText';
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';

import Layout from '../components/Layout';
import {RouteNames} from '../utils/consts';
import useActions from '../hooks/useActions';

const Schedules = () => {
    const {schedules, isLoading} = useSelector(state => state.schedules);
    const {getSchedules} = useActions();
    const history = useHistory();

    React.useEffect(() => {
        if (schedules.length === 0)
            getSchedules();
    }, []);

    return (
        <Layout title="Schedules" isShowBackBtn={false}>
            {
                isLoading
                    ? <Backdrop sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}} open={isLoading}>
                        <CircularProgress color='inherit'/>
                    </Backdrop>
                    : <List sx={{width: '95%', margin: '0 auto', marginTop: 1, bgcolor: 'background.paper'}}>
                        {
                            schedules.map(({id, title, description}, index) => {
                                return (
                                    <React.Fragment key={id}>
                                        <ListItemButton alignItems="flex-start" onClick={() => {
                                            history.push(`${RouteNames.SCHEDULES}/${id}`)
                                        }}>
                                            <ListItemText
                                                primary={title}
                                                secondary={description}
                                            />
                                        </ListItemButton>
                                        {index < schedules.length - 1 && <Divider variant="inset" component="li"/>}
                                    </React.Fragment>
                                );
                            })
                        }
                    </List>
            }
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
                    onClick={() => history.push(RouteNames.CREATE_SCHEDULE)}
                >
                    <AddIcon/>
                </Fab>
            </Stack>
        </Layout>
    );
};

export default Schedules;