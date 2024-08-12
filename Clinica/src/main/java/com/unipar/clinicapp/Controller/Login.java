package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class Login {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/login")
    public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session, Model model) {
        Usuario usuario = usuarioService.validarUsuario(username, password);
        if (usuario != null) {
            session.setAttribute("UsuarioLogado", username);
            return "redirect:/view/paginaInicial";
        } else {
            model.addAttribute("erro", "Usuário ou Senha inválidos!");
            return "login";
        }
    }

    @PostMapping("/salvarUsuario")
    public String cadastrarUsuarios(@RequestParam("nome") String nome, @RequestParam("login") String login,
                                    @RequestParam("senha") String senha, @RequestParam("confirmarSenha") String confirmarSenha,
                                    @RequestParam("telefone") String telefone, Model model) {
        if (senha.equals(confirmarSenha)) {
            Usuario novoUsuario = new Usuario();
            novoUsuario.setNome(nome);
            novoUsuario.setLogin(login);
            novoUsuario.setSenha(senha);
            usuarioService.salvarUsuario(novoUsuario);
            return "redirect:/view/paginaInicial";
        } else {
            model.addAttribute("erro", "As senhas não coincidem!");
            return "cadastro";
        }
    }
}
