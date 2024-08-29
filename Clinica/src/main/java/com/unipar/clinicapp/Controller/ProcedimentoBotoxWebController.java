package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Service.ProcedimentoBotoxService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/procedimentoBotox")
public class ProcedimentoBotoxWebController {

    private final ProcedimentoBotoxService procedimentoBotoxService;

    public ProcedimentoBotoxWebController(ProcedimentoBotoxService procedimentoBotoxService) {
        this.procedimentoBotoxService = procedimentoBotoxService;
    }

    @GetMapping("/procedimentos/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoBotox> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoBotoxService.findByPacienteId(pacienteId);
    }

    @PostMapping("/procedimentoBotox/salvar")
    public String salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                     @RequestParam("protocoloUtilizado") String protocoloUtilizado,
                                     @RequestParam("resultadoObservado") String resultadoObservado) {
        ProcedimentoBotox procedimento = new ProcedimentoBotox();
        procedimento.setPacienteId(pacienteId);
        procedimento.setProtocoloUtilizado(protocoloUtilizado);
        procedimento.setResultadoObservado(resultadoObservado);
        procedimento.setData(LocalDate.now());

        procedimentoBotoxService.save(procedimento);

        return "redirect:/procedimentos";
    }

    @PostMapping("/getProcedimentoBotoxById")
    @ResponseBody
    public ProcedimentoBotox getId(@RequestBody ProcedimentoBotox procedimentoBotox) {
        return procedimentoBotoxService.getProcedimento(procedimentoBotox.getId());
    }

    @PostMapping("/editarProcedimentoBotox/{id}")
    public String updateProcedimentoBotox(@RequestBody ProcedimentoBotox procedimentoBotox) {
        procedimentoBotoxService.update(procedimentoBotox);
        return "redirect:/procedimentos#botox";
    }

    @PostMapping("/deleteProcedimentoBotox")
    public String deleteProcedimento(@RequestBody ProcedimentoBotox procedimentoBotox) {
        procedimentoBotoxService.delete(procedimentoBotox.getId());
        return "redirect:/pacientes";
    }
}
