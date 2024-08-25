package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Service.ProcedimentoCapilarService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
public class ProcedimentoCapilarWebController {

    private final ProcedimentoCapilarService procedimentoCapilarService;

    public ProcedimentoCapilarWebController(ProcedimentoCapilarService procedimentoCapilarService) {
        this.procedimentoCapilarService = procedimentoCapilarService;
    }

    @GetMapping("/procedimentos/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoCapilar> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoCapilarService.findByPacienteId(pacienteId);
    }

    @PostMapping("/procedimentoCapilar/salvar")
    public String salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                     @RequestParam("protocoloUtilizado") String protocoloUtilizado,
                                     @RequestParam("resultadoObservado") String resultadoObservado) {
        ProcedimentoCapilar procedimento = new ProcedimentoCapilar();
        procedimento.setPacienteId(pacienteId);
        procedimento.setProtocoloUtilizado(protocoloUtilizado);
        procedimento.setResultadoObservado(resultadoObservado);
        procedimento.setData(LocalDate.now());

        procedimentoCapilarService.save(procedimento);

        return "redirect:/procedimentos";
    }

    @PostMapping("/procedimentoCapilar/getById")
    @ResponseBody
    public ProcedimentoCapilar getId(@RequestBody ProcedimentoCapilar procedimentoCapilar) {
        return procedimentoCapilarService.getProcedimento(procedimentoCapilar.getId());
    }

    @PostMapping("/procedimentoCapilar/{id}")
    public String updateProcedimentoCapilar(ProcedimentoCapilar procedimentoCapilar) {
        procedimentoCapilarService.update(procedimentoCapilar);
        return "redirect:/procedimentos#capilar";
    }

}
