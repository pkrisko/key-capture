import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TableFooter,
  Link as MaterialLink,
  TablePagination,
} from '@mui/material';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import CenterLoader from '../components/CenterLoader';
import olRequest from '../util/olRequest';
import { useAuthContext } from '../providers/auth';
import Header from '../components/Header';

const headers = ['Name', 'Email', 'Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4'];

const usersCsv = (userRows) => {
  let csvContent = 'data:text/csv;charset=utf-8,';
  csvContent += `${headers.join(',')}\n`;
  csvContent += userRows.map((userRow) => ([
    userRow.displayName,
    userRow.email,
    userRow['Quiz 1'],
    userRow['Quiz 2'],
    userRow['Quiz 3'],
    userRow['Quiz 4'],
  ])).join('\n');
  return encodeURI(csvContent);
};

const TablePaginationActions = ({
  count,
  page,
  rowsPerPage,
  onChangePage,
}) => (
  <>
    <IconButton
      onClick={(e) => onChangePage(e, 0)}
      disabled={page === 0}
      aria-label="first page"
    >
      <FirstPageIcon />
    </IconButton>
    <IconButton
      onClick={(e) => onChangePage(e, page - 1)}
      disabled={page === 0}
      aria-label="previous page"
    >
      <KeyboardArrowLeft />
    </IconButton>
    <IconButton
      onClick={(e) => onChangePage(e, page + 1)}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="next page"
    >
      <KeyboardArrowRight />
    </IconButton>
    <IconButton
      onClick={(e) => onChangePage(e, Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label="last page"
    >
      <LastPageIcon />
    </IconButton>
  </>
);

const Admin = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();

  const getUsers = async () => {
    const response = await olRequest('users', user.tokens);
    setUsers(response?.allUsers);
  };

  if (user === null) {
    return (
      <CenterLoader />
    );
  }
  if (!user.admin) {
    router.push('/dashboard');
  }
  if (!users) {
    getUsers();
    return (
      <CenterLoader />
    );
  }
  return (
    <>
      <Header {...user} onClick={() => router.push('/dashboard')} />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, idx) => (
                  <TableCell key={header} align={idx === 0 ? 'left' : 'right'}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((userRecord) => (
                <TableRow key={userRecord.email}>
                  <TableCell>
                    <div className="admin-user-info">
                      <img src={userRecord.photoURL} alt="User profile" className="user-icon admin-user-icon" />
                      {userRecord.displayName}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {userRecord.email}
                  </TableCell>
                  {headers.map((header, idx) => {
                    if (idx <= 1) return null;
                    const score = userRecord[header];
                    return (
                      <TableCell key={`${header}-${score}`} align="right">
                        {score === null && 'N/A'}
                        {score !== null && `${score}%`}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 50, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={users.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={(e, newPage) => setPage(newPage)}
                  onChangeRowsPerPage={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                  }}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Paper>
      <div style={{ margin: '10px 0 10px 15px' }}>
        <MaterialLink href={usersCsv(users)} download="piano-scores.csv">
          Download as CSV
        </MaterialLink>
      </div>
    </>
  );
};

export default Admin;
