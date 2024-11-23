package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Repository.ProcedimentoCapilarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProcedimentoCapilarService {

    @Autowired
    ProcedimentoCapilarRepository procedimentoCapilarRepository;

    public void save(ProcedimentoCapilar procedimentoCapilar) {procedimentoCapilarRepository.save(procedimentoCapilar);}

    public List<ProcedimentoCapilar> findByPacienteId(Integer pacienteId) {return procedimentoCapilarRepository.findByPacienteId(pacienteId);}

    public ProcedimentoCapilar getProcedimento(Integer id) {return procedimentoCapilarRepository.getProcedimentoById(id);}

    public ProcedimentoCapilar update(ProcedimentoCapilar procedimentoCapilar){return this.procedimentoCapilarRepository.save(procedimentoCapilar);}

    public void delete(Integer id) {procedimentoCapilarRepository.deleteById(id);}

    public Map<String, Long> getCapilarPorPeriodo(LocalDate startDate, LocalDate endDate) {
        List<Object[]> resultados = procedimentoCapilarRepository.countCapilarPorPeriodo(startDate, endDate);

        Map<String, Long> capilarMap = new HashMap<>();

        for (Object[] r : resultados) {
            Integer dia = ((Number) r[0]).intValue();
            Integer mes = ((Number) r[1]).intValue();
            Long quantidade = ((Number) r[2]).longValue();

            String chave = dia + "/" + mes;

            capilarMap.put(chave, quantidade);
        }

        Map<String, Long> capilarMapOrdenado = capilarMap.entrySet()
                .stream()
                .sorted((entry1, entry2) -> {
                    String[] chave1 = entry1.getKey().split("/");
                    String[] chave2 = entry2.getKey().split("/");

                    int mes1 = Integer.parseInt(chave1[1]);
                    int mes2 = Integer.parseInt(chave2[1]);

                    if (mes1 == mes2) {
                        int dia1 = Integer.parseInt(chave1[0]);
                        int dia2 = Integer.parseInt(chave2[0]);
                        return Integer.compare(dia1, dia2);
                    }

                    return Integer.compare(mes1, mes2);
                })
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));

        return capilarMapOrdenado;
    }
}
