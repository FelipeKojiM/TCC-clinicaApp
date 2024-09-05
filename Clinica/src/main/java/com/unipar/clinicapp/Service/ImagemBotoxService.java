package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ImagemProcedimentoBotox;
import com.unipar.clinicapp.Repository.ImagemBotoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImagemBotoxService {

    @Autowired
    private ImagemBotoxRepository imagemBotoxRepository;

    public void salvar(ImagemProcedimentoBotox imagem) {imagemBotoxRepository.save(imagem);}

    public ImagemProcedimentoBotox buscarPorIdVinculo(Integer idVinculoProcedimento) {return imagemBotoxRepository.findByIdVinculoProcedimento(idVinculoProcedimento);}

}