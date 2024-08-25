package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Repository.FichaCapilarRepository;
import org.springframework.stereotype.Service;

@Service
public class FichaCapilarService {

    private final FichaCapilarRepository fichaCapilarRepository;

    public FichaCapilarService(FichaCapilarRepository fichaCapilarRepository) {this.fichaCapilarRepository = fichaCapilarRepository;}

    public FichaCapilar save(FichaCapilar fichaCapilar){return this.fichaCapilarRepository.save(fichaCapilar);}

    public FichaCapilar getFichaProcedimentoByPacienteId(Integer pacienteId) {
        return fichaCapilarRepository.findByPacienteId(pacienteId);
    }
}
