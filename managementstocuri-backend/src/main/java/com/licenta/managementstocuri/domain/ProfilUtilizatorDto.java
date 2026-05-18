package com.licenta.managementstocuri.domain;

import lombok.Data;

@Data
public class ProfilUtilizatorDto {
    private final Long idUtilizator;
    private final String numeDeUtilizator;
    private final Boolean esteAdmin;
}
