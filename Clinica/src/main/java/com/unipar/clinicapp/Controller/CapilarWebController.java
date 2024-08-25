package com.unipar.clinicapp.Controller;
import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.FichaCapilarService;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class CapilarWebController {

    private final FichaCapilarService fichaCapilarService;
    private final PacienteService pacienteService;

    @Autowired
    public CapilarWebController(FichaCapilarService fichaCapilarService, PacienteService pacienteService) {
        this.fichaCapilarService = fichaCapilarService;
        this.pacienteService = pacienteService;
    }

    @GetMapping("/procedimentos")
    public String showProcedimentosPage(Model model) {
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "procedimentos";
    }

    @PostMapping(path = "/salvarFichaCapilar")
    public String saveCapilar(FichaCapilar fichaCapilar) {
        fichaCapilarService.save(fichaCapilar);
        return "redirect:/procedimentos";
    }

    @GetMapping("/procedimento/paciente/{id}")
    @ResponseBody
    public FichaCapilar getFichaProcedimentoByPacienteId(@PathVariable("id") Integer id) {
        return fichaCapilarService.getFichaProcedimentoByPacienteId(id);
    }

}
