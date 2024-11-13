package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoPeeling;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Repository.ProcedimentoPeelingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcedimentoPeelingService {

    private final ProcedimentoPeelingRepository procedimentoPeelingRepository;

    public ProcedimentoPeelingService(ProcedimentoPeelingRepository procedimentoPeelingRepository) {
        this.procedimentoPeelingRepository = procedimentoPeelingRepository;
    }

    public void save(ProcedimentoPeeling procedimentoPeeling) {procedimentoPeelingRepository.save(procedimentoPeeling);}

    public List<ProcedimentoPeeling> findByPacienteId(Integer pacienteId) {return procedimentoPeelingRepository.findByPacienteId(pacienteId);}

}
