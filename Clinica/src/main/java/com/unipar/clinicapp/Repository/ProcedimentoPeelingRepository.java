package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoPeeling;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ProcedimentoPeelingRepository extends JpaRepository<ProcedimentoPeeling, Integer> {

    List<ProcedimentoPeeling> findByPacienteId(Integer pacienteId);

    @Query("SELECT EXTRACT(DAY FROM p.data) as dia, EXTRACT(MONTH FROM p.data) as mes, COUNT(p.id) FROM ProcedimentoPeeling p WHERE p.data BETWEEN :startDate AND :endDate GROUP BY dia, mes ORDER BY EXTRACT(MONTH FROM p.data), EXTRACT(DAY FROM p.data)")
    List<Object[]> countPeelingPorPeriodo(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}
