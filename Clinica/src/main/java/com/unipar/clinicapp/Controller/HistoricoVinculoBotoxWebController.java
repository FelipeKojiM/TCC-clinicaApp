package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import com.unipar.clinicapp.Service.HistoricoVinculoBotoxService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Controller
public class HistoricoVinculoBotoxWebController {

    private final HistoricoVinculoBotoxService historicoVinculoBotoxService;

    public HistoricoVinculoBotoxWebController(HistoricoVinculoBotoxService historicoVinculoBotoxService) {
        this.historicoVinculoBotoxService = historicoVinculoBotoxService;
    }
}
