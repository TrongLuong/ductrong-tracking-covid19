import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, StylesProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Cases from '../asset/cases.svg';
import Deaths from '../asset/deaths.svg';
import Recovered from '../asset/recovered.svg';
import _ from "lodash"
 

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    image: {
        width: 128,
        height: 128,
    },
    media: {
        height: 140,
    },
    img: {
        borderImage: 5  ,
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

        border: 1,
        textAlign: 'center',
      
        padding: theme.spacing(2),

    },
}));
PostApiVietNam.propTypes = {
    postVietNam: PropTypes.object,
    f404: PropTypes.any,
};
PostApiVietNam.defaultProps = {
    postVietNam: {},
    f404:[],
}
function FortmatNumber(number) {
    return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,')

}
function tinhGio(duration) {
    const nowDate = new Date();
    const nowDateToInt = Date.parse(nowDate);
    const updated = nowDateToInt - duration;
    var minutes = parseInt((updated / (1000 * 60)) % 60)
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
function PostApiVietNam(props) {
    const { postVietNam } = props;
    const f404 = props.f404;
    // console.log(f404)
    const classes = useStyles();
    if(!_.isUndefined(postVietNam.countryInfo)  )    
    return (
        <div className={classes.root} bgcolor="primary.main">
            <Grid item xs={12} direction="column" container>
                <Paper  elevation={24} className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Grid className={classes.image}>
                                <h3 >{postVietNam.country}</h3>
                                {/* FLAG */}
                             <img className={classes.img} alt="Viet Nam" src={!_.isUndefined(postVietNam.countryInfo) ? postVietNam.countryInfo.flag : ""}/>  

                            </Grid>
                        </Grid>
                        <Grid item xs container direction="column" >
                            <Grid item xs >
                                <Typography gutterBottom variant="h4">
                                    Population: {FortmatNumber(postVietNam.population)}
                                </Typography>
                                <Grid item xs={12} sm container  >
                                    <Grid item xs={12} sm={4} container className={classes.paper} >
                                        <Grid item xs>
                                            <Typography variant="subtitle1">
                                                TOTAL CASES
                                                </Typography>

                                            <Typography className={classes.case1s} variant="h5" gutterBottom>
                                                {FortmatNumber(postVietNam.cases)}
                                            </Typography>
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postVietNam.todayCases)} news
                                            </Typography>


                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postVietNam.cases / (postVietNam.population)) * 100)}% Pupolation
                                                </Typography>
                                        </Grid>
                                        <Grid item>
                                            <img className={classes.img1} alt="complex" src={Cases} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={4} container className={classes.paper}>
                                        <Grid item xs>
                                            <Typography variant="subtitle1">
                                                TOTAL RECOVERED
                                                </Typography>
                                            <Typography variant="h5" gutterBottom>
                                                {FortmatNumber(postVietNam.recovered)}
                                            </Typography>
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postVietNam.todayRecovered)} news
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postVietNam.recovered / (postVietNam.cases)) * 100)}% Cases
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
                                                {FortmatNumber(postVietNam.deaths)}
                                            </Typography>
                                            <Typography className={classes.case1s}   gutterBottom>
                                                +{FortmatNumber(postVietNam.todayDeaths)} news
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {roundToTwo((postVietNam.deaths / (postVietNam.cases)) * 100)}% Cases
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
                                    Update:   {UpdateTime(postVietNam.updated)}  ({tinhGio(postVietNam.updated)})
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Paper>
            </Grid>
        </div >
    );
    else return(
        <div className={classes.root} bgcolor="primary.main">
        <Grid item xs={12} direction="column" container>
            <Paper className={classes.paper}>
                <h2>Not found country name "{f404}"</h2>

            </Paper>
            </Grid>
</div>
    );


}

export default PostApiVietNam;