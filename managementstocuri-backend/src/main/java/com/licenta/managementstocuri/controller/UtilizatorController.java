package com.licenta.managementstocuri.controller;

import com.licenta.managementstocuri.domain.CredentialeUtilizator;
import com.licenta.managementstocuri.domain.ProfilUtilizatorDto;
import com.licenta.managementstocuri.entity.UtilizatorEntity;
import com.licenta.managementstocuri.service.UtilizatorService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("utilizatori")
@RequiredArgsConstructor
public class UtilizatorController {

    private final UtilizatorService utilizatorService;

    @PostMapping("logare")
    public ResponseEntity<Boolean> logare(
        @RequestBody CredentialeUtilizator cerereLogare,
        HttpServletRequest request
    ) {
        Optional<UtilizatorEntity> optionalUtilizatorEntity = utilizatorService.verificaNumeDeUtilizatorSiParola(
            cerereLogare.getNumeDeUtilizator(), cerereLogare.getParola()
        );

        if (optionalUtilizatorEntity.isPresent()) {
            UtilizatorEntity utilizatorEntity = optionalUtilizatorEntity.get();

            HttpSession session = request.getSession(true);

            session.setAttribute("idUtilizator", utilizatorEntity.getId());

            return ResponseEntity.status(200).body(true);
        } else {
            return ResponseEntity.status(403).body(false);
        }
    }

    @PostMapping("delogare")
    public void delogare(
        HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);

        if (!Objects.isNull(session)) {
            session.invalidate();
        }
    }

    @GetMapping("profil")
    public ProfilUtilizatorDto profil(
            HttpServletRequest request
    ) {
        HttpSession session = request.getSession(false);

        if (Objects.isNull(session)) {
            return null;
        }

        UtilizatorEntity utilizatorEntity = utilizatorService.cautaDupaId((Long) session.getAttribute("idUtilizator"));

        return new ProfilUtilizatorDto(
                utilizatorEntity.getId(),
                utilizatorEntity.getNumeDeUtilizator(),
                utilizatorEntity.getEsteAdmin()
        );
    }

    @GetMapping
    public List<UtilizatorEntity> totiUtilizatorii() {
        return utilizatorService.totiUtilizatorii();
    }

    @DeleteMapping
    public void stergeUtilizator(
            @RequestBody UtilizatorEntity utilizatorEntity
    ) {
        utilizatorService.stergeUtilizator(utilizatorEntity);
    }

    @PutMapping
    public UtilizatorEntity modificaUtilizator(
            @RequestBody UtilizatorEntity utilizatorEntity
    ) {
        return utilizatorService.modificaUtilizator(utilizatorEntity);
    }

    @PostMapping
    public UtilizatorEntity profil(
            @RequestBody CredentialeUtilizator credentialeUtilizator
    ) {
        return utilizatorService.creeazaUtilizator(
                credentialeUtilizator.getNumeDeUtilizator(),
                credentialeUtilizator.getParola()
        );
    }
}
