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
  Link as MaterialLink,
} from '@material-ui/core';
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

const Admin = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState(null);
  const router = useRouter();

  const getUsers = async () => {
    const { allUsers } = await olRequest('users', user.tokens);
    setUsers(allUsers);
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
              {users.map((userRecord) => (
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
                      <TableCell align="right">
                        {score === null && 'N/A'}
                        {score !== null && `${score}%`}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <MaterialLink href={usersCsv(users)} download="piano-scores.csv">
        Download
      </MaterialLink>
    </>
  );
};

export default Admin;
