package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

    Paciente findByNome(String nome);

    void deleteById(Integer id);

    Paciente getPacienteById(Integer id);

    Optional<Paciente> findById(Integer id);

}
