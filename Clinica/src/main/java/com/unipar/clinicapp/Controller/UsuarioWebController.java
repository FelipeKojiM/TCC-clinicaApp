package com.unipar.clinicapp.Controller;
import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Service.UsuarioService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public class UsuarioWebController{

    private final UsuarioService usuarioService;

    public UsuarioWebController(UsuarioService usuarioService){this.usuarioService = usuarioService;
    }

    @GetMapping(path = "/usuarios")
    public String getAllUsuarios(Model model){
        List<Usuario> usuarios = usuarioService.getAll();
        model.addAttribute("usuarios", usuarios);
        return "usuarios";
    }

    @PostMapping(path = "usuarios/save")
    public String saveUsuario(Usuario usuario, @RequestParam("login") String login, Model model) {
        String erro = usuarioService.validarLoginDisponivel(login);
        if (erro != null) {
            model.addAttribute("erro", "Usuário ou Senha inválidos!");
            return "redirect:/usuarios";
        } else {
            usuarioService.salvarUsuario(usuario);
            return "redirect:/usuarios";
        }
    }

    @PostMapping("/retornarLogin")
    public String retornar(){ return "redirect:/login";}
}
