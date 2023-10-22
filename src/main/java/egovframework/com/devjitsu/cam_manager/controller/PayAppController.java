package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_manager.service.ResDocService;
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
public class PayAppController {

    @Autowired
    private PayAppService payAppService;



    @RequestMapping("/pay/paymentList.do")
    public String paymentList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentList";
    }

    @RequestMapping("/payApp/pop/regPayAppPop.do")
    public String regPayAppPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regPayAppPop";
    }

    @RequestMapping("/payApp/pop/getPayAppData")
    public String getPayAppData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayAppReqData(params);
        model.addAttribute("map", map);

        return "jsonView";
    }

    @RequestMapping("/payApp/payAppSetData")
    public String payAppSetData(@RequestParam Map<String, Object> params, Model model){

        try{
            payAppService.payAppSetData(params);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }
}
