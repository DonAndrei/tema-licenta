package com.licenta.managementstocuri.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Entity
@Table(name = "loturi")
@Data
public class LotEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String numeProdus;

    @ManyToOne
    private TipProdusEntity tipProdus;

    @Column(nullable = false)
    private String descriere;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long cantitate;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long cantitateVanduta;

    @ColumnDefault("")
    private String localizare;

    @Column(nullable = false, unique = true)
    @ColumnDefault("0")
    private Long numar;

    @Column(nullable = false)
    private LocalDate dataExpirare;

    @ColumnDefault("")
    private String furnizor;

    @JsonProperty("zilePanaLaExpirare")
    public long getZilePanaLaExpirare() {
        return ChronoUnit.DAYS.between(LocalDate.now(), this.dataExpirare);
    }

    @JsonProperty("produseNevandute")
    public long getProduseNevandute() {
        return this.getCantitate() - this.getCantitateVanduta();
    }

    @JsonProperty("inCursDeExpirare")
    public boolean getInCursDeExpirare() {
        return this.getZilePanaLaExpirare() <= 7;
    }

    @JsonProperty("expirat")
    public boolean getExpirat() {
        return this.getZilePanaLaExpirare() <= 0;
    }
}
