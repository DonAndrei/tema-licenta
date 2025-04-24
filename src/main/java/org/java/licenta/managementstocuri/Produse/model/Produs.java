package org.java.licenta.managementstocuri.Produse.model;

public class Produs {
    private int id;
    private String nume;
    private String descriere;
    private int cantitate;

    public Produs(int id, String nume, String descriere, int cantitate) {
        this.id = id;
        this.nume = nume;
        this.descriere = descriere;
        this.cantitate = cantitate;
    }

    //Id
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    //Nume
    public String getNume() {
        return nume;
    }
    public void setNume(String nume) {
        this.nume = nume;
    }

    //Descriere
    public String getDescriere() {
        return descriere;
    }
    public void setDescriere(String descriere) {
        this.descriere = descriere;
    }

    //Cantitate
    public int getCantitate() {
        return cantitate;
    }
    public void setCantitate(int cantitate) {
        this.cantitate = cantitate;
    }
}
