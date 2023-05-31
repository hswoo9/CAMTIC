package egovframework.com.devjitsu.workPlan.controller;

import egovframework.com.devjitsu.system.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.workPlan.service.WorkPlanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class WorkPlanController {

    private static final Logger logger = LoggerFactory.getLogger(WorkPlanController.class);
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

        return "workplan/workPlanReq";
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

        return "workplan/workPlanApp";
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

        return "workplan/workPlanAdminView";
    }

    /**
     * 유연근무 > 신청팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/workPlan/workPlanReqPop.do")
    public String workPlanReqPopup(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        System.out.println("===================================================================");
        System.out.println(params);
        System.out.println("===================================================================");
        HttpSession session = request.getSession();
        model.addAttribute("loginVO", (LoginVO) session.getAttribute("LoginVO"));
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        return "popup/workPlan/workPlanReqPop";
    }

    //유연근무 신청 저장 데이터 (마이페이지)
    @RequestMapping("/workPlan/getWorkPlanReqSubList.do")
    public String getWorkPlanReqSubList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        List<Map<String, Object>> list = workPlanService.getWorkPlanReqChangeList(params);
        model.addAttribute("data", list);

        return "jsonView";
    }

}
