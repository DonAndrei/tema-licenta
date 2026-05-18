import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import {useAtom} from "jotai";
import {useState} from "react";
import {tipuriProdusAtom} from "../lib/atoms/tipuriProdusAtom";
import {creeazaTipProdus, editeazaTipProdus, stergeTipProdus, toateTipProdus} from "../lib/api";
import {Add, DeleteOutline, Edit, Save} from "@mui/icons-material";
import {utilizatorAtom} from "../lib/atoms/utilizatorAtom";

export default function ManagementTipuri() {
    const [deschis, setDeschis] = useState(false);
    const [tipuriProdus, setTipuriProdus] = useAtom(tipuriProdusAtom);
    const [utilizatorLogat] = useAtom(utilizatorAtom);

    const [numeTip, setNumeTip] = useState("");

    const [editTipId, setEditTipId] = useState(-1);
    const [numeNou, setNumeNou] = useState("");

    return <>
        {
            utilizatorLogat && utilizatorLogat.esteAdmin &&
            <Button variant="contained" onClick={() => setDeschis(true)}>
                Management Categorii
            </Button>
        }

        <Dialog open={deschis} onClose={() => setDeschis(false)}>
            <DialogContent>
                <DialogTitle>Management categorii</DialogTitle>
                <div className="mx-2 flex gap-2">
                    <TextField
                        value={numeTip}
                        placeholder="Nume categorie"
                        onChange={e => setNumeTip(e.target.value)}
                    />
                    <Button
                        startIcon={<Add/>}
                        variant="contained"
                        onClick={() => {
                            creeazaTipProdus(numeTip).then(() => {
                                toateTipProdus().then(setTipuriProdus);
                                setNumeTip("");
                            })
                        }}
                    >
                        Creează tip
                    </Button>
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Tip
                            </TableCell>
                            <TableCell>
                                Acțiuni
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            tipuriProdus.map(tip =>
                                <TableRow>
                                    <TableCell>{tip.id}</TableCell>
                                    <TableCell>
                                        {
                                            editTipId == tip.id ?
                                                <TextField size="small" value={numeNou}
                                                           onChange={e => setNumeNou(e.target.value)}/>
                                                :
                                                <>{tip.nume}</>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            editTipId == tip.id ?
                                                <Button
                                                    startIcon={<Save/>}
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={() => {
                                                        setEditTipId(-1);
                                                        editeazaTipProdus({
                                                            id: tip.id,
                                                            nume: numeNou
                                                        }).then(() => {
                                                            toateTipProdus().then(setTipuriProdus);
                                                        })
                                                    }}
                                                >Salvează</Button>
                                                :
                                                <div className="flex gap-2">
                                                    <Button
                                                        startIcon={<Edit/>}
                                                        variant="outlined"
                                                        size="small"
                                                        onClick={() => {
                                                            setEditTipId(tip.id);
                                                            setNumeNou(tip.nume);
                                                        }}
                                                    >Editează</Button>
                                                    <Button
                                                        startIcon={<DeleteOutline/>}
                                                        variant="outlined"
                                                        size="small"
                                                        color="error"
                                                        onClick={() => {
                                                            stergeTipProdus(tip).then(() => {
                                                                toateTipProdus().then(setTipuriProdus);
                                                            })
                                                        }}
                                                    >Șterge</Button>
                                                </div>
                                        }
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    </>
}