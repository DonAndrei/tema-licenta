package com.licenta.managementstocuri.service;

import com.licenta.managementstocuri.entity.VanzareEntity;
import com.licenta.managementstocuri.repository.VanzareRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Serial;
import java.util.List;

@Service
@RequiredArgsConstructor
public class VanzareService {

    private final VanzareRepository vanzareRepository;

    public VanzareEntity creeazaVanzare(VanzareEntity vanzare) {
        return vanzareRepository.save(vanzare);
    }

    public List<VanzareEntity> cautaDupaLot(
            Long idLot
    ) {
        return vanzareRepository.findByLotId(idLot);
    }

    public void stergeVanzare(VanzareEntity vanzare) {
        vanzareRepository.delete(vanzare);
    }

}
