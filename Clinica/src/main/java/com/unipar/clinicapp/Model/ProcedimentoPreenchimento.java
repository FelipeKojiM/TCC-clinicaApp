package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class ProcedimentoPreenchimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Paciente paciente;

    private LocalDate data;
    private String areaAplicada;
    private String quantidadeAplicada;
    private String marcaProduto;
    private String observacoes;
}
