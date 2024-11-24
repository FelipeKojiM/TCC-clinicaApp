package com.unipar.clinicapp.Controller;

import com.unipar.clinicapp.Model.Encaixe;
import com.unipar.clinicapp.Model.Paciente;
import com.unipar.clinicapp.Model.Usuario;
import com.unipar.clinicapp.Repository.ProcedimentoBotoxRepository;
import com.unipar.clinicapp.Repository.ProcedimentoPeelingRepository;
import com.unipar.clinicapp.Service.*;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PaginacaoWebController {

    private final AgendamentoService agendamentoService;
    private final PacienteService pacienteService;
    private final EncaixeService encaixeService;
    private final UsuarioService usuarioService;
    private final ProcedimentoBotoxService procedimentoBotoxService;
    private final ProcedimentoCapilarService procedimentoCapilarService;
    private final ProcedimentoPeelingRepository procedimentoPeelingRepository;
    private final ProcedimentoPreenchimentoService procedimentoPreenchimentoService;
    private final ProcedimentoPeelingService procedimentoPeelingService;
    private final ProcedimentoBotoxRepository procedimentoBotoxRepository;

    public PaginacaoWebController(AgendamentoService agendamentoService,
                                  PacienteService pacienteService,
                                  EncaixeService encaixeService,
                                  UsuarioService usuarioService, ProcedimentoBotoxService procedimentoBotoxService, ProcedimentoCapilarService procedimentoCapilarService, ProcedimentoPeelingRepository procedimentoPeelingRepository, ProcedimentoPreenchimentoService procedimentoPreenchimentoService, ProcedimentoPeelingService procedimentoPeelingService, ProcedimentoBotoxRepository procedimentoBotoxRepository) {
        this.agendamentoService = agendamentoService;
        this.pacienteService = pacienteService;
        this.encaixeService = encaixeService;
        this.usuarioService = usuarioService;
        this.procedimentoBotoxService = procedimentoBotoxService;
        this.procedimentoCapilarService = procedimentoCapilarService;
        this.procedimentoPeelingRepository = procedimentoPeelingRepository;
        this.procedimentoPreenchimentoService = procedimentoPreenchimentoService;
        this.procedimentoPeelingService = procedimentoPeelingService;
        this.procedimentoBotoxRepository = procedimentoBotoxRepository;
    }

    @GetMapping("/bemvindo")
    public String bemVindo() {
        return "bemVindo";
    }

    @GetMapping("/saibaMais")
    public String saibaMais() {
        return "saibaMais";
    }

    @GetMapping("/contratos")
    public String contratos(Model model, HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Paciente> pacientes = pacienteService.getAll();
            model.addAttribute("pacientes", pacientes);

            return "contratos";
        }
    }

    @GetMapping("/agenda")
    public String abrirAgenda(Model model, HttpSession session) {

        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Paciente> pacientes = pacienteService.getAll();
            model.addAttribute("pacientes", pacientes);

            List<Encaixe> encaixes = encaixeService.findAll();
            model.addAttribute("encaixes", encaixes);

            return "agenda";
        }
    }

    @GetMapping("/procedimentos")
    public String retornaPacientes(Model model, HttpSession session) {

        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Paciente> pacientes = pacienteService.getAll();
            model.addAttribute("pacientes", pacientes);
            return "procedimentos";
        }
    }

    @GetMapping("/abrirPacientes")
    public String paciente(HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            return "pacientes";
        }
    }

    @GetMapping("/paginaInicial")
    public String paginaInicial(HttpSession session, Model model) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            return "paginaInicial";
        }
    }

    @GetMapping("/filtrarAgendamentos")
    @ResponseBody
    public Map<String, Map<String, Long>> filtrarAgendamentos(
            @RequestParam("startDate") String startDateStr,
            @RequestParam("endDate") String endDateStr) {

        // Converte para LocalDate
        LocalDate startDate = LocalDate.parse(startDateStr);
        LocalDate endDate = LocalDate.parse(endDateStr);

        ZonedDateTime startDateTime = startDate.atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime endDateTime = endDate.atTime(LocalTime.MAX).atZone(ZoneId.systemDefault());

        Map<String, Long> agendamentos                    = agendamentoService.getAgendamentosPorPeriodo(startDateTime, endDateTime);
        Map<String, Long> botox                           = procedimentoBotoxService.getBotoxPorPeriodo(startDate, endDate);
        Map<String, Long> capilar                         = procedimentoCapilarService.getCapilarPorPeriodo(startDate, endDate);
        Map<String, Long> peeling                         = procedimentoPeelingService.getPeelingPorPeriodo(startDate, endDate);
        Map<String, Long> preenchimento                   = procedimentoPreenchimentoService.getPreenchimentoPorPeriodo(startDate, endDate);
        Map<String, Long> contagemPacientesBotox          = procedimentoBotoxService.obterContagemDePacientesBotox();
        Map<String, Long> contagemPacientesCapilar        = procedimentoCapilarService.obterContagemDePacientesCapilar();
        Map<String, Long> contagemPacientesPeeling        = procedimentoPeelingService.obterContagemDePacientesPeeling();
        Map<String, Long> contagemPacientesPreenchimento  = procedimentoPreenchimentoService.obterContagemDePacientesPreenchimento();


        Map<String, Map<String, Long>> response = new HashMap<>();
        response.put("agendamentos", agendamentos);
        response.put("botox", botox);
        response.put("capilar", capilar);
        response.put("peeling", peeling);
        response.put("preenchimento", preenchimento);
        response.put("contagemPacientesBotox", contagemPacientesBotox);
        response.put("contagemPacientesCapilar", contagemPacientesCapilar);
        response.put("contagemPacientesPeeling", contagemPacientesPeeling);
        response.put("contagemPacientesPreenchimento", contagemPacientesPreenchimento);

        return response;
    }

    @GetMapping(path = "/usuarios")
    public String getAllUsuarios(Model model, HttpSession session) {
        if (session.getAttribute("UsuarioLogado") == null) {
            return "redirect:/bemvindo";
        } else {
            List<Usuario> usuarios = usuarioService.getAll();
            model.addAttribute("usuarios", usuarios);
            return "usuarios";
        }
    }
}