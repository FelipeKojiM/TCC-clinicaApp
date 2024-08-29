package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.FichaBotox;
import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.FichaBotoxService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
@Controller
public class FichaBotoxWebController {

    private final FichaBotoxService botoxService;
    private final PacienteService pacienteService;

    @Autowired
    public FichaBotoxWebController(FichaBotoxService botoxService, PacienteService pacienteService) {
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
    public String saveBotox(FichaBotox botox) {
        botoxService.save(botox);
        return "redirect:/procedimentos";
    }

    @GetMapping("/getFichaBotoxById/{id}")
    @ResponseBody
    public FichaBotox getFichaProcedimentoByPacienteId(@PathVariable("id") Integer id) {
        return botoxService.getFichaProcedimentoByPacienteId(id);
    }

}
