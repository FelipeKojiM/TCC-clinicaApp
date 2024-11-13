package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Repository.ProcedimentoPreenchimentoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProcedimentoPreenchimentoService {

    private final ProcedimentoPreenchimentoRepository procedimentoPreenchimentoRepository;

    public ProcedimentoPreenchimentoService(ProcedimentoPreenchimentoRepository procedimentoPreenchimentoRepository) {
        this.procedimentoPreenchimentoRepository = procedimentoPreenchimentoRepository;
    }

    public void save(ProcedimentoPreenchimento procedimentoPreenchimento) {procedimentoPreenchimentoRepository.save(procedimentoPreenchimento);}

    public List<ProcedimentoPreenchimento> findByPacienteId(Integer pacienteId) {return procedimentoPreenchimentoRepository.findByPacienteId(pacienteId);}

}
