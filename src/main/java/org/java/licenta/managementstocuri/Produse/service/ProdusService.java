package org.java.licenta.managementstocuri.Produse.service;

import org.java.licenta.managementstocuri.Produse.model.Produs;
import org.java.licenta.managementstocuri.Produse.repository.ProdusRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdusService {
    private final ProdusRepository produsRepository;

    public ProdusService(final ProdusRepository produsRepository) {
        this.produsRepository = produsRepository;
    }

    public List<Produs> getToateProduses() {
        return produsRepository.findAll();
    }

//    public void adaugaProdus(Produs produs) {
//        produsRepository.save(produs);
//    }
//
//    public void stergeProdus(int id) {
//        produsRepository.deleteById(id);
//    }
}
