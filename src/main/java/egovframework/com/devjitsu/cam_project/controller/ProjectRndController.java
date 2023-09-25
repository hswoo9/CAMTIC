package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class ProjectRndController {

    @Autowired
    private ProjectRndService projectRndService;

    @RequestMapping("/projectRnd/pop/regProject.do")
    public String regProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/regProject";
    }

    @RequestMapping("/projectRnd/setSubjectInfo")
    public String setSubjectInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.setSubjectInfo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
