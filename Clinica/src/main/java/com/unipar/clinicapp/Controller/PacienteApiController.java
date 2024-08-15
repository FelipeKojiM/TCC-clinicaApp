package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Service.PacienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/pacientes")
public class PacienteApiController {

    private final PacienteService pacienteService;

    @Autowired
    public PacienteApiController(PacienteService pacienteService) {
        this.pacienteService = pacienteService;
    }

    @GetMapping
    public ResponseEntity<List<Paciente>> getAllPacientes() {
        List<Paciente> pacientes = pacienteService.getAll();
        return ResponseEntity.ok(pacientes);
    }

    @PostMapping
    public ResponseEntity<String> save(@RequestBody Paciente paciente) {
        String erro = pacienteService.validarNomeDisponivel(paciente.getNome());
        if (erro != null) {
            return ResponseEntity.badRequest().body("Nome já disponível!");
        } else {
            pacienteService.save(paciente);
            return ResponseEntity.ok("Paciente salvo com sucesso");
        }
    }
}
