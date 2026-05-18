package com.licenta.managementstocuri.repository;

import com.licenta.managementstocuri.entity.TipProdusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipProdusRepository extends JpaRepository<TipProdusEntity, Long> {
}
