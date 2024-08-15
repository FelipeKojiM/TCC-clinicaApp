package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Repository.AgendamentoRepository;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository){
        this.agendamentoRepository = agendamentoRepository;
    }

    @Operation(summary = "Obter todos os atendimentos", description = "Retorna uma lista de todos os atendimentos disponíveis.")
    public List<Agendamento> getAll(){
        return this.agendamentoRepository.findAll();
    }

    @Operation(summary = "Salvar atendimento", description = "Salva um novo atendimento no sistema.")
    public Agendamento save(Agendamento agendamento){
        return this.agendamentoRepository.save(agendamento);
    }


}
