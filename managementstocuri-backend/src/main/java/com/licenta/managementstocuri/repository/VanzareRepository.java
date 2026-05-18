package com.licenta.managementstocuri.repository;

import com.licenta.managementstocuri.entity.VanzareEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VanzareRepository extends JpaRepository<VanzareEntity, Long> {
    List<VanzareEntity> findByLotId(Long lotId);
}
