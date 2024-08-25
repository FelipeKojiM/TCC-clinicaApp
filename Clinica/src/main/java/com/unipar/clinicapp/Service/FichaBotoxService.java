package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.FichaBotox;
import com.unipar.clinicapp.Repository.FichaBotoxRepository;
import org.springframework.stereotype.Service;

@Service
public class FichaBotoxService {

    private final FichaBotoxRepository botoxRepository;

    public FichaBotoxService(FichaBotoxRepository botoxRepository) {this.botoxRepository = botoxRepository;}

    public FichaBotox save(FichaBotox botox){return this.botoxRepository.save(botox);}

}
