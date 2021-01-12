import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
import Cases from '../asset/cases.svg';
import Deaths from '../asset/deaths.svg';
import Recovered from '../asset/recovered.svg';

import Global from '../asset/earth-globe.svg';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    img1: {
        width: 32,
        height: 32,
    },

    paper: {
        color: red,
        border: 1,
        textAlign: 'center',
        borderLeft: 10,
        padding: theme.spacing(2),

    },
}));

PostApiGlobal.propTypes = {
    postGlobal: PropTypes.object,

};
PostApiGlobal.defaultProps = {
    postGlobal: {},
}
function FortmatNumber(number) {
    return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,')

}
function tinhGio(duration) {
    const nowDate = new Date();
    const nowDateToInt = Date.parse(nowDate);
    const updated = nowDateToInt - duration;
    var  minutes = parseInt((updated / (1000 * 60)) % 60)
        , hours = parseInt((updated / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
 
    if (hours <= 0) return minutes + " phút trước"
    return hours + " giờ " + minutes + " phút trước";
}
function UpdateTime(duration) {
    return new Date(duration) + "";
}
function roundToTwo(num) {
    return +(Math.round(num + "e+3") + "e-3");
}

function PostApiGlobal(props) {
    const { postGlobal } = props;
    const name = "Global";

    const classes = useStyles();
    return (
        <div className={classes.root} >
            <Grid item xs={12} direction="column" container>
                <Paper className={classes.paper}  elevation={24}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Grid className={classes.image}>
                                <h3 >{name}</h3>
                                <img key={postGlobal} className={classes.img} alt="Global" src={Global} />
                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" >
                            <Grid item xs >
                                <Typography noWrap gutterBottom variant="h4">
                                    Population: {FortmatNumber(postGlobal.population)}
                                </Typography>
                                <Grid item xs={12} sm container  >
                                    <Grid item xs={12} sm={4} container className={classes.paper} >
                                        <Grid item xs>
                                            <Typography variant="subtitle1">
                                                TOTAL CASES
                                                </Typography>
                                            <Typography className={classes.case1s} variant="h5" gutterBottom>
                                                {FortmatNumber(postGlobal.cases)}
                                            </Typography>
                                            
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postGlobal.todayCases)} news
                                            </Typography>


                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postGlobal.cases / (postGlobal.population)) * 100)}% Pupolation
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img className={classes.img1} alt="complex" src={Cases} />
                                            <Box borderRight={1} ></Box>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4} container className={classes.paper}>
                                        <Grid item xs>
                                            <Typography variant="subtitle1">
                                                TOTAL RECOVERED
                                                </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {FortmatNumber(postGlobal.recovered)}
                                            </Typography>

                                             
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postGlobal.todayRecovered)} news
                                            </Typography>
                                            
                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postGlobal.recovered / (postGlobal.cases)) * 100)}% Cases
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img className={classes.img1} alt="complex" src={Recovered} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4} container className={classes.paper}>
                                        <Grid item xs>
                                            <Typography variant="subtitle1">
                                                TOTAL DEATHS
                                                </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {FortmatNumber(postGlobal.deaths)}
                                            </Typography>
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postGlobal.todayDeaths)} news
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postGlobal.deaths / (postGlobal.cases)) * 100)}% Cases
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img className={classes.img1} alt="complex" src={Deaths} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <hr></hr>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" >
                                    Update:   {UpdateTime(postGlobal.updated)}  ({tinhGio(postGlobal.updated)})
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </div >
    );
}

export default PostApiGlobal;