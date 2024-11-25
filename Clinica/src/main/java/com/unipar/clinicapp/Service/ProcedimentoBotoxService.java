package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Repository.ProcedimentoBotoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ProcedimentoBotoxService {

    @Autowired
    ProcedimentoBotoxRepository procedimentoBotoxRepository;

    public void salvar(ProcedimentoBotox procedimento) {procedimentoBotoxRepository.save(procedimento);}

    public List<ProcedimentoBotox> findByIdVinculoProcedimento(Integer idVinculoProcedimento) {return procedimentoBotoxRepository.findByIdVinculoProcedimento(idVinculoProcedimento);}

    public ProcedimentoBotox getProcedimento(Integer id) {return procedimentoBotoxRepository.getProcedimentoById(id);}

    public ProcedimentoBotox update(ProcedimentoBotox procedimentoBotox){return this.procedimentoBotoxRepository.save(procedimentoBotox);}

    public void delete(Integer id) {procedimentoBotoxRepository.deleteById(id);}

    public Integer obterUltimoIdProcedimento() {return procedimentoBotoxRepository.findMaxId();}

    public Map<String, Long> getBotoxPorPeriodo(LocalDate startDate, LocalDate endDate) {
        List<Object[]> resultados = procedimentoBotoxRepository.countBotoxPorPeriodo(startDate, endDate);

        Map<String, Long> botoxMap = new HashMap<>();

        for (Object[] r : resultados) {
            Integer dia = ((Number) r[0]).intValue();
            Integer mes = ((Number) r[1]).intValue();
            Long quantidade = ((Number) r[2]).longValue();

            String chave = dia + "/" + mes;

            botoxMap.put(chave, quantidade);
        }

        Map<String, Long> botoxMapOrdenado = botoxMap.entrySet()
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

        return botoxMapOrdenado;
    }

    public Map<String, Long> obterContagemDePacientesBotox() {
        return procedimentoBotoxRepository.obterContagemDePacientesPorQuantidadeDeProcedimentos();
    }

    public long contarBotoxHoje() {
        LocalDate hoje = LocalDate.now();
        return procedimentoBotoxRepository.contarProcedimentosPorData(hoje);
    }

}
