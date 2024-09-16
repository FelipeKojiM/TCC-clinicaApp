package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;

@Entity
@Getter
@Setter
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String procedimento;

    private ZonedDateTime inicio;

    private ZonedDateTime fim;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

    private Boolean confirmacao;

    private Boolean comparecimento;

}
