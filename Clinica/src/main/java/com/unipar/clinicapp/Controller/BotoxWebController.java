package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Botox;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.BotoxService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
@Controller
public class BotoxWebController {

    private final BotoxService botoxService;
    private final PacienteService pacienteService;

    @Autowired
    public BotoxWebController(BotoxService botoxService, PacienteService pacienteService) {
        this.botoxService = botoxService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/procedimentos/botox")
    public String showProcedimentosPage(Model model) {
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "procedimentos";
    }

    @PostMapping(path = "/salvarFichaBotox")
    public String saveBotox(Botox botox) {
        botoxService.save(botox);
        return "redirect:/procedimentos";
    }

}
