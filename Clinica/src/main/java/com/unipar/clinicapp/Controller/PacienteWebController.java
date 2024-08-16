package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@Controller
public class PacienteWebController {

    private final PacienteService pacienteService;

    public PacienteWebController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping("/abrirPacientes")
    public String paciente(){
        return "pacientes";
    }

    @GetMapping(path = "/pacientes")
    public String getAllPacientes(Model model){
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "pacientes";
    }

    @Operation(summary = "Salvar um paciente", description = "Salva um novo paciente no sistema.")
    @PostMapping(path = "/pacientes/save")
    public String savePaciente(Paciente paciente) {
        pacienteService.save(paciente);
        return "redirect:/pacientes";
    }

}
