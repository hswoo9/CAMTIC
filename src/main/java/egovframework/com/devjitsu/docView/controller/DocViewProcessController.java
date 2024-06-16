package egovframework.com.devjitsu.docView.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
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
    @Autowired
    private CommonCodeService commonCodeService;

    /** 법인카드 분실신고서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/cardLossApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/cardLossApprovalPop";
    }

    /** 공인인증서 사용 신청서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/accCertApprovalPop.do")
    public String accCertApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/accCertApprovalPop";
    }

    /** 법인 통장 발급 신청서 페이지*/
    @RequestMapping("/customDoc/pop/corpBankPrintPop.do")
    public String corpBankPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);
        return "/popup/docView/approvalFormPopup/corpBankPrintPop";
    }

    /** 인감 반출신청서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/signetToApprovalPop.do")
    public String signetToApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/signetToApprovalPop";
    }

    /** 불용자산 처분신청서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/disAssetApprovalPop.do")
    public String disAssetApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/disAssetApprovalPop";
    }

    /** 사직서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/resignApprovalPop.do")
    public String resignApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/resignApprovalPop";
    }

    /** 경위서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/detailsApprovalPop.do")
    public String detailsApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/detailsApprovalPop";
    }

    /** 경조비 지급신청서 전자결재 페이지*/
    @RequestMapping("/popup/customDoc/approvalFormPopup/condApprovalPop.do")
    public String condApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/docView/approvalFormPopup/condApprovalPop";
    }

    /** 법인카드 분실신고서 결재 상태값에 따른 UPDATE 메서드 */
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

    /** 공인인증서 사용 신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/accCertReqApp")
    public String accCertReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateAccCertDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 인감 반출신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/signetToReqApp")
    public String signetToReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateSignetToDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 불용자산 처분신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/disAssetReqApp")
    public String disAssetReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateDisAssetDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 사직서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/resignReqApp")
    public String resignReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateResignDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 경위서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/detailsReqApp")
    public String detailsReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateDetailsDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 경조비 지급신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/customDoc/condReqApp")
    public String condReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            docViewProcessService.updateCondDocState(bodyMap);
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
