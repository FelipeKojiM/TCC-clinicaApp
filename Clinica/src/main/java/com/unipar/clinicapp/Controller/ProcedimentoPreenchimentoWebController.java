package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Service.PacienteService;
import com.unipar.clinicapp.Service.ProcedimentoCapilarService;
import com.unipar.clinicapp.Service.ProcedimentoPreenchimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Controller
public class ProcedimentoPreenchimentoWebController {

    private final ProcedimentoPreenchimentoService procedimentoPreenchimentoService;
    private final PacienteService pacienteService;
    private final ProcedimentoCapilarService procedimentoCapilarService;

    public ProcedimentoPreenchimentoWebController(ProcedimentoPreenchimentoService procedimentoPreenchimentoService, PacienteService pacienteService, ProcedimentoCapilarService procedimentoCapilarService) {
        this.procedimentoPreenchimentoService = procedimentoPreenchimentoService;
        this.pacienteService = pacienteService;
        this.procedimentoCapilarService = procedimentoCapilarService;
    }

    @PostMapping("/procedimentoPreenchimento/salvar")
    public String salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                     @RequestParam("areaAplicada") String areaAplicada,
                                     @RequestParam("quantidadeAplicada") String quantidadeAplicada,
                                     @RequestParam("marcaProduto") String marcaProduto,
                                     @RequestParam("observacoes") String observacoes) {

        Paciente paciente = pacienteService.getPaciente(pacienteId);
        ProcedimentoPreenchimento procedimento = new ProcedimentoPreenchimento();
        procedimento.setPaciente(paciente);
        procedimento.setData(LocalDate.now());
        procedimento.setAreaAplicada(areaAplicada);
        procedimento.setQuantidadeAplicada(quantidadeAplicada);
        procedimento.setMarcaProduto(marcaProduto);
        procedimento.setObservacoes(observacoes);

        procedimentoPreenchimentoService.save(procedimento);

        return "redirect:/procedimentos#preenchimentos";
    }

    @GetMapping("/listProcedimentosPreenchimentoById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoPreenchimento> getProcedimentos(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoPreenchimentoService.findByPacienteId(pacienteId);
    }

}
