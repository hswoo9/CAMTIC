package egovframework.com.devjitsu.inside.salary.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.salary.service.SalaryManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
public class SalaryManageController {

    private static final Logger logger = LoggerFactory.getLogger(SalaryManageController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private SalaryManageService salaryManageService;

    /**
     * 캠인사이드 > 참여율관리 > 직원급여관리
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/salaryManage/empSalaryManage.do")
    public String employeeSalaryManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/salaryManage/empSalaryManage";
    }

    /**
     * 직원급여관리 데이터 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/salaryManage/getEmpSalaryManageList.do")
    public String getEmpSalaryManageList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", salaryManageService.getEmpSalaryManageList(params));
        return "jsonView";
    }

    @RequestMapping("/salaryManage/getEmpSalaryDataList")
    public String getEmpSalaryManageListAll(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", salaryManageService.getEmpSalaryDataList(params));
        return "jsonView";
    }

    @RequestMapping("/salaryManage/setSalaryManage")
    public String setSalaryManage(@RequestParam Map<String, Object> params, Model model){
        try{
            salaryManageService.setSalaryManage(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 캠인사이드 > 참여율관리 > 사대보험요율관리 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/salaryManage/socialRateManage.do")
    public String socialRateManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        return "inside/salaryManage/socialRateManage";
    }

    /**
     * 사대보험요율관리 데이터 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/salaryManage/getSocialRateManageList.do")
    public String getSocialRateManageList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", salaryManageService.getSocialRateManageList(params));
        return "jsonView";
    }

    /**
     * 사대보험요율관리 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/salaryManage/setSocialRate.do")
    public String setSocialRate(@RequestParam Map<String, Object> params, Model model){
        salaryManageService.setSocialRate(params);
        return "jsonView";
    }

    /**
     * 사대보험요율관리 데이터 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/salaryManage/setSocialRateDel.do")
    public String setSocialRateDel(@RequestParam Map<String, Object> params, Model model){
        salaryManageService.setSocialRateDel(params);
        return "jsonView";
    }



    //급여명세서 페이지
    @RequestMapping("/Inside/payslipList.do")
    public String performanceResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/payslipList";
    }

    @RequestMapping("/salaryManage/delSalaryManage")
    public String delSalaryManage(@RequestParam Map<String, Object> params, Model model){
        try{
            salaryManageService.delSalaryManage(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * 급여관리 엑셀 업로드 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/esmExcelUploadPop.do")
    public String esmloyExcelUploadPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/inside/salaryManage/esmExcelUploadPop";
    }

    /**
     * 급여관리 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/esm/esmRegTemplateDown.do")
    public void crmRegTemplateDown(HttpServletRequest request, HttpServletResponse response) throws Exception {
        salaryManageService.esmRegTemplateDown(request, response);
    }

    /**
     * 급여관리 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/esm/esmExcelUpload.do")
    public String esmExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        salaryManageService.esmExcelUpload(params, request);
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

    private static void menuSession(HttpServletRequest request, HttpSession session) {
        session.setAttribute("menuNm", request.getRequestURI());
    }

    @RequestMapping("/test/testSal")
    public String testSal(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = salaryManageService.getSalaryList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 급여대장관리
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/salaryManage/payRollLedgerMa.do")
    public String payrollManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        session.setAttribute("menuNm", request.getRequestURI());
        return "inside/salaryManage/payRollLedgerMa";
    }



    /**
     * 급여대장관리 데이터 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/salaryManage/getPayRollLedgerList.do")
    public String getPayRollLedgerList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", salaryManageService.getPayRollLedgerList(params));
        return "jsonView";
    }

    /**
     * 급여대장 엑셀 업로드
     * @param params
     * @return
     */
    @RequestMapping("/inside/salaryManage/setExcelUpload.do")
    public String setExcelUpload(@RequestParam Map<String,Object> params, MultipartHttpServletRequest request, Model model) throws Exception {
        model.addAttribute("rs", salaryManageService.setExcelUpload(params, request));
        return "jsonView";
    }
}
