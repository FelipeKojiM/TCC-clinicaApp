package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.ImagemProcedimentoBotox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagemBotoxRepository extends JpaRepository<ImagemProcedimentoBotox, Integer> {

    ImagemProcedimentoBotox findByIdVinculoProcedimento(Integer idVinculoProcedimento);

}
