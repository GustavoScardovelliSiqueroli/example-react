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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router';

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

const StyledTableRow = styled(TableRow)(({ theme, isSelected }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: isSelected ? '#747bff83' : theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&:hover': {
        backgroundColor: isSelected ? '#747bff83' : '#747bff43',
        cursor: 'pointer',
    },
    backgroundColor: isSelected ? '#747bff83' : 'inherit',
}));

const theme = createTheme(
    {
        palette: {
            primary: { main: '#1976d2' },
        },
    },
    ptBRCore,
);

export default function UsersTable(
    {
        lsUser, page, setPage, count, rowsPerPage, setRowsPerPage, setSelectedRow, selectedRow
    }
) {
    const navigate = useNavigate();


    const handleRowClick = (row) => {
        setSelectedRow(row);
        if (row == selectedRow) {
            navigate("/collaborator/update/", { state: { id: row.id, name: row.name, email: row.email } });
        }
    };

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
                                <StyledTableRow
                                    key={row.id}
                                    isSelected={selectedRow === row}
                                    onClick={() => handleRowClick(row)}
                                >
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
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
