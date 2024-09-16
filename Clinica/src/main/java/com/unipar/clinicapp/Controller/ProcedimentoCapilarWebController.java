package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Service.ProcedimentoCapilarService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
public class ProcedimentoCapilarWebController {

    private final ProcedimentoCapilarService procedimentoCapilarService;

    public ProcedimentoCapilarWebController(ProcedimentoCapilarService procedimentoCapilarService) {
        this.procedimentoCapilarService = procedimentoCapilarService;
    }

    @GetMapping("/listProcedimentosCapilarById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoCapilar> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoCapilarService.findByPacienteId(pacienteId);
    }

    @PostMapping("/salvarProcedimentoCapilar")
    public String salvarProcedimento(@RequestParam("paciente") Paciente paciente,
                                     @RequestParam("protocoloUtilizado") String protocoloUtilizado,
                                     @RequestParam("resultadoObservado") String resultadoObservado) {
        ProcedimentoCapilar procedimento = new ProcedimentoCapilar();
        procedimento.setPaciente(paciente);
        procedimento.setProtocoloUtilizado(protocoloUtilizado);
        procedimento.setResultadoObservado(resultadoObservado);
        procedimento.setData(LocalDate.now());

        procedimentoCapilarService.save(procedimento);

        return "redirect:/procedimentos";
    }

    @PostMapping("/getProcedimentoCapilarById")
    @ResponseBody
    public ProcedimentoCapilar getId(@RequestBody ProcedimentoCapilar procedimentoCapilar) {
        return procedimentoCapilarService.getProcedimento(procedimentoCapilar.getId());
    }

    @PostMapping("/editarProcedimentoCapilar/{id}")
    public String updateProcedimentoCapilar(ProcedimentoCapilar procedimentoCapilar) {
        procedimentoCapilarService.update(procedimentoCapilar);
        return "redirect:/procedimentos#capilar";
    }

    @PostMapping("/deleteProcedimentoCapilar")
    public String deleteProcedimento(@RequestBody ProcedimentoCapilar procedimentoCapilar) {
        procedimentoCapilarService.delete(procedimentoCapilar.getId());
        return "redirect:/pacientes";
    }
}
