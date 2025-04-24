package org.java.licenta.managementstocuri.Produse.controller;

import org.java.licenta.managementstocuri.Produse.repository.ProdusRepository;
import org.java.licenta.managementstocuri.Produse.model.Produs;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/produse")
public class ProdusController {
    private final ProdusRepository produsRepository;

    public ProdusController(final ProdusRepository produsRepository) {
        this.produsRepository = produsRepository;
    }

    @GetMapping
    public List<Produs> getToateProdusele(){
        return produsRepository.findAll();
    }
}
