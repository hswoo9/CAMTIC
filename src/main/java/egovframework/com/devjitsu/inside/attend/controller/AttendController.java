package egovframework.com.devjitsu.inside.attend.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.attend.service.AttendService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class AttendController {

    private static final Logger logger = LoggerFactory.getLogger(AttendController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private AttendService attendService;

    /** 개인근태현황 페이지 */
    @RequestMapping("/Inside/personAttendList.do")
    public String personAttendList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/personAttendList";
    }
    /** 개인근태 리스트 조회 */
    @RequestMapping("/inside/getPersonAttendList")
    public String getPersonAttendList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = attendService.getPersonAttendList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 근태현황 */
    @RequestMapping("/inside/getPersonStatus")
    public String getPersonStatus(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> hrData = attendService.getPersonHrStatus(params);
        Map<String, Object> holidayData = attendService.getPersonHolidayStatus(params);
        model.addAttribute("hrData", hrData);
        model.addAttribute("holidayData", holidayData);
        return "jsonView";
    }

    /** 직원근태 리스트 조회 */
    @RequestMapping("/inside/getPersonAttendStat")
    public String getPersonAttendStat(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = attendService.getPersonAttendStat(params);
        model.addAttribute("list", list);
        return "jsonView";
    }



    //개인연차현황
    @RequestMapping("/Inside/personAnnvMain.do")
    public String personAnnvMain(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        Map<String, Object> params = new HashMap<>();
        params.put("empSeq", login.getUniqId());

        List<Map<String,Object>> personAnnvInfoList = attendService.getPersonAnnvInfoList(params);
        model.addAttribute("annvList", personAnnvInfoList);


        return "inside/attend/personAnnvMain";
    }

    /** 개인연차현황 리스트 조회 */
    @RequestMapping("/inside/personAnnvMainList")
    public String personAnnvMainList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = attendService.personAnnvMainList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //근태신청현황
    @RequestMapping("/Inside/personReqManage.do")
    public String personReqManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/personReqManage";
    }

    //근태집계
    @RequestMapping("/Inside/attendStat.do")
    public String attendStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/attendStat";
    }

    //직원근태내역
    @RequestMapping("/Inside/personAttendStat.do")
    public String personAttendStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/personAttendStat";
    }

    //근태 조정 팝업창
    @RequestMapping("/Inside/Pop/personAttendStatPop.do")
    public String personAttendStatPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/attend/personAttendStatPop";
    }

    /** 월별 근태보고 */
    @RequestMapping("/Inside/monthAttendStat.do")
    public String monthAttendStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/monthAttendStat";
    }

    @RequestMapping("/inside/getAttendAllCountMonthly")
    public String getAttendAllCount(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = attendService.getAttendAllCountMonthly(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/inside/getAttendDeptCountMonthly")
    public String getAttendDeptCountMonthly(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = attendService.getAttendDeptCountMonthly(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/inside/getAttendPersonalCountMonthly")
    public String getAttendPersonalCountMonthly(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = attendService.getAttendPersonalCountMonthly(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //선택근로
    @RequestMapping("/Inside/workChoiceReq.do")
    public String workChoiceReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/workChoiceReq";
    }

    //연장근로
    @RequestMapping("/Inside/overWorkReq.do")
    public String overWorkReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/overWorkReq";
    }

    //휴일근로
    @RequestMapping("/Inside/holidayWorkReq.do")
    public String holidayWorkReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/holidayWorkReq";
    }

    //휴일근로신청
    @RequestMapping("/Inside/holidayWorkApplication.do")
    public String holidayWorkApplication(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/holidayWorkApplication";
    }

    //휴일근로신청내역(관리자)
    @RequestMapping("/Inside/holidayWorkApplicationDetails.do")
    public String holidayWorkApplicationDetails(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/holidayWorkApplicationDetails";
    }

    // 휴일 근로 리스트 조회
    @RequestMapping(value = "/Inside/holidayWorkApplication.do", method = RequestMethod.POST)
    public String getSubHolidayApplyList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = attendService.getSubHolidayApplyList(params);
        model.addAttribute("list", list);
        System.out.println("================================");
        System.out.println(model.addAttribute("list", list));
        System.out.println("================================");
        return "jsonView";
    }

    // 휴일 근로 내역(관리자) 리스트 조회
    @RequestMapping(value = "/Inside/holidayWorkApplicationDetails.do", method = RequestMethod.POST)
    public String getHolidayDetailsAdmin(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = attendService.getHolidayDetailsAdmin(params);
        model.addAttribute("list", list);
        System.out.println("================================");
        System.out.println(model.addAttribute("list", list));
        System.out.println("================================");
        return "jsonView";
    }

    //휴일 근로 리스트 신청구분 코드
    @RequestMapping("/attend/getVacCodeList2")
    public String getVacCodeList2(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", attendService.getVacCodeList2(params));
        return "jsonView";
    }

    // 휴일 근로 삭제
    @RequestMapping("/Inside/setHistoryWorkApplyDel.do")
    public String setHistoryWorkApplyDel(@RequestParam Map<String, Object> params){
        attendService.setHistoryWorkApplyDel(params);
        return "jsonView";
    }

    // 휴일 근로 관리자 삭제
    @RequestMapping("/Inside/setHistoryWorkApplyAdminDel.do")
    public String setHistoryWorkApplyAdminDel(@RequestParam Map<String, Object> params){
        attendService.setHistoryWorkApplyAdminDel(params);
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


    //휴일근로신청 신청자
    @RequestMapping("/Inside/holidayWorkApplicationUser.do")
    public String holidayWorkApplicationUser(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/holidayWorkApplicationUser";
    }

    //휴일근로신청 관리자
    @RequestMapping("/Inside/holidayWorkApplicationAdmin.do")
    public String holidayWorkApplicationAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/attend/holidayWorkApplicationAdmin";
    }

    //휴일근로신청
    @RequestMapping(value = "/Inside/holidayWorkApplicationList.do", method = RequestMethod.POST)
    public String holidayWorkApplicationList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = attendService.holidayWorkApplicationList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
}
