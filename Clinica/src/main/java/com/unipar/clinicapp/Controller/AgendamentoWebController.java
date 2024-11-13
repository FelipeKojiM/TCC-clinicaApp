package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Encaixe;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.EncaixeService;
import com.unipar.clinicapp.Service.PacienteService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AgendamentoWebController {

    private final AgendamentoService agendamentoService;
    private final PacienteService pacienteService;
    private final EncaixeService encaixeService;

    public AgendamentoWebController(AgendamentoService agendamentoService, PacienteService pacienteService, EncaixeService encaixeService) {
        this.agendamentoService = agendamentoService;
        this.pacienteService = pacienteService;
        this.encaixeService = encaixeService;
    }

    @PostMapping("/salvarAgendamento")
    @ResponseBody  // Garante que o retorno seja em formato JSON e não uma view
    public ResponseEntity<Agendamento> salvarAgendamento(@RequestBody Agendamento agendamento) {
        agendamento.setConfirmacao(false);
        agendamento.setComparecimento(false);
        Agendamento agendamentoSalvo = agendamentoService.salvarAgendamento(agendamento);
        return ResponseEntity.ok(agendamentoSalvo);
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
            agendamento.setProcedimento(agendamento.getProcedimento());
            agendamento.setPaciente(agendamento.getPaciente());
            agendamento.setConfirmacao(agendamento.getConfirmacao());
            agendamento.setComparecimento(agendamento.getComparecimento());
            agendamentoService.salvarAgendamento(agendamento);

            return ResponseEntity.ok("Agendamento atualizado com sucesso!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar o agendamento");
        }
    }

    @PostMapping("/editarProcedimentoAgendamento/{id}")
    @ResponseBody
    public String editarProcedimento(@PathVariable Integer id, @RequestParam("procedimento") String procedimento,
                                     @RequestParam(value = "confirmacao", required = false) Boolean confirmacao,
                                     @RequestParam(value = "comparecimento", required = false) Boolean comparecimento) {
        try {

            Agendamento agendamento = agendamentoService.getId(id);
            if (agendamento == null) {
                return "Agendamento não encontrado";
            }

            agendamento.setProcedimento(procedimento);
            agendamento.setConfirmacao(confirmacao);
            agendamento.setComparecimento(comparecimento);
            agendamentoService.salvarAgendamento(agendamento);

            return "Procedimento do agendamento editado com sucesso";
        } catch (Exception exception) {
            return "Erro ao editar procedimento: " + exception.getMessage();
        }
    }

    @PostMapping("/deletarAgendamento")
    public String deletarAgendamento(@RequestParam("id") Integer id) {
        agendamentoService.deletar(id);
        return "redirect:/agenda";
    }

}
