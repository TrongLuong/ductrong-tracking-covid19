import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
 
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
 

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
  },

  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
  },
  image: {
    width: 128,
    height: 128,
  },

 
  img1: {
    width: 48,
    height: 32,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));;




PostListAPI.propTypes = {
  // component nhan 1 props la danh sách các postApi, dạng mảng
  postApi: PropTypes.array,


};
PostListAPI.defaultProps = {
  // dat mang mat dinh la rong.
  postApi: [],

}
function FortmatNumber(number) {
  return String(number).replace(/(.)(?=(\d{3})+$)/g, '$1,')

}
 
function PostListAPI(props) {
  const { postApi } = props;

  // console.log({postApi});
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper elevation={24} className={classes.root}>
      <Table stickyHeader aria-label="sticky table"  > 
        <TableHead>
          <TableRow>       
            <TableCell>
              Rank
            </TableCell>
            <TableCell>
              Flag
            </TableCell>
            <TableCell>
              Country
            </TableCell>
            <TableCell>
              Population
            </TableCell>
            <TableCell>
              Case
            </TableCell>
            <TableCell>
              Recovered
            </TableCell>
            <TableCell>
              Deaths
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {postApi.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((post, index) => (
            <TableRow  key={ page * rowsPerPage + index +1 } >
              <TableCell >
                {page * rowsPerPage + index +1 }
              </TableCell>
              <TableCell>
                <img className={classes.img1} alt="flag" src={post.countryInfo.flag}/>
              </TableCell>
              <TableCell >
                {post.country}
              </TableCell>
              <TableCell >
                {FortmatNumber(post.population)}
              </TableCell>
              <TableCell >
                {FortmatNumber(post.cases)}
              </TableCell>
              <TableCell >
                {FortmatNumber(post.recovered)}
              </TableCell>
              <TableCell >
                {FortmatNumber(post.deaths)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
            
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={postApi.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}     
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />     
      
    </Paper>
  )
}

export default PostListAPI;