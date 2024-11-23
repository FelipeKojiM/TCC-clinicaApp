package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoPeeling;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Repository.ProcedimentoPeelingRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProcedimentoPeelingService {

    private final ProcedimentoPeelingRepository procedimentoPeelingRepository;

    public ProcedimentoPeelingService(ProcedimentoPeelingRepository procedimentoPeelingRepository) {
        this.procedimentoPeelingRepository = procedimentoPeelingRepository;
    }

    public void save(ProcedimentoPeeling procedimentoPeeling) {procedimentoPeelingRepository.save(procedimentoPeeling);}

    public List<ProcedimentoPeeling> findByPacienteId(Integer pacienteId) {return procedimentoPeelingRepository.findByPacienteId(pacienteId);}

    public Map<String, Long> getPeelingPorPeriodo(LocalDate startDate, LocalDate endDate) {
        List<Object[]> resultados = procedimentoPeelingRepository.countPeelingPorPeriodo(startDate, endDate);

        Map<String, Long> peelingMap = new HashMap<>();

        for (Object[] r : resultados) {
            Integer dia = ((Number) r[0]).intValue();
            Integer mes = ((Number) r[1]).intValue();
            Long quantidade = ((Number) r[2]).longValue();

            String chave = dia + "/" + mes;

            peelingMap.put(chave, quantidade);
        }

        Map<String, Long> peelingMapOrdenado = peelingMap.entrySet()
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

        return peelingMapOrdenado;
    }
}
