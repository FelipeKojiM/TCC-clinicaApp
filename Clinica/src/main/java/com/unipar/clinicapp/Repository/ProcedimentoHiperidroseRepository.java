package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Model.ProcedimentoHiperidrose;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProcedimentoHiperidroseRepository extends JpaRepository<ProcedimentoHiperidrose, Integer> {

    List<ProcedimentoHiperidrose> findByPacienteId(Integer pacienteId);

    Optional<ProcedimentoHiperidrose> findById(Integer id);

}
