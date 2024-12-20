package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Entity
@Getter
@Setter
public class FichaBotox implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer quantidadeUnidades;

    private String areaAplicacao;

    private String tipoBotox;

    private String dataAplicacao;

    private Integer duracaoEfeito; // em semanas ou meses

    private String recomendacoes;

    @ManyToOne
    private Paciente paciente;
}
