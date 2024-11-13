package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Encaixe;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Service.AgendamentoService;
import com.unipar.clinicapp.Service.EncaixeService;
import com.unipar.clinicapp.Service.PacienteService;
import com.unipar.clinicapp.Service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class PaginacaoWebController {

    private final AgendamentoService agendamentoService;
    private final PacienteService pacienteService;
    private final EncaixeService encaixeService;
    private final UsuarioService usuarioService;

    public PaginacaoWebController(AgendamentoService agendamentoService,
                                  PacienteService pacienteService,
                                  EncaixeService encaixeService,
                                  UsuarioService usuarioService) {
        this.agendamentoService = agendamentoService;
        this.pacienteService = pacienteService;
        this.encaixeService = encaixeService;
        this.usuarioService = usuarioService;
    }

    @GetMapping("/bemvindo")
    public String bemVindo() {
        return "bemVindo";
    }


    @GetMapping("/agenda")
    public String abrirAgenda(Model model, HttpSession session) {

        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Paciente> pacientes = pacienteService.getAll();
            model.addAttribute("pacientes", pacientes);

            List<Encaixe> encaixes = encaixeService.findAll();
            model.addAttribute("encaixes", encaixes);

            return "agenda";
        }
    }

    @GetMapping("/procedimentos")
    public String retornaPacientes(Model model, HttpSession session) {

        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Paciente> pacientes = pacienteService.getAll();
            model.addAttribute("pacientes", pacientes);
            return "procedimentos";
        }
    }

    @GetMapping("/abrirPacientes")
    public String paciente(HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            return "pacientes";
        }
    }

    @GetMapping("/paginaInicial")
    public String paginaInicial(HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            return "paginaInicial";
        }
    }

    @GetMapping(path = "/usuarios")
    public String getAllUsuarios(Model model, HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Usuario> usuarios = usuarioService.getAll();
            model.addAttribute("usuarios", usuarios);
            return "usuarios";
        }
    }
}