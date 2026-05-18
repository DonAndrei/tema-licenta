package com.licenta.managementstocuri.repository;

import com.licenta.managementstocuri.entity.LotEntity;
import com.licenta.managementstocuri.entity.TipProdusEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LotRepository extends JpaRepository<LotEntity, Long> {
    @Query("""
    SELECT l FROM LotEntity l
    WHERE
        (
            LOWER(l.numeProdus) LIKE LOWER(CONCAT('%', :text, '%'))
            OR LOWER(l.descriere) LIKE LOWER(CONCAT('%', :text, '%'))
        )
    AND
        (
            :tipProdusId IS NULL
            OR l.tipProdus.id = :tipProdusId
        )
""")
    Page<LotEntity> cautaDupaTextSiTip(
            @Param("text") String text,
            @Param("tipProdusId") Long tipProdusId,
            Pageable pageable);

    List<LotEntity> findByTipProdus(TipProdusEntity tipProdus);
}
