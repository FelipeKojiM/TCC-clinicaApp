package com.unipar.clinicapp.Model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Agendamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String procedimento;

    private LocalDateTime inicio;

    private LocalDateTime fim;

    @ManyToOne
    @JoinColumn(name = "paciente_id")
    private Paciente paciente;

}
