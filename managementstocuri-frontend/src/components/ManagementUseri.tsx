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
import {useEffect, useState} from "react";
import {creareUtilizator, modificaUtilizator, stergeUtilizator, totiUtilizatorii} from "../lib/api";
import {useAtom} from "jotai";
import {utilizatorAtom} from "../lib/atoms/utilizatorAtom";
import {Add, AdminPanelSettings, DeleteOutline} from "@mui/icons-material";

export type Utilizator = {
    id: number;
    numeDeUtilizator: string;
    esteAdmin: boolean;
}

export default function ManagementUseri() {
    const [dialogDeschis, setDialogDeschis] = useState(false);

    const [utilizatorLogat] = useAtom(utilizatorAtom);

    const [numeDeUtilizator, setNumeDeUtilizator] = useState("");
    const [parola, setParola] = useState("");

    const [utilizatori, setUtilizatori] = useState<Utilizator[]>([]);

    function butonCreare() {
        creareUtilizator(numeDeUtilizator, parola)
            .then(a => {
                alert(`Creat utilizator cu numele de utilizator ${a.numeDeUtilizator}`);
                fetchUtilizatori();
            });
    }

    function fetchUtilizatori() {
        totiUtilizatorii().then(a => setUtilizatori(a))
    }

    function marcheazaCaAdmin(utilizator: Utilizator) {
        modificaUtilizator({
            ...utilizator,
            esteAdmin: !utilizator.esteAdmin
        }).then(fetchUtilizatori)
    }


    function sterge(utilizator: Utilizator) {
        stergeUtilizator(utilizator).then(fetchUtilizatori)
    }

    useEffect(() => {
        fetchUtilizatori();
    }, [utilizatorLogat]);

    return <>
        {utilizatorLogat && utilizatorLogat.esteAdmin &&
            <Button onClick={() => setDialogDeschis(true)} variant="contained">Management useri</Button>}
        <Dialog open={dialogDeschis} onClose={() => setDialogDeschis(false)}>
            <DialogContent>
                <DialogTitle>Management utilizatori</DialogTitle>
                Creează utilizator
                <div className="flex mt-2 gap-2">
                    <TextField placeholder="Nume de utilizator" value={numeDeUtilizator}
                               onChange={e => setNumeDeUtilizator(e.target.value)}/>
                    <TextField placeholder="Parolă" value={parola} onChange={e => setParola(e.target.value)}/>
                    <Button startIcon={<Add/>} variant="contained" onClick={butonCreare}>Creare</Button>
                </div>

                <div className="mt-2">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Nume de utilizator
                                </TableCell>
                                <TableCell>
                                    Este admin?
                                </TableCell>
                                <TableCell>
                                    Acțiuni
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                utilizatori.map(utilizator =>
                                    <TableRow>
                                        <TableCell>{utilizator.numeDeUtilizator}</TableCell>
                                        <TableCell>{utilizator.esteAdmin ? "Da" : "Nu"}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {
                                                    utilizator.id != utilizatorLogat?.idUtilizator &&
                                                    <div className="flex gap-2">
                                                        <Button
                                                            startIcon={<AdminPanelSettings/>}
                                                            color="warning" size="small" variant="outlined"
                                                            onClick={() => marcheazaCaAdmin(utilizator)}>
                                                            Marchează ca admin
                                                        </Button>
                                                        <Button
                                                            startIcon={<DeleteOutline/>}
                                                            color="error" size="small" variant="outlined"
                                                            onClick={() => sterge(utilizator)}>
                                                            Șterge
                                                        </Button>
                                                    </div>
                                                }
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
            </DialogContent>
        </Dialog>
    </>

}