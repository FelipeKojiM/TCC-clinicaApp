package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Medico;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.MedicoService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class AgendamentoWebController {

    private final AgendamentoService agendamentoService;
    private final MedicoService medicoService;
    private final PacienteService pacienteService;

    public AgendamentoWebController(AgendamentoService agendamentoService, MedicoService medicoService, PacienteService pacienteService) {
        this.agendamentoService = agendamentoService;
        this.medicoService = medicoService;
        this.pacienteService = pacienteService;
    }

   // @GetMapping(path = "/agendamento")
    //public String getAllAgendamento(Model model) {
       // List<Agendamento> agendamentos = agendamentoService.getAll();
       // List<Medico> medicos = medicoService.getAll();
       // List<Paciente> pacientes = pacienteService.getAll();
       // model.addAttribute("agendamento", agendamentos); // Certifique-se de que o nome está correto
        //model.addAttribute("medicos", medicos);
       // model.addAttribute("pacientes", pacientes);
        //return "agendamento"; // Verifique se o nome do template corresponde ao arquivo HTML
    //}
   @GetMapping(path = "/agendamento")
   public String getAllAgendamento (Model model) {
       List<Agendamento> agendamento = agendamentoService.getAll();
       model.addAttribute("agendamento", agendamento);
       return "agendamento";
   }

    @PostMapping(path = "/agendamento/save")
    public String saveAgendamento(Agendamento agendamento) {
        agendamentoService.save(agendamento);
        return "redirect:/agendamento";
    }
}
