package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Integer> {

    Paciente findByNome(String nome);

    void deleteById(Integer id);

    Paciente getPacienteById(Integer id);

}
