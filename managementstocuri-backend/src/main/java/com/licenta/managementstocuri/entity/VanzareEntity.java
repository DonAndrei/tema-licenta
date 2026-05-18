package com.licenta.managementstocuri.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Table(name = "vanzari")
@Entity
@Data
public class VanzareEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private LotEntity lot;

    @Column(nullable = false)
    private LocalDate data;

    @Column(nullable = false)
    private Long vanzari;
}
