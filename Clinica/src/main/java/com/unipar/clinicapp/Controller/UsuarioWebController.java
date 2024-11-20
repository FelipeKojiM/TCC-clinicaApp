package com.unipar.clinicapp.Controller;
import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Repository.UsuarioRepository;
import com.unipar.clinicapp.Service.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Controller
public class UsuarioWebController{

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    public UsuarioWebController(UsuarioService usuarioService, UsuarioRepository usuarioRepository){this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/{id}/uploadFoto")
    public ResponseEntity<String> uploadFoto(@PathVariable Integer id, @RequestParam("foto") MultipartFile foto) {
        try {
            Usuario usuario = usuarioRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            usuario.setFotoPerfil(foto.getBytes());
            usuarioRepository.save(usuario);

            return ResponseEntity.ok("Foto enviada com sucesso!");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao processar o arquivo: " + e.getMessage());
        }
    }

    @PostMapping("/retornarLogin")
    public String retornar(){ return "redirect:/login";}
}
