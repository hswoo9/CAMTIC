package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.CompanyCardService;
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
public class CompanyCardController {

    @Autowired
    private CompanyCardService companyCardService;

    @RequestMapping("/card/cardList.do")
    public String paymentList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/companyCard/cardList";
    }

    @RequestMapping("/card/cardListMng.do")
    public String cardListMng(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/companyCard/cardListMng";
    }

    @RequestMapping("/card/outUseList.do")
    public String outUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/companyCard/outUseList";
    }

    @RequestMapping("/card/cardUseList")
    public String cardUseList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        List<Map<String, Object>> list = new ArrayList<>();
        list = companyCardService.cardUseList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/card/statementList.do")
    public String statementList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/companyCard/statementList";
    }

    @RequestMapping("/cam_mng/companyCard/useCardDetailPop.do")
    public String useCardDetailPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = companyCardService.useCardDetailInfo(params);
        model.addAttribute("cardInfo", cardInfo);

        return "popup/cam_manager/companyCard/useCardDetailPop";
    }

    @RequestMapping("/cam_mng/companyCard/useCardDetail")
    public String useCardDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        Map<String, Object> cardInfo = companyCardService.useCardDetailInfo(params);
        model.addAttribute("cardInfo", cardInfo);

        return "jsonView";
    }



}
