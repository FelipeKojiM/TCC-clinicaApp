package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Medico;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.MedicoService;
import com.unipar.clinicapp.Service.PacienteService;
import com.unipar.clinicapp.Service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class AgendamentoWebController {

    private AgendamentoService agendamentoService;
    private MedicoService medicoService;
    private PacienteService pacienteService;

    public AgendamentoWebController(AgendamentoService agendamentoService, MedicoService medicoService, PacienteService pacienteService) {
        this.agendamentoService = agendamentoService;
        this.medicoService =  medicoService;
        this.pacienteService = pacienteService;
    }

    @Operation(summary = "Obter todos os atendimentos", description = "Retorna uma lista com todos os atendimentos cadastrados.")
    @GetMapping(path = "/agendamento")
    public String getAllAgendamento(Model model) {
        List<Agendamento> agendamento = agendamentoService.getAll();
        List<Medico> medicos = medicoService.getAll();
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("agendamento", agendamento);
        model.addAttribute("medicos", medicos);
        model.addAttribute("pacientes", pacientes);
        return "agendamento";
    }

    @Operation(summary = "Salvar um novo atendimento", description = "Salva um novo atendimento no sistema.")
    @PostMapping(path = "/agendamento/save")
    public String saveAgendamento(Agendamento agendamento) {
        System.out.println(agendamento);
        agendamentoService.save(agendamento);
        return "redirect:/agendamento";
    }

}
