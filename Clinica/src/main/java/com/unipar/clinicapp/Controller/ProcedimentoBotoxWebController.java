package com.unipar.clinicapp.Controller;

import aj.org.objectweb.asm.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Model.ProcedimentoCapilar;
import com.unipar.clinicapp.Request.ProcedimentoBotoxRequest;
import com.unipar.clinicapp.Service.HistoricoVinculoBotoxService;
import com.unipar.clinicapp.Service.ProcedimentoBotoxService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Controller
@RequestMapping("/procedimentoBotox")
public class ProcedimentoBotoxWebController {

    private final ProcedimentoBotoxService procedimentoBotoxService;
    private final HistoricoVinculoBotoxService historicoVinculoBotoxService;

    public ProcedimentoBotoxWebController(ProcedimentoBotoxService procedimentoBotoxService, HistoricoVinculoBotoxService historicoVinculoBotoxService) {
        this.procedimentoBotoxService = procedimentoBotoxService;
        this.historicoVinculoBotoxService = historicoVinculoBotoxService;
    }

    @PostMapping("/api/salvar-imagem")
    public ResponseEntity<String> salvarImagem(@RequestParam("imagem") MultipartFile imagem) {
        try {
            String caminhoImagem = "src/main/resources/static/images/" + imagem.getOriginalFilename();

            File destino = new File(caminhoImagem);
            imagem.transferTo(destino);

            return ResponseEntity.ok("Imagem salva com sucesso!");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao salvar a imagem.");
        }
    }

    @PostMapping("/salvar")
    public String salvarProcedimentosBotox(@RequestBody ProcedimentoBotoxRequest request) {
        List<ProcedimentoBotox> procedimentos = request.getProcedimentos();
        Integer pacienteId = request.getPacienteId();

        Integer ultimoIdVinculo = procedimentoBotoxService.obterUltimoIdProcedimento();

        if(ultimoIdVinculo == null){
            ultimoIdVinculo = 1;
        }

        ultimoIdVinculo = ultimoIdVinculo + 1;

        for (ProcedimentoBotox procedimento : procedimentos) {
            procedimento.setIdVinculoProcedimento(ultimoIdVinculo);
            procedimento.setPacienteId(pacienteId);
            procedimento.setData(LocalDate.now());
            procedimentoBotoxService.salvar(procedimento);
        }
        return "redirect:/procedimentos#botox";
    }

    @PostMapping("/salvarHistoricoBotox")
    public String salvarHistoricoBotox(@RequestParam("areaAplicada") String areaAplicada) {

        Integer ultimoIdVinculo = procedimentoBotoxService.obterUltimoIdProcedimento();

        if(ultimoIdVinculo == null){
            ultimoIdVinculo = 1;
        }

        ultimoIdVinculo = ultimoIdVinculo + 1;

        HistoricoVinculoBotox historicoVinculoBotox = new HistoricoVinculoBotox();
        historicoVinculoBotox.setAreaAplicada(areaAplicada);
        historicoVinculoBotox.setVinculoProcedimentoBotox(ultimoIdVinculo);
        historicoVinculoBotox.setDataProcedimento(LocalDate.now());

        historicoVinculoBotoxService.save(historicoVinculoBotox);

        return "redirect:/procedimentos#botox";
    }

    @GetMapping("/BotoxVinculosAgrupados")
    public List<Object[]> getVinculosAgrupados() {return procedimentoBotoxService.listarVinculosAgrupados();}

    @GetMapping("/listProcedimentosBotoxById/{pacienteId}")
    @ResponseBody
    public List<ProcedimentoBotox> getProcedimentosByPaciente(@PathVariable("pacienteId") Integer pacienteId) {
        return procedimentoBotoxService.findByPacienteId(pacienteId);
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
