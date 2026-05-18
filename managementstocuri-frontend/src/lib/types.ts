import type {TipProdus} from "./api";

export type Lot = {
    id?: number;
    cantitate: number;
    numeProdus: string;
    descriere: string;
    numar: number;
    dataExpirare: string;
    cantitateVanduta: number;
    tipProdus?: TipProdus;
    zilePanaLaExpirare: number;
    localizare?: string;
    produseNevandute: number;
    furnizor?: string;
};

export type StatisticiProduse = {
    produseTotale: number;
    produseValide: number;
    produseExpirate: number;
    produseInCursDeExpirare: number;
}