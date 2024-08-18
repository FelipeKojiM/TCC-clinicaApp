package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Medico;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Repository.AgendamentoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AgendamentoService {
    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository) {this.agendamentoRepository = agendamentoRepository;}

    public List<Agendamento> getAll() {return this.agendamentoRepository.findAll();}

    public Agendamento save(Agendamento agendamento) {return agendamentoRepository.save(agendamento);}

    public void delete(Integer id) {agendamentoRepository.deleteById(id);}

    public Agendamento getAgendamento(Integer id) {return agendamentoRepository.getAgendamentoById(id);}

    public Agendamento update(Agendamento agendamento){return this.agendamentoRepository.save(agendamento);}


}
