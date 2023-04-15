package egovframework.com.devjitsu.workPlan.controller;

import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.workPlan.service.WorkPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class WorkPlanController {
    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private WorkPlanService workPlanService;

    /**
     * 유연근무 신청 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/workPlan/workPlanReq.do")
    public String workPlanReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "workPlan/workPlanReq";
    }

    /**
     * 유연근무 승인 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/workPlan/workPlanApp.do")
    public String workPlanAgree(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "workPlan/workPlanApp";
    }

    /**
     * 유연근무 현황(관리자) 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/workPlan/workPlanAdminView.do")
    public String workPlanAdminView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "workPlan/workPlanAdminView";
    }
}
