package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoApiController {

    private final AgendamentoService agendamentoService;

    public AgendamentoApiController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @GetMapping
    public List<Agendamento> getAllAgendamentos() {
        return agendamentoService.getAll();
    }

    @GetMapping("/{id}")
    public Agendamento getAgendamentoById(@PathVariable Integer id) {
        return agendamentoService.getAgendamento(id);
    }

    @PostMapping
    public void saveAgendamento(@RequestBody Agendamento agendamento) {
        agendamentoService.save(agendamento);
    }

    @DeleteMapping("/{id}")
    public void deleteAgendamento(@PathVariable Integer id) {
        agendamentoService.delete(id);
    }
}

