package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Entity
@Getter
@Setter
@Table(name = "ficha_capilar", uniqueConstraints = @UniqueConstraint(columnNames = "paciente_id"))
public class FichaCapilar implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Paciente paciente;

    private String queixaPrincipal;

    private String tempoProblema;

    private String doencaExistente;

    private String tricoscopia;

    private String medicacao;

    private String condicaoProblema;

    private String condicaoCabelo;

    private String couroCabeludo;

    private String novosFios;

    private String tratamentoAnterior;

    private String suplemento;

    private String contraceptivo;

    private String alimentacao;

    private String atividadeFisica;

    private String sono;

    private String estresse;

}
