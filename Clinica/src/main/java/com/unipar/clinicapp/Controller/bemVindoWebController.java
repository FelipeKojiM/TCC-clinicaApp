package com.unipar.clinicapp.Controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class bemVindoWebController {

    @PostMapping("/cadastrarMedicos")
    public String abrirCadastroMedicos(){return "redirect:/medicos";}

    @PostMapping("/cadastrarPacientes")
    public String abrirCadastroPacientes(){return "redirect:/pacientes";}
}