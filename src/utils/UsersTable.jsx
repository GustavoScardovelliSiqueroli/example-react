import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { ptBR as ptBRCore } from '@mui/material/locale';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        fontSize: 20,
        color: theme.palette.common.white,
        fontFamily: 'inter, systemUi, Avenir, Helvetica, Arial, sansSerif',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 20,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    ptBRCore,
);

export default function UsersTable({ lsUser, page, setPage, count, rowsPerPage, setRowsPerPage }) {
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <ThemeProvider theme={theme}>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nome</StyledTableCell>
                            <StyledTableCell align="right">E-mail</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {lsUser.length === 0 ? (
                            <StyledTableRow>
                                <StyledTableCell colSpan={2} align="center">
                                    Carregando...
                                </StyledTableCell>
                            </StyledTableRow>
                        ) : (
                            lsUser.map((row) => (
                                <StyledTableRow key={row.username}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.username}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                                </StyledTableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Controles de Paginação */}
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </ThemeProvider>
    );
}
