import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import type {Lot} from "../lib/types";
import {editeazaLot, salveazaLot} from "../lib/api";
import {Save} from "@mui/icons-material";
import {useAtom} from "jotai";
import {tipuriProdusAtom} from "../lib/atoms/tipuriProdusAtom";

type Props = {
    deschis: boolean;
    onInchide: () => void;
    onSalveaza: () => void;
    valoriInitiale?: Lot;
};

export default function AdaugaSauEditeazaLotDialog({
                                                       deschis,
                                                       onInchide,
                                                       onSalveaza,
                                                       valoriInitiale,
                                                   }: Props) {
    const [tipuriProdus,] = useAtom(tipuriProdusAtom);

    const [vanduteAcum, setVanduteAcum] = useState(0);

    const [form, setForm] = useState<Lot>({
        numeProdus: "",
        cantitate: 1,
        descriere: "",
        dataExpirare: "",
        numar: 1,
        cantitateVanduta: 0,
        localizare: "",
        zilePanaLaExpirare: 0,
        furnizor: "",
        produseNevandute: 0
    });

    useEffect(() => {
        setVanduteAcum(0);
        if (valoriInitiale) setForm(valoriInitiale);
        else
            setForm({
                numeProdus: "",
                cantitate: 1,
                descriere: "",
                dataExpirare: "",
                numar: 1,
                cantitateVanduta: 0,
                localizare: "",
                zilePanaLaExpirare: 0,
                furnizor: "",
                produseNevandute: 0
            });
    }, [valoriInitiale, deschis]);

    const esteEditare = !!form.id;

    function handleSubmit() {
        if (esteEditare) {
            editeazaLot({
                ...form,
                cantitateVanduta: form.cantitateVanduta + vanduteAcum
            })
                .then(() => {
                    onSalveaza();
                    onInchide();
                });
        } else {
            salveazaLot({
                ...form,
                cantitateVanduta: form.cantitateVanduta + vanduteAcum
            })
                .then(() => {
                    onSalveaza();
                    onInchide();
                });
        }
    }

    return (
        <Dialog open={deschis} onClose={onInchide} fullWidth>
            <DialogTitle>{esteEditare ? "Editează" : "Adaugă"} lot</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1}>
                    <TextField
                        label="Nume produs*"
                        value={form.numeProdus}
                        onChange={(e) => setForm({...form, numeProdus: e.target.value})}
                    />
                    <TextField
                        label="Furnizor"
                        value={form.furnizor}
                        onChange={(e) => setForm({...form, furnizor: e.target.value})}
                    />
                    <FormControl>
                        <InputLabel>Tip Produs</InputLabel>
                        <Select
                            label={"Tip Produs"}
                            value={form.tipProdus?.nume ?? "-"}
                            onChange={(e) => setForm({
                                ...form,
                                tipProdus: tipuriProdus.find(s => s.nume == e.target.value)
                            })}
                        >
                            <MenuItem value={"-"}>-</MenuItem>
                            {
                                tipuriProdus.map(tip => <MenuItem value={tip.nume} key={tip.id}>{tip.nume}</MenuItem>)
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        label="Număr lot*"
                        value={form.numar}
                        type="number"
                        onChange={(e) => setForm({...form, numar: parseInt(e.target.value)})}
                    />
                    <TextField
                        label="Cantitate*"
                        type="number"
                        value={form.cantitate}
                        onChange={(e) =>
                            setForm({...form, cantitate: parseInt(e.target.value)})
                        }
                    />
                    <TextField
                        label="Localizare"
                        value={form.localizare}
                        onChange={(e) =>
                            setForm({...form, localizare: e.target.value})
                        }
                    />
                    <div className="mb-2">
                        Total vândut: {form.cantitateVanduta + vanduteAcum}
                    </div>
                    <TextField
                        label="Adaugă cantitate vândută"
                        type="number"
                        value={vanduteAcum}
                        onChange={(e) =>
                            setVanduteAcum(parseInt(e.target.value))
                        }
                    />
                    <TextField
                        label="Descriere*"
                        multiline
                        minRows={4}
                        value={form.descriere}
                        onChange={(e) => setForm({...form, descriere: e.target.value})}
                    />
                    <TextField
                        label="Data Expirare*"
                        type="date"
                        value={form.dataExpirare}
                        onChange={(e) =>
                            setForm({...form, dataExpirare: e.target.value})
                        }
                        InputLabelProps={{shrink: true}}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onInchide}
                >
                    Anulează
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    startIcon={<Save/>}
                >
                    Salvează
                </Button>
            </DialogActions>
        </Dialog>
    );
}
