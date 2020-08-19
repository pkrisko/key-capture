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
} from '@material-ui/core';
import CenterLoader from '../components/CenterLoader';
import olRequest from '../util/olRequest';
import { useAuthContext } from '../util/auth';

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
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Quiz 1</TableCell>
              <TableCell align="right">Quiz 2</TableCell>
              <TableCell align="right">Quiz 3</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(({
              email,
              displayName,
              photoURL,
              scores,
            }) => (
              <TableRow key={email}>
                <TableCell>
                  <div className="admin-user-info">
                    <img src={photoURL} alt="User profile" className="user-icon admin-user-icon" />
                    {displayName}
                  </div>
                </TableCell>
                <TableCell align="right">
                  {email}
                </TableCell>
                {scores.map(({ score }) => (
                  <TableCell align="right">
                    <span>{`${score}%`}</span>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Admin;
