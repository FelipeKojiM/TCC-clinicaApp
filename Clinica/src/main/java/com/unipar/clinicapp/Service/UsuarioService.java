package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UsuarioService {

    @Autowired
    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository){
        this.usuarioRepository = usuarioRepository;
    }

    public List<Usuario> getAll(){
        return this.usuarioRepository.findAll();
    }

    public Usuario salvarUsuario(Usuario usuario){
        return this.usuarioRepository.save(usuario);
    }

    public Usuario validarUsuario(String login, String senha) {return this.usuarioRepository.findByLoginAndSenha(login, senha);}

//    public String validarLoginDisponivel(String login) {
//        Usuario usuarioExistente = usuarioRepository.findByLogin(login);
//        if (usuarioExistente != null) {
//            return "Login já em uso, tente outro!";
//        }
//        return null;
//    }

}