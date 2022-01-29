import React, {useState} from 'react';
import './App.css';
import Sample from './Sample';
import {CssBaseline, Container, Box, FormGroup, Button, ButtonGroup, Typography} from '@mui/material';
import PlayIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

import s1 from './sounds/1-GHS_123_Filo_Kick_Clap.mp3';
import s2 from './sounds/2.mp3';
import s3 from './sounds/3-GHS_123_Gm_Sun_Synth_Bass.mp3';
import s4 from './sounds/4.mp3';
import s5 from './sounds/5-hk_gtr125_pickcut_Gm.mp3';
import s6 from './sounds/6-hk_syn125_holdme1_Gm.mp3';
import s7 from './sounds/7-hk_top125_latint.mp3';
import s8 from './sounds/8-hk_top125_zulu.mp3';
import s9 from './sounds/9-hk_mus125_lovefunk2_Gm.mp3';

export default function App() {

	const samples = [
		{label:'1-GHS_123_Filo_Kick_Clap', obj: s1}, 
		{label:'2', obj: s2}, 
		{label:'3-GHS_123_Gm_Sun_Synth_Bass', obj: s3},
		{label:'4', obj: s4}, 
		{label:'5-hk_gtr125_pickcut_Gm', obj: s5}, 
		{label:'6-hk_syn125_holdme1_Gm', obj: s6}, 
		{label:'7-hk_top125_latint', obj: s7},
		{label:'8-hk_top125_zulu', obj: s8}, 
		{label:'9-hk_mus125_lovefunk2_Gm', obj: s9}, 
	],
	sampleMediaObj = {};

	for (let i = 0; i < samples.length; i++) {
		const el = samples[i];
		sampleMediaObj[el.label] = new Audio(el.obj);
		sampleMediaObj[el.label].constrols = true;
	}

	const [sampleMedias] = useState(sampleMediaObj);

	const [play, setPlay] = useState(false);

	const [currLoop, setCurrLoop] = useState({});

	const [nextLoop, setNextLoop] = useState({});

	const [disabledPlay, setDisabledPlay] = useState(true);

	const onClickPlay = () => {
		setPlay(value=>{
			if(!value){ // false -> play
				playMusic();
			} else{
				stopMusic();
			}
			return !value;
		});
	}

	const onClickSwitch = (id, value) => {
		if(value){
			setNextLoop(obj=>{
				obj[id]=true;
				return obj;
			});
			setDisabledPlay(false);
		} else {
			if(play){
				sampleMedias[id].pause();
				sampleMedias[id].currentTime=0;
			}
			setCurrLoop(obj=>{
				delete obj[id];
				if(Object.keys(obj).length === 0) setPlay(false);
				return obj;
			});
			setNextLoop(obj=>{
				delete obj[id];
				if(Object.keys(obj).length === 0) setDisabledPlay(true);
				return obj;
			});
		}
	}

	const playMusic = () => {
		const newLoop = {};
		for (const key in nextLoop) {
			if(sampleMedias[key].paused) {
				sampleMedias[key].play();
				sampleMedias[key].onended = playMusic;
				newLoop[key] = true;
			}
		}
		setCurrLoop(loop=>{
			for (const key in newLoop) {
				loop[key] = true;
			}
			return loop;
		});
	}

	const stopMusic = () =>{
		for (const key in currLoop) {
			sampleMedias[key].pause();
			sampleMedias[key].currentTime=0;
		}
	}

	return (
		<div className="App">
			<CssBaseline />
			<Container maxWidth="sm">
				<Typography variant="h3" component="div" gutterBottom>Loop Machine</Typography>
				<Box>
					<ButtonGroup orientation="vertical" >
						<Button variant="contained" disabled={!play&&disabledPlay} onClick={onClickPlay} >
							{play ? <StopIcon /> : <PlayIcon />}
						</Button>
					</ButtonGroup>
					<FormGroup style={{marginTop: 20}}>
						{samples.map(({label})=>(<Sample 
							key={label} label={label} 
							onClick={({target: {checked}})=>{onClickSwitch(label, checked)}} />))}
					</FormGroup>
				</Box>
			</Container>
		</div>
	);
}
