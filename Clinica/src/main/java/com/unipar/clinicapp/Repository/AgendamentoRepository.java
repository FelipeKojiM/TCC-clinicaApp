package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Agendamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {
}
