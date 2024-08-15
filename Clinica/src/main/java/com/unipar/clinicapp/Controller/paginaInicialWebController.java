package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class paginaInicialWebController {

    @Autowired
    UsuarioService usuarioService;

    @GetMapping("/paginaInicial")
    public String paginaInicial(){
        return "paginaInicial";
    }
}
