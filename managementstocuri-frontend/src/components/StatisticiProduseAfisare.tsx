import type {StatisticiProduse} from "../lib/types";
import {CULOARE_CURAND, CULOARE_EXPIRAT, CULOARE_VALIDE} from "../lib/utils";

function Statistica({
                        titlu,
                        valoare,
                        culoare: culoareBackground,
                    }: {
    titlu: string;
    valoare: number;
    culoare: string;
}) {
    return (
        <div
            className={`flex flex-col items-center p-3 shadow-md border-1 border-gray-300 rounded-sm`}
            style={{"background": culoareBackground}}
        >
            <div className="text-xl font-semibold text-center">
                {titlu}
            </div>
            <div className="flex-1"></div>
            <div className="text-3xl">
                {valoare}
            </div>
        </div>
    );
}

export default function StatisticiProduseAfisare({statistici}: { statistici: StatisticiProduse }) {
    return <>
        <div className="mb-4">
            <div className="grid gap-3 sm:grid-cols-4 grid-cols-1">
                <Statistica
                    titlu="Produse totale"
                    valoare={statistici.produseTotale}
                    culoare={"#00000"}
                />

                <Statistica
                    titlu="Produse valide"
                    valoare={statistici.produseValide}
                    culoare={CULOARE_VALIDE}
                />

                <Statistica
                    titlu="Produse care expiră curând"
                    valoare={statistici.produseInCursDeExpirare}
                    culoare={CULOARE_CURAND}
                />

                <Statistica
                    titlu="Produse expirate"
                    valoare={statistici.produseExpirate}
                    culoare={CULOARE_EXPIRAT}
                />
            </div>
        </div>
    </>

}