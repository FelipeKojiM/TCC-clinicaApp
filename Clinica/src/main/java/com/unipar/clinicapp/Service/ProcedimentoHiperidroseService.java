package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoHiperidrose;
import com.unipar.clinicapp.Repository.ProcedimentoHiperidroseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcedimentoHiperidroseService {

    @Autowired
    private ProcedimentoHiperidroseRepository procedimentoHiperidroseRepository;

    public void save(ProcedimentoHiperidrose procedimentoHiperidrose) {
        procedimentoHiperidroseRepository.save(procedimentoHiperidrose);
    }

    public List<ProcedimentoHiperidrose> findByPacienteId(Integer pacienteId) {
        return procedimentoHiperidroseRepository.findByPacienteId(pacienteId);
    }

    public ProcedimentoHiperidrose getProcedimento(Integer id) {
        return procedimentoHiperidroseRepository.findById(id).orElse(null);
    }


    public ProcedimentoHiperidrose update(ProcedimentoHiperidrose procedimentoHiperidrose) {
        return procedimentoHiperidroseRepository.save(procedimentoHiperidrose);
    }

    public void delete(Integer id) {
        procedimentoHiperidroseRepository.deleteById(id);
    }

}
