package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class PacienteWebController {

    @Autowired
    private final PacienteService pacienteService;

    public PacienteWebController(PacienteService pacienteService) {this.pacienteService = pacienteService;
    }

    @PostMapping("/retornarBemVind")
    public String retornar(){ return "redirect:/bemvindo";}

    @GetMapping(path = "/pacientes")
    public String getAllPacientes(Model model){
        List<Paciente> pacientes = pacienteService.getAll();
        model.addAttribute("pacientes", pacientes);
        return "pacientes";
    }

    @PostMapping(path = "pacientes/save")
    public String savePaciente(Paciente paciente, @RequestParam("nome") String nome, Model model) {
        String erro = pacienteService.validarNomeDisponivel(nome);
        if (erro != null) {
            model.addAttribute("erro", "Nome já disponível!");
            return "redirect:/pacientes";
        } else {
            pacienteService.save(paciente);
            return "redirect:/pacientes";
        }
    }
}
