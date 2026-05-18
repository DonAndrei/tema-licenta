package com.licenta.managementstocuri.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "utilizatori")
@Data
public class UtilizatorEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String numeDeUtilizator;

    @Column(nullable = false)
    private String parola;

    @ColumnDefault("false")
    private Boolean esteAdmin;
}
