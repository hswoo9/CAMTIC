package egovframework.com.devjitsu.camtic.controller;

import egovframework.com.devjitsu.cam_manager.repository.ManageRepository;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class CallController {

    @Autowired
    private KukgohService kukgohService;

    @Autowired
    private ManageRepository manageRepository;

    @Autowired
    private PayAppService payAppService;


    @RequestMapping("/callback/enaraCall")
    public String enaraCall (){
        try{
            for(Map<String, Object> map : kukgohService.getEnaraTempList()){
                kukgohService.EnaraCall(map);
            }
        }catch(Exception e){
            e.printStackTrace();
        }

        return "SUCCESS";
    }

    @RequestMapping("/callback/exnpScheduler")
    public String exnpScheduler (){
        List<Map<String, Object>> list = manageRepository.getApproveExnpList();

        for(Map<String, Object> map : list){
            Map<String, Object> params = new HashMap<>();
            params.put("regEmpSeq", map.get("REG_EMP_SEQ"));
            params.put("empSeq", map.get("EMP_SEQ"));
            params.put("exnpSn", map.get("EXNP_SN"));
            params.put("exnpG20Stat", 'Y');

            payAppService.resolutionExnpAppr(params);
        }

        return "SUCCESS";
    }
}
