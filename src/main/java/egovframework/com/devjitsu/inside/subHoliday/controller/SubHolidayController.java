package egovframework.com.devjitsu.inside.subHoliday.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.inside.subHoliday.service.SubHolidayService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
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
import java.util.Date;
import java.util.Locale;
import java.util.Map;

@Controller
public class SubHolidayController {

    private static final Logger logger = LoggerFactory.getLogger(SubHolidayController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private SubHolidayService subHolidayService;

    //휴가관리 페이지
    @RequestMapping("/subHoliday/subHolidayList.do")
    public String subHolidayList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayList";

    }

    //전체휴가현황 페이지
    @RequestMapping("/subHoliday/subHolidayAdmin.do")
    public String subHolidayAdmin(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayAdmin";
    }

    //휴가사용현황 페이지
    @RequestMapping("/subHoliday/subHolidayStat.do")
    public String subHolidayStatus(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayStat";
    }

    //휴가설정 페이지
    @RequestMapping("/subHoliday/subHolidaySetting.do")
    public String subHolidaySetting(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidaySetting";
    }

    //휴가신청
    @RequestMapping("/subHoliday/subHolidayReqPop.do")
    public String subHolidayReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/subHolidayReqPop";
    }

    //휴가신청 전자결재
    @RequestMapping("/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do")
    public String subHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop";
    }

    //휴일근로신청서 전자결재
    @RequestMapping("/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop.do")
    public String workHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop";
    }

    //전체휴가현황
    @RequestMapping("/subHoliday/searchHolidayPop.do")
    public String searchHolidayPop(){
        return "/popup/subHoliday/searchHolidayPop";
    }

    //연차일괄신청
    @RequestMapping("/subHoliday/subHolidayReqBatchPop.do")
    public String subHolidayReqBatchPop(){
        return "/popup/subHoliday/subHolidayReqBatchPop";
    }














    /**
     * 캠인사이드 > 휴가관리
     * 휴가 신청구분 코드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getVacCodeList")
    public String getVacCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", subHolidayService.getVacCodeList(params));
        return "jsonView";
    }

    /**
     * 캠인사이드 > 휴가관리 > 휴가신청 > 휴가사용내역
     * 휴가사용내역 조회 MainGrid Load
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getVacUseHistoryList")
    public String getVacUseHistoryList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", subHolidayService.getVacUseHistoryList(params));
        return "jsonView";
    }


























    //휴가신청 기안전 신청내역 저장
    @RequestMapping("/subHoliday/setVacUseHist.do")
    public String setVacUseHist(@RequestParam Map<String, Object> params, Model model){
        subHolidayService.setVacUseHist(params);

        model.addAttribute("vacUseHistId", params.get("vacUseHistId"));

        return "jsonView";
    }



    /**
     * 마이페이지 > 복무 > 근무상황 > 연차 > admin
     * 휴가사용내역 조회 MainGrid Load
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacUseHistoryListAdmin")
    public String getVacUseHistoryListAdmin(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", subHolidayService.getVacUseHistoryListAdmin(params));
        /* model.addAttribute("totalCount", subHolidayService.getVacUseHistoryListTotal(params));*/
        return "jsonView";
    }

    /**
     * 마이페이지 > 복무 > 근무상황 > 연차
     * 휴가사용내역 조회 only one
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacUseHistoryOne")
    public String getVacUseHistoryOne(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", subHolidayService.getVacUseHistoryOne(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getVacUseHistoryWorkList")
    public String getVacUseHistoryWorkList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", subHolidayService.getVacUseHistoryWorkList(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getUserVacList.do")
    public String getUserVacList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("result", subHolidayService.getUserVacList(params));

        return "jsonView";
    }

    @RequestMapping("/subHoliday/getUserVacListStat.do")
    public String getUserVacListStat(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("result", subHolidayService.getUserVacListStat(params));

        return "jsonView";
    }

    @RequestMapping("/subHoliday/setUserVac")
    public String setUserVac(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        subHolidayService.setUserVac(params);
        return "jsonView";
    }

    /**
     * 휴가 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/subHoliday/subHolidayReqApp")
    public String subHolidayReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            subHolidayService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/subHolidayListPop.do")
    public String subHolidayListLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/subHoliday/subHolidayListPop";
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
