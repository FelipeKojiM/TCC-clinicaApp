package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.FichaCapilar;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Model.ProcedimentoPreenchimento;
import com.unipar.clinicapp.Service.PacienteService;
import com.unipar.clinicapp.Service.ProcedimentoCapilarService;
import com.unipar.clinicapp.Service.ProcedimentoPreenchimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    public ResponseEntity<Map<String, String>> salvarProcedimento(@RequestParam("pacienteId") Integer pacienteId,
                                                                  @RequestParam("areaAplicada") String areaAplicada,
                                                                  @RequestParam("quantidadeAplicada") String quantidadeAplicada,
                                                                  @RequestParam("marcaProduto") String marcaProduto,
                                                                  @RequestParam("observacoes") String observacoes) {

        Map<String, String> response = new HashMap<>();

        try{
            Paciente paciente = pacienteService.getPaciente(pacienteId);
            ProcedimentoPreenchimento procedimento = new ProcedimentoPreenchimento();
            procedimento.setPaciente(paciente);
            procedimento.setData(LocalDate.now());
            procedimento.setAreaAplicada(areaAplicada);
            procedimento.setQuantidadeAplicada(quantidadeAplicada);
            procedimento.setMarcaProduto(marcaProduto);
            procedimento.setObservacoes(observacoes);

            procedimentoPreenchimentoService.save(procedimento);

            // Resposta de sucesso
            response.put("status", "success");
            response.put("message", "Procedimento salvo com sucesso!");
        } catch (Exception e) {
            // Resposta de erro
            response.put("status", "error");
            response.put("message", "Erro ao salvar procedimento: " + e.getMessage());
        }

        return ResponseEntity.ok(response); // Retorna um JSON com a resposta
    }

    @GetMapping("/listProcedimentosPreenchimentoById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoPreenchimento> getProcedimentos(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoPreenchimentoService.findByPacienteId(pacienteId);
    }

}
