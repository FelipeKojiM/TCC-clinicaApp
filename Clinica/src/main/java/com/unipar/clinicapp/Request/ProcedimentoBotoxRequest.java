package com.unipar.clinicapp.Request;

import com.unipar.clinicapp.Model.ProcedimentoBotox;
import lombok.Data;
import java.util.List;

@Data
public class ProcedimentoBotoxRequest {
    private Integer pacienteId;
    private List<ProcedimentoBotox> procedimentos;
}