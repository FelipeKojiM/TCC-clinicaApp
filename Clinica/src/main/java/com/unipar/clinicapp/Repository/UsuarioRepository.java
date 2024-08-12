package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

    Usuario findByLoginAndSenha(String login, String senha);
    Usuario findByLogin(String login);
}