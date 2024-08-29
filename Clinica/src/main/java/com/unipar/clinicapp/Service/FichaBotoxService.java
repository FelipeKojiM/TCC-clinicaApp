package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.FichaBotox;
import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Repository.FichaBotoxRepository;
import org.springframework.stereotype.Service;

@Service
public class FichaBotoxService {

    private final FichaBotoxRepository botoxRepository;
    private final FichaBotoxRepository fichaBotoxRepository;

    public FichaBotoxService(FichaBotoxRepository botoxRepository, FichaBotoxRepository fichaBotoxRepository) {this.botoxRepository = botoxRepository;
        this.fichaBotoxRepository = fichaBotoxRepository;
    }

    public FichaBotox save(FichaBotox botox){return this.botoxRepository.save(botox);}

    public FichaBotox getFichaProcedimentoByPacienteId(Integer pacienteId) {
        return fichaBotoxRepository.findByPacienteId(pacienteId);
    }
}
