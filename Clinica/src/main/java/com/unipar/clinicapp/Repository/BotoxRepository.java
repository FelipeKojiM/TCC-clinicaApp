package com.unipar.clinicapp.Repository;


import com.unipar.clinicapp.Model.Botox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BotoxRepository extends JpaRepository<Botox, Integer> {
}
