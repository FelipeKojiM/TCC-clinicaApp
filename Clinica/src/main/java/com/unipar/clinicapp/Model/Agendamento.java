package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;

@Entity
@Getter
@Setter
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    private Paciente paciente;

    private String data_hora;

    private String procedimento;


}
