package egovframework.com.devjitsu.inside.userManage.controller;

import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.system.service.CommonCodeService;
import egovframework.com.devjitsu.user.service.UserService;
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
public class UserManageController {

    private static final Logger logger = LoggerFactory.getLogger(UserManageController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private UserManageService userManageService;

    //인사기록카드 페이지
    @RequestMapping("/Inside/userPersonList.do")
    public String userPersonList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userPersonList";
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/userPersonnelRecord.do")
    public String userPersonnelRecord(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        Map<String,Object> map = new HashMap<>();
        map.put("empSeq", login.getUniqId());
        Map<String,Object> userPersonnelRecordList = userManageService.getUserPersonnelRecordList(map);
        List<Map<String,Object>> educationalList = userManageService.getEducationalList(map);
        Map<String,Object> militarySvcInfo = userManageService.getMilitarySvcInfo(map);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("uprList", userPersonnelRecordList);
        model.addAttribute("eList", educationalList);
        model.addAttribute("mInfo", militarySvcInfo);
        return "inside/userManage/userPersonnelRecord";
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/pop/userReqPop.do")
    public String userReqPop(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/userManage/userReqPop";
    }

    //성과결과조회 페이지
    @RequestMapping("/Inside/performanceResultList.do")
    public String performanceResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/performanceResultList";
    }

    //인사정보변경신청 페이지
    @RequestMapping("/Inside/userInfoMod.do")
    public String userInfoMod(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userInfoMod";
    }

    //근로계약서 페이지
    @RequestMapping("/Inside/employmentReq.do")
    public String employmentReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/employmentReq";
    }

    //연봉계약서 페이지
    @RequestMapping("/Inside/agreementReq.do")
    public String agreementReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/agreementReq";
    }

    @RequestMapping("/Inside/pop/sign/popDrawSignView.do")
    public String popDrawSignView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/userManage/popDrawSignView";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/useManage/userPersonnelRecordPop.do")
    public String userPersonnelRecordEduAddPop(@RequestParam String popName) {
        switch(popName) {
            case "degree":
                return "popup/inside/userManage/userPersonnelRecordDegreePop";
            case "career":
                return "popup/inside/userManage/userPersonnelRecordCareerPop";
            case "military":
                return "popup/inside/userManage/userPersonnelRecordMilitaryPop";
            case "family":
                return "popup/inside/userManage/userPersonnelRecordFamilyPop";
            case "license":
                return "popup/inside/userManage/userPersonnelRecordLicensePop";
            case "job":
                return "popup/inside/userManage/userPersonnelRecordJobPop";
            case "appointing":
                return "popup/inside/userManage/userPersonnelRecordAppointingPop";
            case "reward":
                return "popup/inside/userManage/userPersonnelRecordRewardPop";
            case "edu":
                return "popup/inside/userManage/userPersonnelRecordEduPop";
            case "workEval":
                return "popup/inside/userManage/userPersonnelRecordWorkEvalPop";
            case "proposal":
                return "popup/inside/userManage/userPersonnelRecordProposalPop";
        }
        return "redirect:inside/userManage/userPersonnelRecord";
    }
    @RequestMapping("/useManage/setUserPersonnelRecordInfo")
    public void setUserDegreeInfo(@RequestParam Map<String,Object> map) {
        System.out.println("D A T A : : : : : : : : : : "+map);
        switch(map.get("type").toString()) {
            case "degree":
                System.out.println(map.get("type").toString());
                //userManageService.setUserDegreeInfo(map);
                break;
            case "career":
                System.out.println(map.get("type").toString());
                //userManageService.setUserCareerInfo(map);
                break;
            case "military":
                System.out.println(map.get("type").toString());
                //userManageService.setUserMilitarySvcInfo(map);
                break;
            case "family":
                System.out.println(map.get("type").toString());
                //userManageService.setUserFamilyInfo(map);
                break;
            case "license":
                System.out.println(map.get("type").toString());
                //userManageService.setUserLicenseInfo(map);
                break;
            case "job":
                System.out.println(map.get("type").toString());
                //userManageService.setUserJobInfo(map);
                break;
            case "appointing":
                System.out.println(map.get("type").toString());
                //userManageService.setUserAppointingInfo(map);
                break;
            case "reward":
                System.out.println(map.get("type").toString());
                //.setUserRewardInfo(map);
                break;
            case "edu":
                System.out.println(map.get("type").toString());
                //userManageService.setUserEduInfo(map);
                break;
            case "workEval":
                System.out.println(map.get("type").toString());
                //userManageService.setUserWorkEvalInfo(map);
                break;
            case "proposal":
                System.out.println(map.get("type").toString());
                //userManageService.setUserProposalInfo(map);
                break;
        }
    }
    @RequestMapping("/userManage/getAllUserPersonnelRecordList")
    public String getAllUserPersonnelRecordList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", userManageService.getAllUserPersonnelRecordList(map));
        return "jsonView";
    }
    @RequestMapping("/userManage/getCodeList")
    public String getCodeList(Model model) {
        model.addAttribute("rs", userManageService.getCodeList());
        return "jsonView";
    }
}
