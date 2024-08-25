package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ProcedimentoBotoxRepository extends JpaRepository<ProcedimentoBotox, Integer> {

    List<ProcedimentoBotox> findByPacienteId(Integer pacienteId);

    ProcedimentoBotox getProcedimentoById(Integer id);

}
