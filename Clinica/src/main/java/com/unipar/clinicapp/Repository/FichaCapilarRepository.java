package com.unipar.clinicapp.Repository;
import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaCapilarRepository extends JpaRepository<FichaCapilar, Integer> {

    FichaCapilar findByPacienteId(@Param("pacienteId") Integer pacienteId);
}
