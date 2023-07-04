package egovframework.com.devjitsu.gw.dept.controller;

import egovframework.com.devjitsu.gw.dept.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Controller
public class DeptController {

    @Autowired
    private DeptService deptService;

    @RequestMapping("/dept/getDeptAList")
    public String getDeptAList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", deptService.getDeptAList(params));

        return "jsonView";
    }
}
