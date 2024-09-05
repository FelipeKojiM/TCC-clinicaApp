package com.unipar.clinicapp.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class HistoricoVinculoBotox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer vinculoProcedimentoBotox;

    private Integer pacienteId;

    private LocalDate dataProcedimento;

    private String areaAplicada;

}
