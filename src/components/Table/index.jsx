import React from 'react';
import {
    Button,
    Table,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    TableContainer
} from '@material-ui/core';

const SimpleTable = ({options, headings, data}) => {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    { (headings || []).map(({label}, index) => <TableCell key={index}>{label}</TableCell>) }
                    { options?.canDelete && <TableCell></TableCell> }
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    (data || []).map((row, index) => <TableRow key={index}>
                        { (headings || []).map(({field, render}, index) => {
                            if (render) {
                                return <TableCell key={index}>{render(row)}</TableCell>;
                            } else return <TableCell key={index}>{row[field]}</TableCell>;
                        }) }
                        { options?.canDelete && <TableCell>
                            <Button
                                color="secondary"
                                size="small"
                                variant="contained">Delete</Button>
                        </TableCell>}
                    </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}

export default SimpleTable;