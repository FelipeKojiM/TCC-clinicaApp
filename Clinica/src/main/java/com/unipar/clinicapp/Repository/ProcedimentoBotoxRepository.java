package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import org.springframework.cglib.core.Local;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface ProcedimentoBotoxRepository extends JpaRepository<ProcedimentoBotox, Integer> {

    List<ProcedimentoBotox> findByIdVinculoProcedimento(Integer idVinculoProcedimento);

    ProcedimentoBotox getProcedimentoById(Integer id);

    @Query("SELECT MAX(p.idVinculoProcedimento) FROM ProcedimentoBotox p")
    Integer findMaxId();

    @Query("SELECT pb.idVinculoProcedimento, pb.data FROM ProcedimentoBotox pb GROUP BY pb.idVinculoProcedimento, pb.data")
    List<Object[]> findByVinculosProcedimento();

    @Query("SELECT EXTRACT(DAY FROM p.data) as dia, EXTRACT(MONTH FROM p.data) as mes, COUNT(p.id) " +
            "FROM ProcedimentoBotox p " +
            "WHERE p.data BETWEEN :startDate AND :endDate " +
            "GROUP BY dia, mes " +
            "ORDER BY EXTRACT(MONTH FROM p.data), EXTRACT(DAY FROM p.data)")
    List<Object[]> countBotoxPorPeriodo(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    @Query("""
            SELECT 
                SUM(CASE WHEN subquery.quantidade = 1 THEN 1 ELSE 0 END) AS apenasUmProcedimento,
                SUM(CASE WHEN subquery.quantidade > 1 THEN 1 ELSE 0 END) AS maisDeUmProcedimento
            FROM (
                SELECT pb.pacienteId AS pacienteId, COUNT(pb.id) AS quantidade
                FROM ProcedimentoBotox pb
                GROUP BY pb.pacienteId
            ) AS subquery
        """)
    Map<String, Long> obterContagemDePacientesPorQuantidadeDeProcedimentos();

    @Query("SELECT COUNT(p) FROM ProcedimentoBotox p WHERE p.data = :dataInicio")
    long contarProcedimentosPorData(@Param("dataInicio") LocalDate dataInicio);
}
