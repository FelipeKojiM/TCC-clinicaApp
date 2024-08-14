package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Service.UsuarioService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

//response body
@Controller
public class LoginWebController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/login")
    public String loginForm(){
        return "login";
    }

    @GetMapping("/hello-world")
    public String HelloWorld(@RequestParam(value = "name", defaultValue = "World")String name){
        return "hello " + name + "!";
    }

    @GetMapping("/bemvindo")
    public String bemVindo(){
        return "login";
    }

    @PostMapping("/login")
    public String Login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session, Model model) {
        Usuario usuario = usuarioService.validarUsuario(username, password);
        if (usuario != null) {
            session.setAttribute("UsuarioLogado", username);
            return "redirect:/paginaInicial"; // Redireciona para o arquivo estático
        } else {
            model.addAttribute("erro", "Usuário ou Senha inválidos!");
            return "login";
        }
    }


    @PostMapping("/cadastrarUsuarios")
    public String cadastrarUsuarios(){ return "redirect:/usuarios";}

}
