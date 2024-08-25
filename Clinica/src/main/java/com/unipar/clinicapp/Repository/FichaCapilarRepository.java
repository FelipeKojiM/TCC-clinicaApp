package com.unipar.clinicapp.Repository;
import com.unipar.clinicapp.Model.FichaCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaCapilarRepository extends JpaRepository<FichaCapilar, Integer> {

    FichaCapilar findByPacienteId(Integer pacienteId);
}
