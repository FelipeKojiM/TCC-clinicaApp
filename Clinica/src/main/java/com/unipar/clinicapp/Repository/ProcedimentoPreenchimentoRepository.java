package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcedimentoPreenchimentoRepository extends JpaRepository<ProcedimentoPreenchimento, Integer> {

    List<ProcedimentoPreenchimento> findByPacienteId(Integer pacienteId);

}
