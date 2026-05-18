import type {Utilizator} from "../components/ManagementUseri";
import type {Lot, StatisticiProduse} from "./types";

const API = "http://localhost:8080"

export type Vanzare = {
    id: number;
    lotId: number;
    data: string;
    vanzari: number;
    lot: Lot
}

export type TipProdus = {
    id: number;
    nume: string;
}

export type ToateLoturile = {
    content: Lot[],
    totalElements: number,
    totalPages: number,
    size: number,
    number: number,
    first: boolean,
    last: boolean
};

export function salveazaLot(lot: Lot) {
    return fetch(`${API}/loturi`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(lot),
    })
        .then((res) => res.json())
}

export function editeazaLot(lot: Lot) {
    return fetch(`${API}/loturi`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(lot),
    })
        .then((res) => res.json())
}

export function stergeLot(lot: Lot) {
    return fetch(`${API}/loturi`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(lot),
    })
        .then((res) => res.text())
}

export function toateLoturile(sorteazaDupa: string, directiaSortarii: string, cautare: string, tipProdus: number | null, paginaCurenta: number = 0): Promise<ToateLoturile> {
    return fetch(`${API}/loturi?sort=${sorteazaDupa},${directiaSortarii}&cautare=${cautare}&page=${paginaCurenta}&size=10${tipProdus != null ? "&tipProdusId=" + tipProdus : ""}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    })
        .then((res) => res.json())
}

export function logareCaUtilizator(data: { numeDeUtilizator: string, parola: string }) {
    return fetch(`${API}/utilizatori/logare`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    })
        .then((res) => res.text())
}

export function delogareUtilizator() {
    return fetch(`${API}/utilizatori/delogare`, {
        method: "POST",
        credentials: "include",
    })
        .then((res) => res.text())
}

export function creareUtilizator(numeDeUtilizator: string, parola: string) {
    return fetch(`${API}/utilizatori`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({numeDeUtilizator, parola})
    })
        .then((res) => res.json())
}

export function profilUtilizator(): Promise<{ idUtilizator: number, numeDeUtilizator: string, esteAdmin: boolean }> {
    return fetch(`${API}/utilizatori/profil`, {
        method: "GET",
        credentials: "include",
    })
        .then((res) => res.json())
}

export function totiUtilizatorii(): Promise<Utilizator[]> {
    return fetch(`${API}/utilizatori`, {
        method: "GET",
        credentials: "include",
    })
        .then((res) => res.json())
}

export function stergeUtilizator(utilizator: Utilizator) {
    return fetch(`${API}/utilizatori`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(utilizator)
    })
        .then((res) => res.text())
}

export function modificaUtilizator(utilizator: Utilizator) {
    return fetch(`${API}/utilizatori`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(utilizator)
    })
        .then((res) => res.json())
}

export function cautaVanzari(idLot: number): Promise<Vanzare[]> {
    return fetch(`${API}/vanzari/lot/${idLot}`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    })
        .then((res) => res.json())
}

export function toateTipProdus(): Promise<TipProdus[]> {
    return fetch(`${API}/loturi/tipuri`, {
        method: "GET",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
    })
        .then((res) => res.json())
}

export function creeazaTipProdus(nume: string): Promise<TipProdus> {
    return fetch(`${API}/loturi/tipuri`, {
        method: "POST",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            nume
        })
    })
        .then((res) => res.json())
}

export function editeazaTipProdus(tipProdus: TipProdus): Promise<TipProdus> {
    return fetch(`${API}/loturi/tipuri`, {
        method: "PUT",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tipProdus)
    })
        .then((res) => res.json())
}

export function stergeTipProdus(tipProdus: TipProdus) {
    return fetch(`${API}/loturi/tipuri`, {
        method: "DELETE",
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tipProdus)
    })
        .then((res) => res.text())
}

export function statisticiProduse(): Promise<StatisticiProduse> {
    return fetch(`${API}/loturi/statistici`, {
        method: "GET",
        credentials: "include",
    })
        .then((res) => res.json())
}