package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Medico;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Repository.AgendamentoRepository;
import com.unipar.clinicapp.Repository.PacienteRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, PacienteRepository pacienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public Agendamento salvarAgendamento(Agendamento agendamento) {return agendamentoRepository.save(agendamento);}

    public List<Agendamento> findAll() {return agendamentoRepository.findAll();}

    public boolean getById(Integer id) {return agendamentoRepository.existsById(id);}

    public Agendamento getId(Integer id) {return agendamentoRepository.findById(id).orElse(null); }

    public void deletar(Integer id) {agendamentoRepository.deleteById(id);}

}
