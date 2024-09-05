package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.HistoricoVinculoBotox;
import com.unipar.clinicapp.Model.ImagemProcedimentoBotox;
import com.unipar.clinicapp.Model.ProcedimentoBotox;
import com.unipar.clinicapp.Request.ProcedimentoBotoxRequest;
import com.unipar.clinicapp.Service.HistoricoVinculoBotoxService;
import com.unipar.clinicapp.Service.ImagemBotoxService;
import com.unipar.clinicapp.Service.ProcedimentoBotoxService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.time.LocalDate;
import java.util.*;
import java.util.List;

@Controller
@RequestMapping("/procedimentoBotox")
public class ProcedimentoBotoxWebController {

    private final ProcedimentoBotoxService procedimentoBotoxService;
    private final HistoricoVinculoBotoxService historicoVinculoBotoxService;
    private final ImagemBotoxService imagemBotoxService;

    public ProcedimentoBotoxWebController(ProcedimentoBotoxService procedimentoBotoxService, HistoricoVinculoBotoxService historicoVinculoBotoxService, ImagemBotoxService imagemBotoxService) {
        this.procedimentoBotoxService = procedimentoBotoxService;
        this.historicoVinculoBotoxService = historicoVinculoBotoxService;
        this.imagemBotoxService = imagemBotoxService;
    }

    @PostMapping("/salvar")
    public String salvarProcedimentosBotox(@RequestBody ProcedimentoBotoxRequest request) {
        List<ProcedimentoBotox> procedimentos = request.getProcedimentos();
        Integer pacienteId = request.getPacienteId();
        String imagemBase64 = request.getImagemBase64(); // Recebe a imagem Base64

        Integer ultimoIdVinculo = procedimentoBotoxService.obterUltimoIdProcedimento();

        if (ultimoIdVinculo == null) {
            ultimoIdVinculo = 1;
        }

        ultimoIdVinculo = ultimoIdVinculo + 1;

        if (imagemBase64 != null && !imagemBase64.isEmpty()) {
            try {
                String base64Imagem = imagemBase64.split(",")[1];
                byte[] imagemBytes = Base64.getDecoder().decode(base64Imagem);

                ImagemProcedimentoBotox imagem = new ImagemProcedimentoBotox();
                imagem.setIdVinculoProcedimento(ultimoIdVinculo);
                imagem.setImagem(imagemBytes);
                imagemBotoxService.salvar(imagem);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        for (ProcedimentoBotox procedimento : procedimentos) {
            procedimento.setIdVinculoProcedimento(ultimoIdVinculo);
            procedimento.setPacienteId(pacienteId);
            procedimento.setData(LocalDate.now());
            procedimentoBotoxService.salvar(procedimento);
        }

        return "redirect:/procedimentos";
    }

    @PostMapping("/salvarHistoricoBotox")
    public String salvarHistoricoBotox(@RequestParam("areaAplicada") String areaAplicada, @RequestParam("pacienteId") Integer pacienteId) {

        Integer ultimoIdVinculo = procedimentoBotoxService.obterUltimoIdProcedimento();

        if(ultimoIdVinculo == null){
            ultimoIdVinculo = 1;
        }

        ultimoIdVinculo = ultimoIdVinculo + 1;

        HistoricoVinculoBotox historicoVinculoBotox = new HistoricoVinculoBotox();
        historicoVinculoBotox.setPacienteId(pacienteId);
        historicoVinculoBotox.setAreaAplicada(areaAplicada);
        historicoVinculoBotox.setVinculoProcedimentoBotox(ultimoIdVinculo);
        historicoVinculoBotox.setDataProcedimento(LocalDate.now());

        historicoVinculoBotoxService.save(historicoVinculoBotox);

        return "redirect:/procedimentos";
    }

    @GetMapping("/visualizar/{idVinculoProcedimento}")
    public ResponseEntity<byte[]> visualizarImagem(@PathVariable Integer idVinculoProcedimento) {
        try {
            ImagemProcedimentoBotox imagem = imagemBotoxService.buscarPorIdVinculo(idVinculoProcedimento);
            if (imagem == null) {
                return ResponseEntity.notFound().build();
            }

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);  // Ajuste o tipo de imagem conforme necessário
            return new ResponseEntity<>(imagem.getImagem(), headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/listProcedimentosBotoxByVinculoId/{idVinculoProcedimento}")
    @ResponseBody
    public List<ProcedimentoBotox> getProcedimentosByPaciente(@PathVariable("idVinculoProcedimento") Integer idVinculoProcedimento) {
        return procedimentoBotoxService.findByIdVinculoProcedimento(idVinculoProcedimento);
    }

    @PostMapping("/getProcedimentoBotoxById")
    @ResponseBody
    public ProcedimentoBotox getId(@RequestBody ProcedimentoBotox procedimentoBotox) {
        return procedimentoBotoxService.getProcedimento(procedimentoBotox.getId());
    }

}
