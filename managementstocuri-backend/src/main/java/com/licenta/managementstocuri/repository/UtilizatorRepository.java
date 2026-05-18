package com.licenta.managementstocuri.repository;

import com.licenta.managementstocuri.entity.UtilizatorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilizatorRepository extends JpaRepository<UtilizatorEntity, Long> {
    Optional<UtilizatorEntity> findByNumeDeUtilizator(String numeDeUtilizator);
}
