package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class ProcedimentoBotox {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer idVinculoProcedimento;

    private Integer pacienteId;

    private LocalDate data;

    private String corUtilizada;

    private String quantidadeBotox;

    private String observacoesBotox;
}
