package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Entity
@Getter
@Setter
public class ImplanteCapilar implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer numeroSessoes;

    private String tipoImplante;

    private String areaImplante;

    private Integer quantidadeGrafts;

    private String dataProcedimento;

    private Integer tempoRecuperacao; // em dias
}
