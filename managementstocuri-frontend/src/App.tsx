import {AppBar, Toolbar} from "@mui/material";
import ListaLoturi from "./components/ListaLoturi";
import ButonLogare from "./components/ButonLogare";
import {useAtom} from "jotai";
import {utilizatorAtom} from "./lib/atoms/utilizatorAtom";
import {useEffect} from "react";
import {profilUtilizator, toateTipProdus} from "./lib/api";
import ButonDelogare from "./components/ButonDelogare";
import ManagementUseri from "./components/ManagementUseri";
import {tipuriProdusAtom} from "./lib/atoms/tipuriProdusAtom";
import ManagementTipuri from "./components/ManagementTipuri";

export default function App() {
    const [utilizator, setUtilizator] = useAtom(utilizatorAtom);
    const [, setTipuriProdus] = useAtom(tipuriProdusAtom);

    useEffect(() => {
        profilUtilizator().then(setUtilizator);
        toateTipProdus().then(setTipuriProdus);
    }, []);

    return (
        <div>
            <AppBar position="static">
                <Toolbar className="flex">
                    <div className="text-2xl font-black">
                        Management Stocuri
                    </div>
                    <div className="flex-1"></div>
                    <ManagementUseri/>
                    <div className="ml-3">
                        <ManagementTipuri/>
                    </div>
                    {
                        utilizator ? <div className="ml-3 text-xl flex gap-3 items-center">
                                <ButonDelogare/>
                                Logat ca {utilizator.numeDeUtilizator}
                            </div> :
                            <ButonLogare/>
                    }
                </Toolbar>
            </AppBar>
            <div className="mb-10 flex items-center flex-col mt-4 w-full">
                <div className="max-w-[1300px]">
                    <ListaLoturi/>
                </div>
            </div>
        </div>
    );
}
