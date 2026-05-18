import {Button, Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import {logareCaUtilizator, profilUtilizator} from "../lib/api";
import {utilizatorAtom} from "../lib/atoms/utilizatorAtom";
import {useAtom} from "jotai";
import {Login} from "@mui/icons-material";

export default function ButonLogare() {
    const [deschis, setDeschis] = useState(false);

    const [numeDeUtilizator, setNumeDeUtilizator] = useState("");
    const [parola, setParola] = useState("");
    const [, setUtilizator] = useAtom(utilizatorAtom);

    function onInchide() {
        setDeschis(false);
    }

    function logare() {
        logareCaUtilizator({numeDeUtilizator, parola}).then(() => {
            profilUtilizator().then((profil) => setUtilizator(profil));
        });
        setDeschis(false);
    }

    return <div>
        <Button onClick={() => setDeschis(true)} variant="contained">Logare</Button>
        <Dialog open={deschis} onClose={onInchide} fullWidth>
            <DialogTitle>Logare utilizator</DialogTitle>
            <DialogContent className="flex flex-col gap-2">
                <TextField
                    value={numeDeUtilizator}
                    onChange={(e) => setNumeDeUtilizator(e.target.value)}
                    placeholder="Nume de utilizator"
                />
                <TextField
                    value={parola}
                    type="password"
                    onChange={(e) => setParola(e.target.value)}
                    placeholder="Parola"
                />
                <Button
                    variant="contained"
                    onClick={() => logare()}
                    startIcon={<Login/>}
                >
                    Logare
                </Button>
            </DialogContent>
        </Dialog>
    </div>
}