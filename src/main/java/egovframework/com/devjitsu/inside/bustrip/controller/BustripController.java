package egovframework.com.devjitsu.inside.bustrip.controller;

import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Controller
public class BustripController {

    private static final Logger logger = LoggerFactory.getLogger(BustripController.class);

    @Autowired
    private UserService userService;

    //출장신청
    @RequestMapping("/Inside/bustripReq.do")
    public String bustripReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripReq";
    }

    //출장결과보고
    @RequestMapping("/Inside/bustripResult.do")
    public String bustripResult(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/bustripResult";
    }

    //관내출장리스트
    @RequestMapping("/Inside/inBustripList.do")
    public String inBustripList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/inBustripList";
    }

    //관외출장리스트
    @RequestMapping("/Inside/outBustripList.do")
    public String outBustripList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/outBustripList";
    }

    //교통비기준정보
    @RequestMapping("/Inside/transportationCostInfo.do")
    public String transportationCostInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/transportationCostInfo";
    }

    //직급별출장여비
    @RequestMapping("/Inside/dutyBustripExpenses.do")
    public String dutyBustripExpenses(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/dutyBustripExpenses";
    }

    //차량사용신청
    @RequestMapping("/Inside/carReq.do")
    public String carReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carReq";
    }

    //차량사용신청 팝업창
    @RequestMapping("/Inside/Pop/carPop.do")
    public String carPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carPop";
    }

    //회의실사용신청
    @RequestMapping("/Inside/meetingRoomReq.do")
    public String meetingRoomReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/meetingRoomReq";
    }

    //회의실사용신청 팝업창
    @RequestMapping("/Inside/Pop/meetingRoomPop.do")
    public String meetingRoomReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/meetingRoomPop";
    }

    //차량관리
    @RequestMapping("/Inside/carManage.do")
    public String carManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/carManage";
    }

    //차량관리 팝업창
    @RequestMapping("/Inside/Pop/carManagePop.do")
    public String carManagePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/bustrip/carManagePop";
    }

    //회의실관리
    @RequestMapping("/Inside/meetingRoomManage.do")
    public String meetingRoomManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/bustrip/meetingRoomManage";
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
