package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    void deleteById(Integer id);

    Agendamento getAgendamentoById(Integer id);

}
