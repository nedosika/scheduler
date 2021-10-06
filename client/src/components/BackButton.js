import React from 'react';
import {useHistory} from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const BackButton = () => {
    const history = useHistory();

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 12
        }}>
            <IconButton onClick={() => history.goBack()}>
                <ChevronLeftIcon/>
            </IconButton>
        </div>
    );
};

export default BackButton;