package egovframework.com.devjitsu.docView.controller;

import egovframework.com.devjitsu.docView.service.DocViewProcessService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(DocViewProcessController.class);

    @Autowired
    private DocViewProcessService docViewProcessService;

    /** 법인카드 분실신고서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/cardLossApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/cardLossApprovalPop";
    }

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/cardLossReqApp")
    public String cardLossReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateCardLossDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }
}
