package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.LimpezaFacial;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.LimpezaFacialService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;
@Controller
public class LimpezaFacialWebController {

    private final LimpezaFacialService limpezaFacialService;
    private final PacienteService pacienteService;

    @Autowired
    public LimpezaFacialWebController(LimpezaFacialService limpezaFacialService, PacienteService pacienteService) {
        this.limpezaFacialService = limpezaFacialService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/procedimentos/limpezaFacial")
    public String showProcedimentosPage(Model model) {
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "procedimentos";
    }

    @PostMapping(path = "/salvarFichaLimpezaFacial")
    public String saveBotox(LimpezaFacial limpezaFacial) {
        limpezaFacialService.save(limpezaFacial);
        return "redirect:/procedimentos";
    }

}
