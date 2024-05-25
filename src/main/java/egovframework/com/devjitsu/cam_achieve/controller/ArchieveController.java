package egovframework.com.devjitsu.cam_achieve.controller;


import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;

@Controller
public class ArchieveController {


    @Autowired
    private AchieveService achieveService;

    @RequestMapping("/cam_achieve/finPerm.do")
    public String finPerm(@RequestParam Map<String, Object> params, Model model) {
        return "cam_achieve/finPerm";
    }

    @RequestMapping("/cam_achieve/weekMeet.do")
    public String weekMeet(@RequestParam Map<String, Object> params, Model model) {
        return "cam_achieve/weekMeet";
    }

    @RequestMapping("/cam_achieve/monMeet.do")
    public String monMeet(@RequestParam Map<String, Object> params, Model model) {
        return "cam_achieve/monMeet";
    }

    @RequestMapping("/cam_achieve/getAllPjtCalc")
    public String getAllPjtCalc(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();

        map = achieveService.getAllPjtCalc(params);

        model.addAttribute("map", map);
        return "jsonView";
    }
}
