package com.licenta.managementstocuri.controller;

import com.licenta.managementstocuri.domain.StatisticiProduse;
import com.licenta.managementstocuri.entity.LotEntity;
import com.licenta.managementstocuri.entity.TipProdusEntity;
import com.licenta.managementstocuri.service.LotService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("loturi")
@RequiredArgsConstructor
public class LotController {
    private final LotService lotService;

    @GetMapping("statistici")
    public StatisticiProduse statisticiProduse() {
        return lotService.statisticiProduse();
    }

    @GetMapping("tipuri")
    public List<TipProdusEntity> tipuriProdus() {
        return lotService.tipuriProdus();
    }

    @PostMapping("tipuri")
    public TipProdusEntity creeazaTipProdus(@RequestBody TipProdusEntity tipProdus) {
        return lotService.creeazaTipProdus(tipProdus);
    }

    @PutMapping("tipuri")
    public TipProdusEntity modificaTipProdus(@RequestBody TipProdusEntity tipProdus) {
        return lotService.modificaTipProdus(tipProdus);
    }

    @DeleteMapping("tipuri")
    public void stergeTipProdus(@RequestBody TipProdusEntity tipProdus) {
        lotService.stergeTipProdus(tipProdus);
    }

    @GetMapping
    public Page<LotEntity> toateLoturile(
            @RequestParam String cautare,
            @RequestParam(required = false) Long tipProdusId,
            Pageable pageable
    ) {
        return lotService.toateLoturile(cautare, tipProdusId, pageable);
    }

    @PostMapping
    public LotEntity creeazaLot(@RequestBody LotEntity lot) {
        return lotService.creeazaLot(lot);
    }

    @PutMapping
    public LotEntity actualizeazaLot(@RequestBody LotEntity lot) {
        return lotService.actualizeazaLot(lot);
    }

    @GetMapping("/{lotId}")
    public LotEntity cautaLot(@PathVariable long lotId) {
        return lotService.cautaLot(lotId);
    }

    @DeleteMapping
    public void stergeLot(@RequestBody LotEntity lot) {
        lotService.stergeLot(lot);
    }
}
