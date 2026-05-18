import {atom} from "jotai";
import type {TipProdus} from "../api";

export const tipuriProdusAtom = atom<TipProdus[]>([]);