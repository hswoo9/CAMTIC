package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.TaxService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class TaxController {

    @Autowired
    private TaxService taxService;


    @RequestMapping("/tax/taxUseList.do")
    public String taxUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/tax/taxList";
    }

    @RequestMapping("/tax/getTaxList")
    public String getTaxList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = taxService.getTaxList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/etax/etaxList.do")
    public String etaxList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/etax/etaxList";
    }

    @RequestMapping("/etax/syncEtaxG20Data")
    public String syncEtaxG20Data(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        try{
            taxService.syncEtaxG20Data(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
