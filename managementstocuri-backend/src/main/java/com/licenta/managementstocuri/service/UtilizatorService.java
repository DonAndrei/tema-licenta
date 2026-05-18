package com.licenta.managementstocuri.service;

import com.licenta.managementstocuri.entity.UtilizatorEntity;
import com.licenta.managementstocuri.repository.UtilizatorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UtilizatorService {

    private final UtilizatorRepository utilizatorRepository;
    private final PasswordEncoder passwordEncoder;

    public long numarDeUtilizatori() {
        return utilizatorRepository.count();
    }

    public UtilizatorEntity cautaDupaId(Long id) {
        return utilizatorRepository.findById(id).orElse(null);
    }

    public Optional<UtilizatorEntity> verificaNumeDeUtilizatorSiParola(
            String numeDeUtilizator,
            String parola
    ) {
        if (this.numarDeUtilizatori() == 0) {
            return Optional.of(this.creeazaUtilizatorCaAdmin(numeDeUtilizator, parola));
        }

        Optional<UtilizatorEntity> utilizatorEntityOptional = utilizatorRepository.findByNumeDeUtilizator(numeDeUtilizator);

        if (utilizatorEntityOptional.isEmpty())
            return Optional.empty();

        if (!passwordEncoder.matches(parola, utilizatorEntityOptional.get().getParola()))
            return Optional.empty();

        return utilizatorEntityOptional;
    }

    public UtilizatorEntity creeazaUtilizator(String numeDeUtilizator, String parola) {
        if (utilizatorRepository.findByNumeDeUtilizator(numeDeUtilizator).isPresent())
            return null;

        UtilizatorEntity utilizatorEntity = new UtilizatorEntity();

        utilizatorEntity.setNumeDeUtilizator(numeDeUtilizator);
        utilizatorEntity.setParola(passwordEncoder.encode(parola));

        return utilizatorRepository.save(utilizatorEntity);
    }

    public UtilizatorEntity creeazaUtilizatorCaAdmin(String numeDeUtilizator, String parola) {
        UtilizatorEntity utilizatorEntity = creeazaUtilizator(numeDeUtilizator, parola);

        utilizatorEntity.setEsteAdmin(true);

        return utilizatorRepository.save(utilizatorEntity);
    }

    public List<UtilizatorEntity> totiUtilizatorii() {
        return utilizatorRepository.findAll();
    }

    public void stergeUtilizator(UtilizatorEntity utilizatorEntity) {
        utilizatorRepository.delete(utilizatorEntity);
    }

    public UtilizatorEntity modificaUtilizator(UtilizatorEntity utilizatorEntity) {
        return utilizatorRepository.save(utilizatorEntity);
    }
}
