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
public class FichaCapilarWebController {

    private final FichaCapilarService fichaCapilarService;
    private final PacienteService pacienteService;

    @Autowired
    public FichaCapilarWebController(FichaCapilarService fichaCapilarService, PacienteService pacienteService) {
        this.fichaCapilarService = fichaCapilarService;
        this.pacienteService = pacienteService;
    }

    @PostMapping("/salvarFichaCapilar")
    public String saveCapilar(FichaCapilar fichaCapilar, @RequestParam("pacienteIdFichaCapilar") Integer paciente) {
        if(fichaCapilarService.getFichaProcedimentoByPacienteId(paciente) == null){
            fichaCapilarService.save(fichaCapilar);
        } else {
            fichaCapilarService.update(fichaCapilar);
        }
        return "redirect:/procedimentos#capilar";
    }


    @GetMapping("/getFichaCapilarById/{id}")
    @ResponseBody
    public FichaCapilar getFichaProcedimentoByPacienteId(@PathVariable("id") Integer id) {
        return fichaCapilarService.getFichaProcedimentoByPacienteId(id);
    }

}
