import {Dialog, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import type {Lot} from "../lib/types";
import {useEffect, useState} from "react";
import {cautaVanzari, type Vanzare} from "../lib/api";

export default function VanariDialog({lot, setLot}: { lot: Lot | null, setLot: (value: Lot | null) => void }) {
    const [vanzari, setVanzari] = useState<Vanzare[]>([]);

    useEffect(() => {
        if (lot?.id)
            cautaVanzari(lot.id).then(setVanzari);
    }, [lot]);

    return <>
        <Dialog onClose={() => setLot(null)} open={lot != null}>
            <DialogContent>
                <DialogTitle>Vânzări de {lot?.numeProdus} din lotul cu numărul {lot?.numar}</DialogTitle>

                <Table>
                    <TableHead>
                        <TableCell>
                            Produs
                        </TableCell>
                        <TableCell>
                            Număr lot
                        </TableCell>
                        <TableCell>
                            Cantitate vândută
                        </TableCell>
                        <TableCell>
                            Vândut la
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            vanzari.map(vanzare =>
                                <TableRow>
                                    <TableCell>{vanzare.lot.numeProdus}</TableCell>
                                    <TableCell>{vanzare.lot.numar}</TableCell>
                                    <TableCell>{vanzare.vanzari}</TableCell>
                                    <TableCell>{vanzare.data}</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    </>
}