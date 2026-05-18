import {Button} from "@mui/material";
import {delogareUtilizator} from "../lib/api";
import {useAtom} from "jotai";
import {utilizatorAtom} from "../lib/atoms/utilizatorAtom";

export default function ButonDelogare() {
    const [, setUtilizator] = useAtom(utilizatorAtom);

    return <Button variant="contained" onClick={() => {
        delogareUtilizator();
        setUtilizator(null);
    }}>Delogare</Button>;
}