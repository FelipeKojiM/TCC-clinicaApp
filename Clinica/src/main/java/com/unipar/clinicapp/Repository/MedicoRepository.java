package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Medico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Integer> {

    Medico findByNome(String nome);

}
