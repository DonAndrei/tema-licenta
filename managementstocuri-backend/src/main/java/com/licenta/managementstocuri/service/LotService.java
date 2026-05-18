package com.licenta.managementstocuri.service;

import com.licenta.managementstocuri.domain.StatisticiProduse;
import com.licenta.managementstocuri.entity.LotEntity;
import com.licenta.managementstocuri.entity.TipProdusEntity;
import com.licenta.managementstocuri.entity.VanzareEntity;
import com.licenta.managementstocuri.repository.LotRepository;
import com.licenta.managementstocuri.repository.TipProdusRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LotService {

    private final LotRepository lotRepository;
    private final TipProdusRepository tipProdusRepository;

    private final VanzareService vanzareService;

    public StatisticiProduse statisticiProduse() {
        List<LotEntity> loturi = lotRepository.findAll();

        StatisticiProduse statisticiProduse = new StatisticiProduse();

        for (LotEntity lotEntity : loturi) {
            statisticiProduse.adaugaTotal(lotEntity.getProduseNevandute());

            if (lotEntity.getExpirat())
                statisticiProduse.adaugaExpirate(lotEntity.getProduseNevandute());
            else {
                statisticiProduse.adaugaValide(lotEntity.getProduseNevandute());
                if (lotEntity.getInCursDeExpirare())
                    statisticiProduse.adaugaInCursDeExpirare(lotEntity.getProduseNevandute());
            }
        }

        return statisticiProduse;
    }

    public List<TipProdusEntity> tipuriProdus() {
        return tipProdusRepository.findAll();
    }

    public TipProdusEntity creeazaTipProdus(TipProdusEntity tipProdusEntity) {
        return tipProdusRepository.save(tipProdusEntity);
    }

    public void stergeTipProdus(TipProdusEntity tipProdusEntity) {
        lotRepository.findByTipProdus(tipProdusEntity).forEach(lot -> {
            lot.setTipProdus(null);
            lotRepository.save(lot);
        });

        tipProdusRepository.delete(tipProdusEntity);
    }

    public LotEntity creeazaLot(
            LotEntity lot
    ) {
        LotEntity lotEntity = lotRepository.save(lot);

        if (lotEntity.getCantitateVanduta() > 0) {
            VanzareEntity vanzareEntity = new VanzareEntity();
            vanzareEntity.setLot(lot);
            vanzareEntity.setData(LocalDate.now());
            vanzareEntity.setVanzari(lotEntity.getCantitateVanduta());

            vanzareService.creeazaVanzare(vanzareEntity);
        }

        return lotEntity;
    }

    public LotEntity actualizeazaLot(
            LotEntity lot
    ) {
        LotEntity lotVechi = lotRepository.findById(lot.getId()).orElseThrow();

        long diferentaVanzari = lot.getCantitateVanduta() - lotVechi.getCantitateVanduta();

        if (diferentaVanzari > 0) {
            VanzareEntity vanzareEntity = new VanzareEntity();
            vanzareEntity.setLot(lot);
            vanzareEntity.setData(LocalDate.now());
            vanzareEntity.setVanzari(diferentaVanzari);

            vanzareService.creeazaVanzare(vanzareEntity);
        }

        return lotRepository.save(lot);
    }
    public Page<LotEntity> toateLoturile(
            String cautare,
            Long tipProdusId,
            Pageable pageable
    ) {
        return lotRepository.cautaDupaTextSiTip(cautare, tipProdusId, pageable);
    }

    public LotEntity cautaLot(long lotId) {
        return lotRepository.findById(lotId).orElseThrow();
    }

    public void stergeLot(LotEntity lot) {
        vanzareService.cautaDupaLot(lot.getId()).forEach(vanzareService::stergeVanzare);

        lotRepository.delete(lot);
    }

    public TipProdusEntity modificaTipProdus(TipProdusEntity tipProdus) {
        return tipProdusRepository.save(tipProdus);
    }
}
