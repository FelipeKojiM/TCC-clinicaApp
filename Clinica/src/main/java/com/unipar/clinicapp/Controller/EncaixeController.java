package com.unipar.clinicapp.Controller;
import com.unipar.clinicapp.Model.*;
import com.unipar.clinicapp.Service.EncaixeService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class EncaixeController {

    private final EncaixeService encaixeService;

    public EncaixeController(EncaixeService encaixeService, EncaixeService encaixeService1) {
        this.encaixeService = encaixeService1;
    }

    @PostMapping("/salvarEncaixe")
    public String salvarEncaixe(@RequestParam("paciente") Paciente paciente,
                                @RequestParam("procedimento") String procedimento,
                                RedirectAttributes redirectAttributes) {

        Encaixe encaixe = new Encaixe();
        encaixe.setPaciente(paciente);
        encaixe.setProcedimento(procedimento);
        encaixeService.save(encaixe);

        redirectAttributes.addFlashAttribute("success", "Encaixe salvo com Sucesso!");
        return "redirect:/agenda";
    }

    @PostMapping("/deletarEncaixe")
    public String deletarEncaixe(@RequestParam("idEncaixe") Integer id) {
        encaixeService.deleteById(id);
        return "redirect:/agenda";
    }

}
