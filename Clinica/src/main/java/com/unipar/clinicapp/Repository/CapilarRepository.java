package com.unipar.clinicapp.Repository;
import com.unipar.clinicapp.Model.Capilar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CapilarRepository extends JpaRepository<Capilar, Integer> {

}
