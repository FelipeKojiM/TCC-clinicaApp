package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Model.Medico;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.MedicoService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class AgendamentoWebController {

    @GetMapping("/agenda")
    public String abrirAgenda(){return "agenda";}

    private final AgendamentoService agendamentoService;

    private final PacienteService pacienteService;

    public AgendamentoWebController(AgendamentoService agendamentoService, MedicoService medicoService, PacienteService pacienteService) {
        this.agendamentoService = agendamentoService;

        this.pacienteService = pacienteService;
    }

    @GetMapping(path = "/agenda/abrir")
    public String getAllAgendamento(Model model) {
        List<Agendamento> agendamentos = agendamentoService.getAll();
        model.addAttribute("agendamentos", agendamentos);
        return "agenda";
    }


    @PostMapping(path = "/agendamento/save")
    public String saveAgendamento(Agendamento agendamento) {
        agendamentoService.save(agendamento);
        return "redirect:/agendamento";
    }

    @PostMapping("/agendamento/delete")
    public String deleteAgendamento(@RequestBody Agendamento agendamento) {
        pacienteService.delete(agendamento.getId());
        return "redirect:/agendamento";
    }

    @PostMapping("/agendamento/getById")
    @ResponseBody
    public Agendamento getId(@RequestBody Agendamento agendamento) {
        return agendamentoService.getAgendamento(agendamento.getId());
    }

    @PostMapping(path = "/agendamento/{id}")
    public String updateAgendamento(@PathVariable Long id, Agendamento agendamento) {
        agendamentoService.update(agendamento);
        return "redirect:/agendamento";
    }
}
