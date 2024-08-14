package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class UsuarioApiController {

    private final UsuarioService usuarioService;

    public UsuarioApiController(UsuarioService usuarioService){this.usuarioService = usuarioService;
    }

    @GetMapping(path = "/api/usuario")
    public ResponseEntity<List<Usuario>> getAll(){return ResponseEntity.ok(this.usuarioService.getAll());
    }

    @PostMapping(path = "/api/usuarios")
    public ResponseEntity<Usuario> save(@RequestBody Usuario usuario){return ResponseEntity.ok(this.usuarioService.salvarUsuario(usuario));
    }
}
