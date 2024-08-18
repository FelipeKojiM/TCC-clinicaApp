package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.PacienteService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping(path = "/pacientes/save")
    public String savePaciente(Paciente paciente) {
        pacienteService.save(paciente);
        return "redirect:/pacientes";
    }

    @PostMapping("/pacientes/delete")
    public String deletePaciente(@RequestBody Paciente paciente) {
        pacienteService.delete(paciente.getId());
        return "redirect:/pacientes";
    }

    @PostMapping("/pacientes/getById")
    @ResponseBody
    public Paciente getId(@RequestBody Paciente paciente) {
        return pacienteService.getPaciente(paciente.getId());
    }

    @PostMapping(path = "/pacientes/{id}")
    public String updatePaciente(@PathVariable Long id, Paciente paciente) {
        pacienteService.update(paciente);
        return "redirect:/pacientes";
    }

}
