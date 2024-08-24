package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.LimpezaFacial;
import com.unipar.clinicapp.Repository.LimpezaFacialRepository;
import org.springframework.stereotype.Service;

@Service
public class LimpezaFacialService {

    private final LimpezaFacialRepository limpezaFacialRepository;

    public LimpezaFacialService(LimpezaFacialRepository limpezaFacialRepository) {this.limpezaFacialRepository = limpezaFacialRepository;}

    public LimpezaFacial save(LimpezaFacial limpezaFacial){return this.limpezaFacialRepository.save(limpezaFacial);}

}
