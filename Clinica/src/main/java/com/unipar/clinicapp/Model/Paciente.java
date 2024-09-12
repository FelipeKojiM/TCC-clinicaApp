package com.unipar.clinicapp.Model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;

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

    @OneToMany
    private List<Agendamento> eventos;

    public Paciente() {}

    @JsonCreator
    public Paciente(@JsonProperty("id") Integer id, @JsonProperty("nome") String nome) {
        this.id = id;
        this.nome = nome;
    }
}
