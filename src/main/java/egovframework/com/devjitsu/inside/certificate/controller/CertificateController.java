package egovframework.com.devjitsu.inside.certificate.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CertificateController {

    private static final Logger logger = LoggerFactory.getLogger(CertificateController.class);

    @Autowired
    private CertificateService certificateService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private LoginService loginService;

    @Autowired
    private MenuManagementService menuManagementService;

    //증명서신청 페이지
    @RequestMapping("/Inside/certificateList.do")
    public String certificateReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/certificate/certificateList";
    }

    //증명서관리 페이지
    @RequestMapping("/Inside/certificateAdmin.do")
    public String certificateAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }
        
        return "inside/certificate/certificateAdmin";
    }

    /**
     * 증명서 신청 팝업 페이지(관리자)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/certificateReqAdminPop.do")
    public String certificateReqAdminPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login2 = (LoginVO) session.getAttribute("LoginVO");

        LoginVO login = new LoginVO();
        login.setUniqId((String) params.get("empSeq"));
        login = loginService.actionLogin(login);

        model.addAttribute("loginVO", login);
        model.addAttribute("regEmpInfo", login2);
        model.addAttribute("params", params);


        return "popup/inside/certificate/certificateReqAdminPop";
    }

    /**
     * 증명저 신청 저장 ( 관리자 )
     * @param params
     * @return
     */
    @RequestMapping("/inside/setCertificateAdminInsert")
    public String setCertificateAdminInsert(@RequestParam Map<String, Object> params, Model model) {
        certificateService.setCertificateAdminInsert(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 증명서 신청 팝업 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/certificateReqPop.do")
    public String certificateReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        Map<String, Object> data = new HashMap<>();
        if(params.containsKey("userProofSn")){
            data = certificateService.getCertificateOne(params);
            model.addAttribute("data", data);
        }
        model.addAttribute("params", params);
        model.addAttribute("data", data);

        return "popup/inside/certificate/certificateReqPop";
    }

    //증명서인쇄 팝업 페이지
    @RequestMapping("/Inside/pop/certifiPrintPop.do")
    public String certifiPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        Map<String, Object> data = new HashMap<>();
        if(params.containsKey("userProofSn")){
            data = certificateService.getCertificateOne(params);
            model.addAttribute("data", data);
        }

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);
        params.put("menuCd", "certifi");
        params.put("authorityGroupId", "17");

        CommonUtil commonUtil = new CommonUtil();
        model.addAttribute("manager", commonUtil.listIncludedOrNot(menuManagementService.getAuthorityGroupUserList(params), "EMP_SEQ", login.getUniqId()));
        model.addAttribute("userProofSn", params.get("userProofSn"));
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("params2", params);
        model.addAttribute("data", data);

        return "popup/inside/certificate/certifiPrintPop";
    }

    //증명서관리 - 증명서신청 전자결재 페이지
    @RequestMapping("/Inside/pop/certifiApprovalPop.do")
    public String certifiApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/certificate/certifiApprovalPop";
    }

    //증명서신청 - 증명서신청 리스트 조회
    @RequestMapping("/inside/getCertificateList")
    public String getCertificateList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = certificateService.getCertificateList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //증명서신청 - 증명서신청팝업 - 단일데이터 조회
    @RequestMapping("/inside/getCertificateOne")
    public String getCertificateOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = certificateService.getCertificateOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //증명서신청 저장
    @RequestMapping("/inside/setCertificateInsert")
    public String setCertificateInsert(@RequestParam Map<String, Object> params) {
        certificateService.setCertificateInsert(params);
        return "jsonView";
    }

    //증명서신청 수정
    @RequestMapping("/inside/setCertificateUpdate")
    public String setCertificateUpdate(@RequestParam Map<String, Object> params) {
        certificateService.setCertificateUpdate(params);
        return "jsonView";
    }

    //증명서신청 수정
    @RequestMapping("/inside/setCertificateDelete")
    public String setCertificateDelete(@RequestParam Map<String, Object> params) {
        certificateService.setCertificateDelete(params);
        return "jsonView";
    }

    /**
     * 증명서신청 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/inside/certificateReqApp")
    public String certificateReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            certificateService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/inside/setReqCert")
    public String setReqCert(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(loginVO == null){
            model.addAttribute("code", "404");
            return "jsonView";
        }

        try{
            certificateService.setReqCert(params);
            model.addAttribute("rs", "sc");
            model.addAttribute("code", "200");

        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";

    }


    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
