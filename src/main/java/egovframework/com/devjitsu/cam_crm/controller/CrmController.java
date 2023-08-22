package egovframework.com.devjitsu.cam_crm.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
public class CrmController {

    @Autowired
    private CrmService crmService;


    @RequestMapping("/crm/pop/popCrmList.do")
    public String popCrmList(Model model){

        return "popup/cam_crm/popCrmList";
    }


    @RequestMapping("/crm/getPopCrmList")
    public String getPopCrmList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = crmService.getPopCrmList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmData")
    public String getCrmData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", crmService.getCrmData(params));

        return "jsonView";
    }
}
