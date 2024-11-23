package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    boolean existsById(Integer id);

    @Query("SELECT EXTRACT(DAY FROM a.inicio), COUNT(a.id) FROM Agendamento a GROUP BY EXTRACT(DAY FROM a.inicio) ORDER BY EXTRACT(DAY FROM a.inicio)")
    List<Object[]> countAgendamentosPorDia();


}
