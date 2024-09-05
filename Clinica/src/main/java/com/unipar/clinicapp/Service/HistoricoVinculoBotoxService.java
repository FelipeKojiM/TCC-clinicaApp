package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Repository.HistoricoVinculoBotoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoricoVinculoBotoxService {

    @Autowired
    private final HistoricoVinculoBotoxRepository historicoVinculoBotoxRepository;

    public HistoricoVinculoBotoxService(HistoricoVinculoBotoxRepository historicoVinculoBotoxRepository) {
        this.historicoVinculoBotoxRepository = historicoVinculoBotoxRepository;
    }

    public void save(HistoricoVinculoBotox historicoVinculoBotox) {historicoVinculoBotoxRepository.save(historicoVinculoBotox);}

    public List<HistoricoVinculoBotox> findByPacienteId(Integer pacienteId) {return historicoVinculoBotoxRepository.findByPacienteId(pacienteId);}

}
