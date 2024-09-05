package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Service.HistoricoVinculoBotoxService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Controller
public class HistoricoVinculoBotoxWebController {

    private final HistoricoVinculoBotoxService historicoVinculoBotoxService;

    public HistoricoVinculoBotoxWebController(HistoricoVinculoBotoxService historicoVinculoBotoxService) {
        this.historicoVinculoBotoxService = historicoVinculoBotoxService;
    }

    @GetMapping("/listHistoricoBotoxById/{pacienteId}")
    @ResponseBody
    public List<HistoricoVinculoBotox> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return historicoVinculoBotoxService.findByPacienteId(pacienteId);
    }
}
