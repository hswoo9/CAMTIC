package egovframework.com.devjitsu.campus.controller;

import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CampusController {

    private static final Logger logger = LoggerFactory.getLogger(CampusController.class);

    @Autowired
    private CampusService campusService;

    //개인학습신청
    @RequestMapping("/Campus/eduReq.do")
    public String eduReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduReq";
    }

    //개인학습관리
    @RequestMapping("/Campus/eduInfo.do")
    public String eduInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduInfo";
    }

    //학습조관리
    @RequestMapping("/Campus/studyInfo.do")
    public String studyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/studyInfo";
    }

    //전파학습관리
    @RequestMapping("/Campus/propagInfo.do")
    public String propagInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/propagInfo";
    }

    //OJT관리
    @RequestMapping("/Campus/ojtInfo.do")
    public String ojtInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/ojtInfo";
    }

    //오픈스터디관리
    @RequestMapping("/Campus/openStudyInfo.do")
    public String openStudyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/openStudyInfo";
    }

    //공통학습관리(캠화지등)
    @RequestMapping("/Campus/eduManagement.do")
    public String eduManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduManagement";
    }

    //학습통계
    @RequestMapping("/Campus/eduStat.do")
    public String eduStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduStat";
    }

    //목표기술서작성
    @RequestMapping("/Campus/targetInfo.do")
    public String targetInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/targetInfo";
    }

    //목표기술서작성 - 연도등록팝업
    @RequestMapping("/Campus/pop/targetAddYearPop.do")
    public String targetAddYearPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/targetAddYearPop";
    }

    //목표기술서작성 - 목표등록팝업
    @RequestMapping("/Campus/pop/targetInfoPop.do")
    public String targetInfoPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/targetInfoPop";
    }

    //목표기술서작성 - 주업무현황 및 목표설정팝업
    @RequestMapping("/Campus/pop/targetMainSetPop.do")
    public String targetMainClassSet(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/targetMainSetPop";
    }

    //학습체계도관리
    @RequestMapping("/Campus/systemManagement.do")
    public String systemManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/systemManagement";
    }

    //학습체계도설정
    @RequestMapping("/Campus/pop/systemAdminPop.do")
    public String systemAdminPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/systemAdminPop";
    }

    //직무기술서관리
    @RequestMapping("/Campus/dutyInfo.do")
    public String dutyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/dutyInfo";
    }





    //캠퍼스 코드 리스트
    @RequestMapping("/campus/getCodeList")
    @ResponseBody
    public Map<String, Object> getCodeList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getCodeList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //목표기술서작성 - 해당연도 중복 조회
    @RequestMapping("/campus/getTargetOne")
    @ResponseBody
    public Map<String, Object> getTargetOne(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetOne(params);
        Map<String, Object> result = new HashMap<>();
        result.put("flag", false);
        if(list.size() == 0) {
            result.put("flag", true);
        }else {
            result.put("list", list);
        }
        return result;
    }

    //목표기술서작성 - 직무조회
    @RequestMapping("/campus/getTargetList")
    @ResponseBody
    public Map<String, Object> getTargetList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("flag", false);
        if(list.size() > 0) {
            result.put("flag", true);
            result.put("list", list);
        }
        return result;
    }

    //목표기술서작성 - 유저별 선택 구분 리스트
    @RequestMapping("/campus/getTargetCategoryList")
    @ResponseBody
    public Map<String, Object> getTargetCategoryList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetCategoryList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //목표기술서작성 - 유저별 선택 레벨 리스트
    @RequestMapping("/campus/getTargetCategoryDetailList")
    @ResponseBody
    public Map<String, Object> getTargetCategoryDetailList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetCategoryDetailList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //학습체계도설정 - 구분리스트
    @RequestMapping("/campus/getEduCategoryList")
    @ResponseBody
    public Map<String, Object> getEduCategoryList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getEduCategoryList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //학습체계도설정 - 레벨리스트
    @RequestMapping("/campus/getEduCategoryDetailList")
    @ResponseBody
    public Map<String, Object> getEduCategoryDetailList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getEduCategoryDetailList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //목표기술서작성 - 연도등록팝업 - 연도등록
    @RequestMapping("/campus/setTargetInsert")
    @ResponseBody
    public Object setTargetInsert(@RequestParam Map<String, Object> params) {
        return campusService.setTargetInsert(params);
    }

    //목표기술서작성 - 목표등록팝업 - 직무등록
    @RequestMapping("/campus/setTargetDetailInsert")
    @ResponseBody
    public Object setTargetDetailInsert(@RequestParam Map<String, Object> params) {
        return campusService.setTargetDetailInsert(params);
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
