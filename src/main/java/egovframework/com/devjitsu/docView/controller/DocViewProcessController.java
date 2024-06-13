package egovframework.com.devjitsu.docView.controller;

import egovframework.com.devjitsu.docView.service.DocViewService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class DocViewProcessController {


    @Autowired
    private DocViewService docViewService;

    /** 법인카드 분실신고서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/cardLossApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/cardLossApprovalPop";
    }
}
