package egovframework.com.devjitsu.inside.certificate.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.certificate.service.CertificateService;
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

    //증명서신청 페이지
    @RequestMapping("/Inside/certificateReq.do")
    public String certificateReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/certificateReq";
    }

    //증명서신청 팝업 페이지
    @RequestMapping("/Inside/certificateReqPop.do")
    public String certificateReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        Map<String, Object> data = new HashMap<>();
        if(params.containsKey("userProofSn")){
            data = certificateService.getCertificateOne(params);
            model.addAttribute("data", data);
        }
        model.addAttribute("data", data);

        return "popup/inside/certificate/certificateReqPop";
    }

    //증명서관리 페이지
    @RequestMapping("/Inside/certificateAdmin.do")
    public String certificateAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/certificateAdmin";
    }

    //증명서관리 - 증명서신청 전자결재 페이지
    @RequestMapping("/Inside/pop/certifiApprovalPop.do")
    public String certifiApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/certificate/approvalFormPopup/certifiApprovalPop";
    }

    //증명서신청 - 증명서신청 리스트 조회
    @RequestMapping("/inside/getCertificateList")
    public String getCertificateList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = certificateService.getCertificateList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //증명서신청 - 증명서신청팝업 - 단일데이터 조회
    @RequestMapping("/campus/getCertificateOne")
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


    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
