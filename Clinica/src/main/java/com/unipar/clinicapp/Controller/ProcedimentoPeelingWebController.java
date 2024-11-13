package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoPeeling;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Service.PacienteService;
import com.unipar.clinicapp.Service.ProcedimentoCapilarService;
import com.unipar.clinicapp.Service.ProcedimentoPeelingService;
import com.unipar.clinicapp.Service.ProcedimentoPreenchimentoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
public class ProcedimentoPeelingWebController {

    private final ProcedimentoPeelingService procedimentoPeelingService;
    private final PacienteService pacienteService;

    public ProcedimentoPeelingWebController(ProcedimentoPeelingService procedimentoPeelingService, PacienteService pacienteService) {
        this.procedimentoPeelingService = procedimentoPeelingService;
        this.pacienteService = pacienteService;
    }

    @PostMapping("/procedimentoPeeling/salvar")
    public String salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                     @RequestParam("quantidadeAplicada") String quantidadeAplicada,
                                     @RequestParam("marcaProduto") String marcaProduto,
                                     @RequestParam("observacoes") String observacoes) {

        Paciente paciente = pacienteService.getPaciente(pacienteId);
        ProcedimentoPeeling procedimento = new ProcedimentoPeeling();
        procedimento.setPaciente(paciente);
        procedimento.setData(LocalDate.now());
        procedimento.setQuantidadeAplicada(quantidadeAplicada);
        procedimento.setMarcaProduto(marcaProduto);
        procedimento.setObservacoes(observacoes);

        procedimentoPeelingService.save(procedimento);

        return "redirect:/procedimentos#preenchimentos";
    }

    @GetMapping("/listProcedimentosPeelingById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoPeeling> getProcedimentos(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoPeelingService.findByPacienteId(pacienteId);
    }
}
