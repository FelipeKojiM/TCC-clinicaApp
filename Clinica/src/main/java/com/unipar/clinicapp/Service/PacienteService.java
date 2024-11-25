package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
@Service
public class PacienteService {

    @Autowired
    private final PacienteRepository pacienteRepository;

    public PacienteService(PacienteRepository pacienteRepository){
        this.pacienteRepository = pacienteRepository;
    }

    public List<Paciente> getAll(){return this.pacienteRepository.findAll();}

    public Paciente save(Paciente paciente){return this.pacienteRepository.save(paciente);}

    public void delete(Integer id) {pacienteRepository.deleteById(id);}

    public Paciente getPaciente(Integer id) {return pacienteRepository.findById(id).orElse(null);}

    public Paciente update(Paciente paciente){return this.pacienteRepository.save(paciente);}

    public String validarNomeDisponivel(String nome) {
        Paciente pacienteExistente = pacienteRepository.findByNome(nome);
        if (pacienteExistente != null) {
            return "Nome já em uso, tente outro!";
        }
        return null;
    }

    public long obterQuantidadeDePacientes() {
        return pacienteRepository.contarPacientes();
    }
}
