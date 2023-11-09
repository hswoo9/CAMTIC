package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class setManagementController {

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




}
