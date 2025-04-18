import { Table, TableRow, TableCell } from "@mui/material";
import TextField from "@mui/material/TextField";
import React from "react";
import { useState } from "react";


function Coord() {
    this.deg = 0;
    this.min = 0;
    this.sec = 0;
}


function CoordinateConverter(){
    const [coord, setCoord] = useState(Object.create(Coord.prototype));
    const [decimal, setDecimal] = useState("");

    const noNaN = (numStr) => {return isNaN(parseInt(numStr)) ? 0 : parseInt(numStr)} 

    function handleChange(deg, min, sec) {
        const newCoord = Object.create(Coord);
        newCoord.deg = noNaN(deg);
        newCoord.min = noNaN(min);
        newCoord.sec = noNaN(sec);

        setCoord(newCoord);
        setDecimal(getDecimal(newCoord))

    }

    function getDecimal(coord) {
        const decimalDisplay = coord.deg + (coord.min / 60) + (coord.sec / 3600);
        return decimalDisplay.toString();
    }

    function getDMS(coord) {
        let n = Number(coord)
        const deg = Math.floor(n)
        n = (n - deg) * 60
        const min = Math.floor(n)
        n = (n - min) * 60
        const sec = Math.floor(n)

        const newCoord = Object.create(Coord);
        newCoord.deg = deg;
        newCoord.min = min;
        newCoord.sec = sec;
        console.log(newCoord)

        return newCoord;
    }

    function handleChangeDecimal(newDecimal){
        const newCoord = getDMS(newDecimal);

        setCoord(newCoord)
        setDecimal(newDecimal)
    }

    return (
        <div className="Coord-Converter">
            <Table>
                <TableRow>
                <TableCell>
                    <TextField  value={coord.deg} defaultValue={0} onChange={(e) => handleChange(e.target.value, coord.min, coord.sec)} label="Degrees" variant="outlined" />
                </TableCell>
                <TableCell>
                    <TextField value={coord.min} defaultValue={0} onChange={(e) => handleChange(coord.deg, e.target.value, coord.sec)} label="Minutes" variant="outlined" />
                </TableCell>
                <TableCell>
                    <TextField value={coord.sec}  defaultValue={0} onChange={(e) => handleChange(coord.deg, coord.min, e.target.value)} label="Seconds" variant="outlined" />
                </TableCell>
                </TableRow>
                <TableRow>
                <TableCell colSpan={3}>
                    <TextField value={decimal} onChange={(e) => handleChangeDecimal(e.target.value)} label="Decimal Coordinates" variant="outlined" fullWidth />
                </TableCell>
                </TableRow>
            </Table>
        </div>
    );

}

export default CoordinateConverter;
