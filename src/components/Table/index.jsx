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
import lodash from 'lodash';
import PropagateLoader from 'react-spinners/PropagateLoader';

const SimpleTable = ({loading, options, headings, data}) => {
    return <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    { (headings || [])
                        .filter(value => value)
                        .filter(({hideColumn}) => !hideColumn)
                        .map(({label, style}, index) => <TableCell key={index} style={style}>{label || ''}</TableCell>) }
                </TableRow>
            </TableHead>
            <TableBody>
                { loading && <TableRow>
                    <TableCell align="center" colSpan={headings.length} style={{height: '20px'}}>
                        <PropagateLoader height={4} width={100} loading={true}/><br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;Loading
                    </TableCell>
                </TableRow> }
                {
                    !loading && (data || [])
                        .filter(value => value)
                        .map((row, index) => <TableRow key={index}>
                            { (headings || [])
                                .filter(value => !!value)
                                .filter(({hideColumn}) => !hideColumn)
                                .map(({field, style, transform, blankWhen, render}, index) => {
                                    if (blankWhen && blankWhen(row)) return <TableCell key={index}></TableCell>;
                                    else if (render) return <TableCell key={index} style={style}>{render(row)}</TableCell>;
                                    else return <TableCell key={index}>{
                                        transform
                                            ? transform(lodash.get(row, field))
                                            : lodash.get(row, field)
                                    }</TableCell>;
                                })
                            }
                        </TableRow>)
                }
            </TableBody>
        </Table>
    </TableContainer>
}

export default SimpleTable;