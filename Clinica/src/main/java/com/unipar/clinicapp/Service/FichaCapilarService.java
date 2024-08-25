package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Repository.FichaCapilarRepository;
import org.springframework.stereotype.Service;

@Service
public class FichaCapilarService {

    private final FichaCapilarRepository fichaCapilarRepository;

    public FichaCapilarService(FichaCapilarRepository fichaCapilarRepository) {this.fichaCapilarRepository = fichaCapilarRepository;}

    public FichaCapilar save(FichaCapilar fichaCapilar){return this.fichaCapilarRepository.save(fichaCapilar);}

    public void update(FichaCapilar fichaCapilar) {
        FichaCapilar existingFichaCapilar = fichaCapilarRepository.findByPacienteId(fichaCapilar.getPaciente().getId());
        if (existingFichaCapilar != null) {
            existingFichaCapilar.setPaciente(fichaCapilar.getPaciente());
            existingFichaCapilar.setQueixaPrincipal(fichaCapilar.getQueixaPrincipal());
            existingFichaCapilar.setTempoProblema(fichaCapilar.getTempoProblema());
            existingFichaCapilar.setDoencaExistente(fichaCapilar.getDoencaExistente());
            existingFichaCapilar.setTricoscopia(fichaCapilar.getTricoscopia());
            existingFichaCapilar.setMedicacao(fichaCapilar.getMedicacao());
            existingFichaCapilar.setCondicaoProblema(fichaCapilar.getCondicaoProblema());
            existingFichaCapilar.setCondicaoCabelo(fichaCapilar.getCondicaoCabelo());
            existingFichaCapilar.setCouroCabeludo(fichaCapilar.getCouroCabeludo());
            existingFichaCapilar.setNovosFios(fichaCapilar.getNovosFios());
            existingFichaCapilar.setTratamentoAnterior(fichaCapilar.getTratamentoAnterior());
            existingFichaCapilar.setSuplemento(fichaCapilar.getSuplemento());
            existingFichaCapilar.setContraceptivo(fichaCapilar.getContraceptivo());
            existingFichaCapilar.setAlimentacao(fichaCapilar.getAlimentacao());
            existingFichaCapilar.setAtividadeFisica(fichaCapilar.getAtividadeFisica());
            existingFichaCapilar.setSono(fichaCapilar.getSono());
            existingFichaCapilar.setEstresse(fichaCapilar.getEstresse());
            fichaCapilarRepository.save(existingFichaCapilar);
        } else {
            throw new IllegalArgumentException("FichaCapilar com ID fornecido não existe.");
        }
    }

    public FichaCapilar getFichaProcedimentoByPacienteId(Integer pacienteId) {
        return fichaCapilarRepository.findByPacienteId(pacienteId);
    }
}
