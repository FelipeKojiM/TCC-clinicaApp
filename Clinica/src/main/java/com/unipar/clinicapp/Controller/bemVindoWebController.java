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
public class bemVindoWebController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/bemvindo")
    public String bemVindo(){
        return "bemVindo";
    }

    @GetMapping("/abrirProcedimentos")
    public String abrirProcedimentos(){return "procedimentos";}

    @PostMapping("/login")
    public String login(@RequestParam("username") String username,@RequestParam("password") String password,HttpSession session,Model model) {

        Usuario usuario = usuarioService.validarUsuario(username, password);

        if (usuario != null) {
            session.setAttribute("UsuarioLogado", username);

            if (usuario.getRole()){
                session.setAttribute("isAdmin", true);
                return "redirect:/paginaInicial";
            } else {
                session.setAttribute("isAdmin", false);
                return "redirect:/paginaInicial";
            }
        } else {
            model.addAttribute("erro", "Usuário ou Senha inválidos!");
            return "bemVindo";
        }
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "bemVindo";
    }
}