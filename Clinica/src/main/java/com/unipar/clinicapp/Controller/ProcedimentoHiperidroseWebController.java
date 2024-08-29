package com.unipar.clinicapp.Controller;


import com.unipar.clinicapp.Model.ProcedimentoHiperidrose;
import com.unipar.clinicapp.Service.ProcedimentoHiperidroseService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
@RequestMapping("/procedimentoHiperidrose")
public class ProcedimentoHiperidroseWebController {

    private final ProcedimentoHiperidroseService procedimentoHiperidroseService;

    public ProcedimentoHiperidroseWebController(ProcedimentoHiperidroseService procedimentoHiperidroseService) {
        this.procedimentoHiperidroseService = procedimentoHiperidroseService;
    }

    @GetMapping("/getProcedimentoHiperhidroseById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoHiperidrose> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoHiperidroseService.findByPacienteId(pacienteId);
    }

    @PostMapping("/salvar")
    public String salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                     @RequestParam("protocoloUtilizado") String protocoloUtilizado,
                                     @RequestParam("resultadoObservado") String resultadoObservado) {
        ProcedimentoHiperidrose procedimento = new ProcedimentoHiperidrose();
        procedimento.setPacienteId(pacienteId);
        procedimento.setProtocoloUtilizado(protocoloUtilizado);
        procedimento.setResultadoObservado(resultadoObservado);
        procedimento.setData(LocalDate.now());

        procedimentoHiperidroseService.save(procedimento);

        return "redirect:/procedimentos";
    }

    @PostMapping("/getProcedimentoHiperhidroseById")
    @ResponseBody
    public ProcedimentoHiperidrose getId(@RequestParam Integer id) {
        return procedimentoHiperidroseService.getProcedimento(id);
    }


    @PostMapping("/editarProcedimentoHiperhidrose/{id}")
    public String updateProcedimentoHiperidrose(@RequestBody ProcedimentoHiperidrose procedimentoHiperidrose) {
        procedimentoHiperidroseService.update(procedimentoHiperidrose);
        return "redirect:/procedimentos#hiperidrose";
    }

    @PostMapping("/deleteProcedimentoHiperhidrose")
    public String deleteProcedimento(@RequestBody ProcedimentoHiperidrose procedimentoHiperidrose) {
        procedimentoHiperidroseService.delete(procedimentoHiperidrose.getId());
        return "redirect:/pacientes";
    }

}
