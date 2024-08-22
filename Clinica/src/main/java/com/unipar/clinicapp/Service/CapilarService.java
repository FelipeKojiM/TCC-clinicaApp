package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Capilar;
import com.unipar.clinicapp.Repository.CapilarRepository;
import org.springframework.stereotype.Service;

@Service
public class CapilarService {

    private final CapilarRepository capilarRepository;

    public CapilarService(CapilarRepository capilarRepository) {this.capilarRepository = capilarRepository;}

    public Capilar save(Capilar capilar){return this.capilarRepository.save(capilar);}


}
