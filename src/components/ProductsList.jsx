import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Box,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
import { selectProducts, selectPages } from '../modules/products/selectors';
import {
  fetchProducts, getProductById, getPages,
} from '../modules/products/action';

function ProductsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const query = searchParams.get('query');
  const [pageNum, setPageNum] = useState(page);
  const [searchId, setSearchId] = useState(query);
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const totalPages = useSelector(selectPages);

  const searchFunction = (e) => {
    const newSearch = e.target.value;
    if (newSearch === '') {
      dispatch(fetchProducts(pageNum));
      dispatch(getPages(totalPages));
      setSearchParams({
        page: pageNum || 1,
      });
    } else {
      dispatch(getPages(1));
      dispatch(getProductById(+newSearch));
      setSearchId(newSearch);
      setSearchParams({
        page: 1,
        query: newSearch,
      });
    }
  };

  const changePage = (num) => {
    if (!query) {
      setPageNum(num);
      dispatch(fetchProducts(pageNum));
      setSearchParams({
        page: num,
      });
    }
    return true;
  };

  useEffect(() => {
    if (query) {
      dispatch(getProductById(+query));
      dispatch(getPages(totalPages));
    } else {
      dispatch(fetchProducts(pageNum));
    }
  }, [query]);

  return (
    <div className="ProductsList">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '250px' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          type="number"
          id="standard-basic"
          label="Search by id"
          variant="standard"
          defaultValue={searchId}
          onChange={(e) => searchFunction(e)}
        />
      </Box>
      <TableContainer>
        <Table sx={{ width: 700, margin: '15px 0' }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: '#808080',
              }}
            >
              <TableCell>ID</TableCell>
              <TableCell align="left">NAME</TableCell>
              <TableCell align="left">YEAR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{
                  backgroundColor: `${product.color}`,
                }}
              >
                <TableCell component="th" scope="row">
                  {product.id}
                </TableCell>
                <TableCell
                  align="left"
                >
                  {product.name}

                </TableCell>
                <TableCell align="left">{product.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2}>
        <Pagination
          count={useSelector(selectPages)}
          page={+pageNum || 1}
          onChange={(_, num) => changePage(num)}
        />
      </Stack>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default ProductsList;
