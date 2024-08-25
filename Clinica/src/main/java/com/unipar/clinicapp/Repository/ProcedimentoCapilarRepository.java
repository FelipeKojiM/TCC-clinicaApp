package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimentoCapilarRepository extends JpaRepository<ProcedimentoCapilar, Integer> {

    List<ProcedimentoCapilar> findByPacienteId(Integer pacienteId);

    ProcedimentoCapilar getProcedimentoById(Integer id);
}
