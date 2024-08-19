package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Entity
@Getter
@Setter
public class Paciente implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String nome;
    private String telefone;
    private String data_nascimento;
    private String cpf;
    private String email;
    private String cep;
    private String bairro;
    private String logradouro;
    private String numero;

}
