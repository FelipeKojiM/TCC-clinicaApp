package com.unipar.clinicapp.Repository;

import com.unipar.clinicapp.Model.LimpezaFacial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LimpezaFacialRepository extends JpaRepository<LimpezaFacial, Integer> {



}
