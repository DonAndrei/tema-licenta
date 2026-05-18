import {atom} from "jotai";

export type UtilizatorAtomType = {
    idUtilizator: number,
    numeDeUtilizator: string,
    esteAdmin: boolean
};

export const utilizatorAtom = atom<UtilizatorAtomType | null>(null);