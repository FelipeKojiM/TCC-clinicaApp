package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Service.AgendamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AgendamentoApiController {

    private final AgendamentoService agendamentoService;

    public AgendamentoApiController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }


    @GetMapping(path = "/api/agendamento")
    public ResponseEntity<List<Agendamento>> getAll() {
        return ResponseEntity.ok(agendamentoService.getAll());
    }


    @PostMapping(path = "/api/agendamento")
    public ResponseEntity<Agendamento> save(@RequestBody Agendamento agendamento){
        return ResponseEntity.ok(agendamentoService.save(agendamento));
    }

}
