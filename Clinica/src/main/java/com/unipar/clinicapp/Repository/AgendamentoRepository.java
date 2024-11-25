package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<Agendamento, Integer> {

    boolean existsById(Integer id);

    @Query("SELECT EXTRACT(DAY FROM a.inicio) as dia, EXTRACT(MONTH FROM a.inicio) as mes, COUNT(a.id) FROM Agendamento a WHERE a.inicio BETWEEN :startDate AND :endDate GROUP BY dia, mes ORDER BY EXTRACT(MONTH FROM a.inicio), EXTRACT(DAY FROM a.inicio)")
    List<Object[]> countAgendamentosPorPeriodo(@Param("startDate") ZonedDateTime startDate, @Param("endDate") ZonedDateTime endDate);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.inicio >= :dataInicio AND a.fim < :dataFim")
    long contarAgendamentosPorData(@Param("dataInicio") ZonedDateTime dataInicio, @Param("dataFim") ZonedDateTime dataFim);

    @Query("SELECT COUNT(a) FROM Agendamento a WHERE a.inicio >= :dataInicio AND a.fim < :dataFim AND a.confirmacao = true")
    long contarConfirmadosPorData(@Param("dataInicio") ZonedDateTime dataInicio, @Param("dataFim") ZonedDateTime dataFim);
}
