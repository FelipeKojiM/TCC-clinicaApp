package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProcedimentoBotoxRepository extends JpaRepository<ProcedimentoBotox, Integer> {

    List<ProcedimentoBotox> findByIdVinculoProcedimento(Integer idVinculoProcedimento);

    ProcedimentoBotox getProcedimentoById(Integer id);

    @Query("SELECT MAX(p.idVinculoProcedimento) FROM ProcedimentoBotox p")
    Integer findMaxId();

    @Query("SELECT pb.idVinculoProcedimento, pb.data FROM ProcedimentoBotox pb GROUP BY pb.idVinculoProcedimento, pb.data")
    List<Object[]> findByVinculosProcedimento();
}
