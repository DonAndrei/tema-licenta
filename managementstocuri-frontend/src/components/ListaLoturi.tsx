import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import {useEffect, useState} from "react";
import AdaugaSauEditeazaLotDialog from "./AdaugaSauEditeazaProdusDialog";
import type {Lot, StatisticiProduse} from "../lib/types";
import {CULOARE_CURAND, CULOARE_EXPIRAT} from "../lib/utils";
import {statisticiProduse, stergeLot, toateLoturile, type ToateLoturile} from "../lib/api";
import StatisticiProduseAfisare from "./StatisticiProduseAfisare";
import {Add, DeleteOutline, EditOutlined, ViewList} from "@mui/icons-material";
import {utilizatorAtom} from "../lib/atoms/utilizatorAtom";
import {useAtom} from "jotai";
import VanariDialog from "./VanzariDialog";
import {tipuriProdusAtom} from "../lib/atoms/tipuriProdusAtom";

export default function ListaLoturi() {
    const [utilizator,] = useAtom(utilizatorAtom);
    const [tipuriProdus,] = useAtom(tipuriProdusAtom);

    const [tipProdusFiltrat, setTipuriProdusFiltrat] = useState<number | null>(null);

    const [loturi, setLoturi] = useState<ToateLoturile | null>(null);
    const [statistici, setStatistici] = useState<StatisticiProduse | null>(null);

    const [dialogDeschis, setDialogDeschis] = useState(false);
    const [lotDeEditat, setLotDeEditat] = useState<Lot | undefined>();

    const [sorteazaDupa, setSorteazaDupa] = useState("numeProdus");
    const [directiaSortarii, setDirectiaSortarii] = useState("desc");

    const [cautare, setCautare] = useState("");

    const [paginaCurenta, setPaginaCurenta] = useState(0);

    const [vizualizareLotVanzari, setVizualizareLotVanzari] = useState<Lot | null>(null);

    function fetchLoturi() {
        toateLoturile(sorteazaDupa, directiaSortarii, cautare, tipProdusFiltrat, paginaCurenta)
            .then((data) => {
                setLoturi(data);
                setPaginaCurenta(data.number);
            });
        statisticiProduse().then(setStatistici)
    }

    function butonulDeSters(produs: Lot) {
        stergeLot(produs)
            .then(() => {
                fetchLoturi();
            })
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        fetchLoturi();
    }, [sorteazaDupa, directiaSortarii, cautare, paginaCurenta, tipProdusFiltrat, tipuriProdus]);

    return (
        <div>
            <div className="text-3xl mb-5">Listă produse</div>

            {statistici && <StatisticiProduseAfisare statistici={statistici}/>}

            <div className="flex w-full gap-2 items-center">
                Sortează după
                <Select
                    value={sorteazaDupa}
                    onChange={(e) => setSorteazaDupa(e.target.value)}
                >
                    <MenuItem value={"numeProdus"}>nume produs</MenuItem>
                    <MenuItem value={"furnizor"}>furnizor</MenuItem>
                    <MenuItem value={"numar"}>număr lot</MenuItem>
                    <MenuItem value={"cantitate"}>cantitate</MenuItem>
                    <MenuItem value={"dataExpirare"}>data expirare</MenuItem>
                </Select>
                în ordine
                <Select
                    value={directiaSortarii}
                    onChange={(e) => setDirectiaSortarii(e.target.value)}
                >
                    <MenuItem value={"asc"}>ascendentă</MenuItem>
                    <MenuItem value={"desc"}>descendentă</MenuItem>
                </Select>
                filtrează tip
                <FormControl>
                    <InputLabel>Tip</InputLabel>

                    <Select
                        label="Tip Produs"
                        value={tipProdusFiltrat ?? "toate"}
                        onChange={(e) => setTipuriProdusFiltrat(e.target.value == "toate" ? null : e.target.value)}
                    >
                        <MenuItem value={"toate"}>toate</MenuItem>
                        {
                            tipuriProdus.map(tip => <MenuItem value={tip.id} key={tip.id}>{tip.nume}</MenuItem>)
                        }
                    </Select>
                </FormControl>
                <div>
                    căutare text
                </div>
                <div className="flex-1">
                    <TextField className="w-full" placeholder="Căutare" value={cautare}
                               onChange={e => setCautare(e.target.value)}/>
                </div>
                <div>
                    {
                        utilizator && <Button
                            size="large"
                            variant="contained"
                            onClick={() => {
                                setLotDeEditat(undefined);
                                setDialogDeschis(true);
                            }}
                            startIcon={<Add/>}
                        >
                            Adaugă lot
                        </Button>
                    }
                </div>
            </div>

            <div className="shadow-md border-1 border-gray-300 mt-4 rounded-sm">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nume produs</TableCell>
                            <TableCell>Furnizor</TableCell>
                            <TableCell>Tip</TableCell>
                            <TableCell>Număr lot</TableCell>
                            <TableCell>Cantitate</TableCell>
                            <TableCell>Localizare</TableCell>
                            <TableCell>Descriere</TableCell>
                            <TableCell>Data Expirare</TableCell>
                            {
                                utilizator && <TableCell>Acțiuni</TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loturi && loturi.content.map((lot) => (
                            <TableRow
                                key={lot.id}
                                style={{backgroundColor: (lot.zilePanaLaExpirare < 0 ? CULOARE_EXPIRAT : lot.zilePanaLaExpirare <= 7 ? CULOARE_CURAND : "inherit")}}
                            >
                                <TableCell>{lot.numeProdus}</TableCell>
                                <TableCell>{lot.furnizor ?? "-"}</TableCell>
                                <TableCell>{lot.tipProdus?.nume ?? "-"}</TableCell>
                                <TableCell>{lot.numar}</TableCell>
                                <TableCell>{lot.produseNevandute}</TableCell>
                                <TableCell>{lot.localizare ?? "-"}</TableCell>
                                <TableCell>{lot.descriere}</TableCell>
                                <TableCell>{lot.dataExpirare}</TableCell>
                                {
                                    utilizator && <TableCell>
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => {
                                                    setVizualizareLotVanzari(lot)
                                                }}
                                                startIcon={<ViewList/>}
                                            >
                                                Vânzări
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                onClick={() => {
                                                    setLotDeEditat(lot);
                                                    setDialogDeschis(true);
                                                }}
                                                startIcon={<EditOutlined/>}
                                            >
                                                Editează
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => butonulDeSters(lot)}
                                                startIcon={<DeleteOutline/>}
                                            >
                                                Șterge
                                            </Button>
                                        </div>
                                    </TableCell>
                                }
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {

                loturi && <>
                    Pagina: {loturi.number + 1}/{loturi.totalPages} (Loturi total: {loturi.totalElements})
                    <Button onClick={() => setPaginaCurenta((p) => p - 1)} disabled={loturi.first}>Înapoi</Button>
                    <Button onClick={() => setPaginaCurenta((p) => p + 1)} disabled={loturi.last}>Înainte</Button>
                </>
            }

            <AdaugaSauEditeazaLotDialog
                deschis={dialogDeschis}
                onInchide={() => setDialogDeschis(false)}
                onSalveaza={fetchLoturi}
                valoriInitiale={lotDeEditat}
            />
            <VanariDialog
                lot={vizualizareLotVanzari}
                setLot={setVizualizareLotVanzari}
            />
        </div>
    );
}
