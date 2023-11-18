package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.SetManagementService;
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
public class setManagementController {

    @Autowired
    private SetManagementService setManagementService;

    @RequestMapping("/setManagement/depMatching.do")
    public String depMatching(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/depMatching";
    }

    @RequestMapping("/setManagement/closingManagement.do")
    public String closingManagement(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/closingManagement";
    }

    @RequestMapping("/setManagement/projectBgtManagement.do")
    public String projectBgtManagement(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);

        return "cam_manager/setManagement/projectBgtManagement";
    }

    @RequestMapping("/setManagement/projectCorp.do")
    public String projectCorp(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);


        return "cam_manager/setManagement/projectCorp";
    }

    @RequestMapping("/setManagement/getCorpProjectList")
    public String getCorpProjectList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", setManagementService.getCorpProjectList(params));

        return "jsonView";
    }

    @RequestMapping("/setManagement/pop/setCorpProject.do")
    public String setCorpProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/setManagement/setCorpProject";
    }

    @RequestMapping("/setManagement/setProject")
    public String setProject(@RequestParam Map<String, Object> params, Model model){
        try{
            setManagementService.setProject(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";

    }

    @RequestMapping("/setManagement/getCorpProjectData")
    public String getCorpProjectData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", setManagementService.getCorpProjectData(params));

        return "jsonView";
    }
}
