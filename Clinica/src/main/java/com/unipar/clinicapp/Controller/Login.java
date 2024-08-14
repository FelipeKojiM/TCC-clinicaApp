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

@Controller
public class Login {

    @Autowired
    UsuarioService usuarioService;

    @PostMapping("/loginUsuario")
    public String processarLogin(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session, Model model) {
        // Lógica para processar login
        // Adicione a lógica para verificar as credenciais e retornar a página apropriada
        return "paginaInicial"; // Ou redirecione conforme necessário
    }


//    @PostMapping("/login")
//    public String login(@RequestParam("username") String username, @RequestParam("password") String password, HttpSession session, Model model) {
//        Usuario usuario = usuarioService.validarUsuario(username, password);
//        if (usuario != null) {
//            session.setAttribute("UsuarioLogado", username);
//            return "redirect:/paginaInicial";
//        } else {
//            model.addAttribute("erro", "Usuário ou Senha inválidos!");
//            return "redirect:/paginaInicial";
//        }
//    }
}
