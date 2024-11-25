package com.unipar.clinicapp.Service;

import com.unipar.clinicapp.Model.Agendamento;
import com.unipar.clinicapp.Repository.AgendamentoRepository;
import com.unipar.clinicapp.Repository.PacienteRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AgendamentoService {

    private final AgendamentoRepository agendamentoRepository;
    private final PacienteRepository pacienteRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, PacienteRepository pacienteRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.pacienteRepository = pacienteRepository;
    }

    public Agendamento salvarAgendamento(Agendamento agendamento) {return agendamentoRepository.save(agendamento);}

    public List<Agendamento> findAll() {return agendamentoRepository.findAll();}

    public boolean getById(Integer id) {return agendamentoRepository.existsById(id);}

    public Agendamento getId(Integer id) {return agendamentoRepository.findById(id).orElse(null); }

    public void deletar(Integer id) {agendamentoRepository.deleteById(id);}

    public Map<String, Long> getAgendamentosPorPeriodo(ZonedDateTime startDate, ZonedDateTime endDate) {
        List<Object[]> resultados = agendamentoRepository.countAgendamentosPorPeriodo(startDate, endDate);

        // Cria o mapa com as chaves no formato "dia/mes"
        Map<String, Long> agendamentosMap = new HashMap<>();

        // Preenche o mapa com os resultados
        for (Object[] r : resultados) {
            Integer dia = ((Number) r[0]).intValue(); // Dia
            Integer mes = ((Number) r[1]).intValue(); // Mês
            Long quantidade = ((Number) r[2]).longValue(); // Quantidade de agendamentos

            // Concatena o dia e o mês para formar a chave "dia/mes"
            String chave = dia + "/" + mes;

            // Coloca no mapa a chave formatada e a quantidade
            agendamentosMap.put(chave, quantidade);
        }

        // Ordenando o mapa por dia e mês
        Map<String, Long> agendamentosMapOrdenado = agendamentosMap.entrySet()
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

        return agendamentosMapOrdenado;
    }

    public long contarAgendamentosPorData(ZonedDateTime agora) {
        LocalDate inicioDoDia = agora.toLocalDate();
        ZonedDateTime inicioZoned = inicioDoDia.atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime fimZoned = inicioZoned.plusDays(1);
        return agendamentoRepository.contarAgendamentosPorData(inicioZoned, fimZoned);
    }

    public long contarConfirmacaoPorData(ZonedDateTime agora) {
        LocalDate inicioDoDia = agora.toLocalDate();
        ZonedDateTime inicioZoned = inicioDoDia.atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime fimZoned = inicioZoned.plusDays(1);
        return agendamentoRepository.contarConfirmadosPorData(inicioZoned, fimZoned);
    }

}
