package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Encaixe;
import com.unipar.clinicapp.Repository.EncaixeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EncaixeService {

    private final EncaixeRepository encaixeRepository;

    public EncaixeService(EncaixeRepository encaixeRepository, EncaixeRepository encaixeRepository1) {
        this.encaixeRepository = encaixeRepository1;
    }

    public Encaixe save(Encaixe encaixe) {return encaixeRepository.save(encaixe);}

    public List<Encaixe> findAll() {return encaixeRepository.findAll();}

    public void deleteById(Integer id) {encaixeRepository.deleteById(id);}
}
