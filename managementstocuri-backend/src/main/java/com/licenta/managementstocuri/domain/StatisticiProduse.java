package com.licenta.managementstocuri.domain;

import lombok.Data;

@Data
public class StatisticiProduse {
    private long produseTotale;
    private long produseValide;
    private long produseExpirate;
    private long produseInCursDeExpirare;

    public void adaugaTotal(long produseTotale) {
        this.produseTotale += produseTotale;
    }

    public void adaugaValide(long produseValide) {
        this.produseValide += produseValide;
    }

    public void adaugaExpirate(long produseExpirate) {
        this.produseExpirate += produseExpirate;
    }

    public void adaugaInCursDeExpirare(long produseInCursDeExpirare) {
        this.produseInCursDeExpirare += produseInCursDeExpirare;
    }
}
