package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Repository.ProcedimentoBotoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProcedimentoBotoxService {

    @Autowired
    ProcedimentoBotoxRepository procedimentoBotoxRepository;

    public void salvar(ProcedimentoBotox procedimento) {procedimentoBotoxRepository.save(procedimento);}

    public List<ProcedimentoBotox> findByPacienteId(Integer pacienteId) {return procedimentoBotoxRepository.findByPacienteId(pacienteId);}

    public ProcedimentoBotox getProcedimento(Integer id) {return procedimentoBotoxRepository.getProcedimentoById(id);}

    public ProcedimentoBotox update(ProcedimentoBotox procedimentoBotox){return this.procedimentoBotoxRepository.save(procedimentoBotox);}

    public void delete(Integer id) {procedimentoBotoxRepository.deleteById(id);}

    public Integer obterUltimoIdProcedimento() {return procedimentoBotoxRepository.findMaxId();}

    public List<Object[]> listarVinculosAgrupados() {return procedimentoBotoxRepository.findByVinculosProcedimento();}
}
