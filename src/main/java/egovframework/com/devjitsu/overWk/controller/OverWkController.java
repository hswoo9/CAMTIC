package egovframework.com.devjitsu.overWk.controller;

import egovframework.com.devjitsu.system.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.overWk.service.OverWkService;
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
public class OverWkController {

    private static final Logger logger = LoggerFactory.getLogger(OverWkController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private OverWkService overWkService;

    /**
     * 시간 외 근무 신청 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/overWk/overWkReq.do")
    public String overWkReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        model.addAttribute("toDate", getCurrentDateTime());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        /*model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));*/

        /*model.addAttribute("monthWeekAgree", subHolidayService.getNowMonthWeekAgreeHour(loginVO));*/
        return "overWk/overWkReq";
    }

    /**
     * 마이페이지 > 복무 > 초과근무 > 초과근무신청 > 신청 팝업창
     * @param request
     * @param model
     * @param params
     * @return
     */
    @RequestMapping("/overWk/overWkPop.do")
    public String workPlanReqPopup(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        System.out.println("===================================================================");
        System.out.println(params);
        System.out.println("===================================================================");
        HttpSession session = request.getSession();
        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        if(params.containsKey("overWorkPlanId")){
            /*model.addAttribute("overWorkPlanInfo", overWkService.getOverWorkPlanInfo(params));*/
        }
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        return "popup/overWk/overWkPop";
    }

    /**
     * 시간 외 근무 승인 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/overWk/overWkApp.do")
    public String overWkAppView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        return "overWk/overWkApp";
    }

    /**
     * 시간 외 근무 현황(관리자) 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/overWk/overWkAdminView.do")
    public String overWkAdminView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "overWk/overWkAdminView";
    }

    /**
     * 시간 외 근무 근무코드 조회
     *
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/overWk/getWorkCodeList")
    @ResponseBody
    public List<Map<String, Object>> getWorkCodeList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("rs", overWkService.getWorkCodeList(params));
        /*return "jsonView";*/

        return overWkService.getWorkCodeList(params);
    }


    /**
     * 시간 외 근무 신청 리스트 조회
     *
     * @param model
     * @return
     */
    @RequestMapping("/overWk/getOverWorkPlanReqList")
    @ResponseBody
    public List<Map<String, Object>> getOverWorkPlanReqList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", overWkService.getOverWorkPlanReqList(params));

        /*return "jsonView";*/

        return overWkService.getOverWorkPlanReqList(params);
    }

    /**
     * 오늘 날짜 구하기
     * @return formatter.format(today)
     */
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }
}
