package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Repository
public interface ProcedimentoCapilarRepository extends JpaRepository<ProcedimentoCapilar, Integer> {

    List<ProcedimentoCapilar> findByPacienteId(Integer pacienteId);

    ProcedimentoCapilar getProcedimentoById(Integer id);

    @Query("SELECT EXTRACT(DAY FROM p.data) as dia, EXTRACT(MONTH FROM p.data) as mes, COUNT(p.id) FROM ProcedimentoCapilar p WHERE p.data BETWEEN :startDate AND :endDate GROUP BY dia, mes ORDER BY EXTRACT(MONTH FROM p.data), EXTRACT(DAY FROM p.data)")
    List<Object[]> countCapilarPorPeriodo(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("""
            SELECT 
                SUM(CASE WHEN subquery.quantidade = 1 THEN 1 ELSE 0 END) AS apenasUmProcedimento,
                SUM(CASE WHEN subquery.quantidade > 1 THEN 1 ELSE 0 END) AS maisDeUmProcedimento
            FROM (
                SELECT pc.paciente AS paciente, COUNT(pc.id) AS quantidade
                FROM ProcedimentoCapilar pc
                GROUP BY pc.paciente
            ) AS subquery
        """)
    Map<String, Long> obterContagemDePacientesPorQuantidadeDeProcedimentos();
}
