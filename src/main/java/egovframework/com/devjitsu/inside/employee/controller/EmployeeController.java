package egovframework.com.devjitsu.inside.employee.controller;

import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.employee.service.EmployService;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
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
public class EmployeeController {

    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private EmployService employService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private SalaryManageService salaryManageService;

    //참여율신청목록
    @RequestMapping("/inside/participationRateList.do")
    public String participationRateList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/participationRateList";
    }

    @RequestMapping("/project/getPartRateVersionList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String,Object>> list = projectService.getPartRateVersionList(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    //직원별참여현황
    @RequestMapping("/Inside/employeeParticipationList.do")
    public String employeeParticipationList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/employeeParticipationList";
    }

    @RequestMapping("/inside/userPartRateList")
    public String userPartRateList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getUserPartRateList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    //사업별참여현황
    @RequestMapping("/inside/businessParticipationList.do")
    public String businessParticipationList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", login);
        return "inside/userManage/businessParticipationList";
    }

    @RequestMapping("/inside/getBusinessParticipationList")
    public String getBusinessParticipationList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getBusinessParticipationList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    //월별급여지급현황
    @RequestMapping("/Inside/monthlyPayList.do")
    public String monthlyPayList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        session.setAttribute("menuNm", request.getRequestURI());
        return "inside/userManage/monthlyPayList";
    }

    //인건비현황
    @RequestMapping("/Inside/laborList.do")
    public String laborList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        session.setAttribute("menuNm", request.getRequestURI());
        return "inside/userManage/laborList";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/inside/pop/busnPartRate.do")
    public String popBusnPartRate(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/userManage/popBusnPartRate";
    }

    @RequestMapping("/inside/getBusinessParticipationData")
    public String getBusinessParticipationData(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = new ArrayList<>();
        list = employService.getBusinessParticipationData(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/inside/getBusnPartRatePayData")
    public String getBusnPartRatePayData(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();
        map = employService.getBusnPartRatePayData(params);
        if(map != null && !map.isEmpty()) {
            model.addAttribute("map", map);
        }

        return "jsonView";
    }
    @RequestMapping("/inside/setBusnPartRatePay")
    public String setBusnPartRatePay(@RequestParam Map<String, Object> params, Model model) {

        try{
            employService.setBusnPartRatePay(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/inside/getCalcPartRate")
    public String getCalcPartRate(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", employService.getCalcPartRate(params));
        model.addAttribute("list2", salaryManageService.getPayRollLedgerStatusList(params));
        return "jsonView";
    }

    @RequestMapping("/inside/getMonthlyCalcPartRate")
    public String getMonthlyCalcPartRate(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("deptList", employService.getDeptList(params));
        model.addAttribute("list", employService.getMonthlyCalcPartRate(params));
        model.addAttribute("list2", employService.getMonthlyPayRollLedgerList(params));
        return "jsonView";
    }
}
