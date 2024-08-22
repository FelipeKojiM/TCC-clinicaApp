package com.unipar.clinicapp.Controller;
import com.unipar.clinicapp.Model.Capilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.CapilarService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;


@Controller
public class CapilarWebController {

    private final CapilarService capilarService;
    private final PacienteService pacienteService;

    @Autowired
    public CapilarWebController(CapilarService capilarService, PacienteService pacienteService) {
        this.capilarService = capilarService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/procedimentos")
    public String showProcedimentosPage(Model model) {
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "procedimentos";
    }

    @PostMapping(path = "/salvarFichaCapilar")
    public String saveCapilar(Capilar capilar) {
        capilarService.save(capilar);
        return "redirect:/procedimentos";
    }
}
