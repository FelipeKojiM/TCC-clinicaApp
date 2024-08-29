package com.unipar.clinicapp.Repository;


import com.unipar.clinicapp.Model.FichaBotox;
import com.unipar.clinicapp.Model.FichaCapilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaBotoxRepository extends JpaRepository<FichaBotox, Integer> {

    FichaBotox findByPacienteId(@Param("pacienteId") Integer pacienteId);
}
