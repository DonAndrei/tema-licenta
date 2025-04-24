package org.java.licenta.managementstocuri.Produse.controller;

import org.java.licenta.managementstocuri.Produse.model.Produs;
import org.java.licenta.managementstocuri.Produse.repository.ProdusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/produse")
public class ProdusController {

    private final ProdusRepository produsRepository;

    @Autowired
    public ProdusController(ProdusRepository produseRepository) {
        this.produsRepository = produseRepository;
    }

    @PostMapping("/add")
    public ResponseEntity<Produs> adaugaProdus(@RequestBody Produs produs) {
        produsRepository.save(produs);
        return new ResponseEntity<>(produs, HttpStatus.CREATED);
    }
}
