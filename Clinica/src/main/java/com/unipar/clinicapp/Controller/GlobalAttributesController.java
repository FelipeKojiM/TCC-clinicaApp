package com.unipar.clinicapp.Controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@ControllerAdvice
public class GlobalAttributesController {

    @ModelAttribute("usuarioLogado")
    public String getUsuarioLogado(HttpSession session) {
        return (String) session.getAttribute("UsuarioLogado");
    }

    @ModelAttribute("isAdmin")
    public Boolean getIsAdmin(HttpSession session) {
        return (Boolean) session.getAttribute("isAdmin");
    }

}
