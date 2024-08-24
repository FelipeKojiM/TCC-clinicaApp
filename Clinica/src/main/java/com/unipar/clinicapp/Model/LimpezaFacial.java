package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Entity
@Getter
@Setter
public class LimpezaFacial implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Paciente paciente;

    private String tipoLimpeza;

    private String produtosUtilizados;

    private String tipoPele;

    private String dataTratamento;

    private String resultadoEsperado;
}
