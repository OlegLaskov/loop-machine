import React from 'react';
import {FormControlLabel, Switch} from '@mui/material';


export default function Sample({label, onClick}){
	return <FormControlLabel control={<Switch onClick={onClick} />} label={label} />;
}