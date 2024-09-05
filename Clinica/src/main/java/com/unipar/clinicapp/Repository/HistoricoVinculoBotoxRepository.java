package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoricoVinculoBotoxRepository extends JpaRepository<HistoricoVinculoBotox, Integer> {

    List<HistoricoVinculoBotox> findByPacienteId(Integer pacienteId);
}
