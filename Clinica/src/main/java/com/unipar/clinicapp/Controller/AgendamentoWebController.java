package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AgendamentoWebController {

    private final AgendamentoService agendamentoService;
    private final PacienteService pacienteService;

    public AgendamentoWebController(AgendamentoService agendamentoService, PacienteService pacienteService) {this.agendamentoService = agendamentoService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/agenda")
    public String abrirAgenda(){
        return "agenda";
    }

    @PostMapping("/salvarAgendamento")
    @ResponseBody  // Garante que o retorno seja em formato JSON e não uma view
    public ResponseEntity<String> salvarAgendamento(@RequestBody Agendamento agendamento) {
        try {
            agendamentoService.salvarAgendamento(agendamento);

            return ResponseEntity.ok("Agendamento salvo com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar o agendamento");
        }
    }

    @GetMapping("/listarAgendamentos")
    @ResponseBody
    public ResponseEntity<List<Agendamento>> listarAgendamentos() {
        try {
            List<Agendamento> agendamentos = agendamentoService.findAll();
            return ResponseEntity.ok(agendamentos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PutMapping("/agendamentos/{id}")
    @ResponseBody
    public ResponseEntity<String> atualizarAgendamento(@PathVariable Integer id, @RequestBody Agendamento agendamento) {
        try {
            // Verifica se o agendamento existe
            if (!agendamentoService.getById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Agendamento não encontrado");
            }

            // Atualiza o agendamento
            agendamento.setId(id);
            agendamentoService.salvarAgendamento(agendamento);

            return ResponseEntity.ok("Agendamento atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar o agendamento");
        }
    }

}
