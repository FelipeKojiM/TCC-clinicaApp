package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Botox;
import com.unipar.clinicapp.Repository.BotoxRepository;
import org.springframework.stereotype.Service;

@Service
public class BotoxService {

    private final BotoxRepository botoxRepository;

    public BotoxService(BotoxRepository botoxRepository) {this.botoxRepository = botoxRepository;}

    public Botox save(Botox botox){return this.botoxRepository.save(botox);}

}
