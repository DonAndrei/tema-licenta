package com.licenta.managementstocuri.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tipuri_produs")
@Data
public class TipProdusEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nume;
}
