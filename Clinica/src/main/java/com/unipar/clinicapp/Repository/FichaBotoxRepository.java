package com.unipar.clinicapp.Repository;


import com.unipar.clinicapp.Model.FichaBotox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FichaBotoxRepository extends JpaRepository<FichaBotox, Integer> {
}
