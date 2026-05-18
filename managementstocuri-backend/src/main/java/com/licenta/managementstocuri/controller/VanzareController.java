package com.licenta.managementstocuri.controller;

import com.licenta.managementstocuri.entity.VanzareEntity;
import com.licenta.managementstocuri.service.VanzareService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("vanzari")
@RequiredArgsConstructor
public class VanzareController {
    private final VanzareService vanzareService;

    @GetMapping("/lot/{idLot}")
    public List<VanzareEntity> cautaDupaLot(@PathVariable Long idLot) {
        return vanzareService.cautaDupaLot(idLot);
    }
}
