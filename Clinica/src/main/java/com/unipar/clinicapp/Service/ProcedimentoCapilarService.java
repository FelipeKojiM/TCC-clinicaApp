package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Repository.ProcedimentoCapilarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcedimentoCapilarService {

    @Autowired
    ProcedimentoCapilarRepository procedimentoCapilarRepository;

    public void save(ProcedimentoCapilar procedimentoCapilar) {procedimentoCapilarRepository.save(procedimentoCapilar);}

    public List<ProcedimentoCapilar> findByPacienteId(Integer pacienteId) {return procedimentoCapilarRepository.findByPacienteId(pacienteId);}

    public ProcedimentoCapilar getProcedimento(Integer id) {return procedimentoCapilarRepository.getProcedimentoById(id);}

    public ProcedimentoCapilar update(ProcedimentoCapilar procedimentoCapilar){return this.procedimentoCapilarRepository.save(procedimentoCapilar);}

    public void delete(Integer id) {procedimentoCapilarRepository.deleteById(id);}
}
