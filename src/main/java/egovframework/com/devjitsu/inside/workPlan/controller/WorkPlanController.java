package egovframework.com.devjitsu.inside.workPlan.controller;

import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.workPlan.service.WorkPlanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
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
    @ResponseBody
    public Map<String, Object> getWorkPlanReqSubList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        List<Map<String, Object>> list = workPlanService.getWorkPlanReqChangeList(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data", list);
        return resultMap;
    }

    @RequestMapping("/workPlan/setWorkPlanChangeOrDetail.do")
    @ResponseBody
    public Map<String, Object> setWorkPlanChangeSubOrDetail(@RequestParam Map<String, Object> params, Model model) throws Exception {
        Map<String, Object> result = workPlanService.setWorkPlanChangeOrDetail(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", result);
        return resultMap;
    }

    @RequestMapping("/workPlan/getWkCommonCodeWpT.do")
    @ResponseBody
    public Map<String, Object> getWkCommonCodeWpT(Model model, @RequestParam Map<String, Object> params){
        List<Map<String, Object>> list = workPlanService.getWkCommonCodeWpT(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("codeList", list);
        return resultMap;
    }

    @RequestMapping("/workPlan/updateApprStat")
    @ResponseBody
    public Map<String, Object> updateApprStat(Model model, @RequestParam Map<String, Object> params){
        Map<String, Object> data = workPlanService.updateApprStat(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("data", data);
        return resultMap;
    }

    @RequestMapping("/workPlan/getWorkPlanDefaultList.do")
    @ResponseBody
    public Map<String, Object> getWorkPlanDefaultList(Model model, @RequestParam Map<String, Object> params){
        List<Map<String, Object>> list = workPlanService.getWorkPlanDefaultList(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", list);
        return resultMap;
    }

    //유연근무 현황 유저 데이터
    @RequestMapping("/workPlan/getWorkPlanUserList.do")
    @ResponseBody
    public Map<String, Object> getWorkPlanUserList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        List<Map<String, Object>> list = workPlanService.getWorkPlanUserList(params);
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("list", list);
        return resultMap;
    }

    //유연근무신청 사용자
    @RequestMapping("/workPlan/workPlanUser.do")
    public String workPlanUser(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "inside/workPlan/workPlanUser";
    }

    //유연근무신청 관리자
    @RequestMapping("/workPlan/workPlanAdmin.do")
    public String workPlanAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "inside/workPlan/workPlanAdmin";
    }

    //유연근무신청 팝업
    @RequestMapping("/workPlan/workPlanApprovalPop.do")
    public String subHolidayReqPop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "popup/workPlan/workPlanApprovalPop";
    }

    //근무타임코드
    @RequestMapping(value = "/workPlan/getWorkTimeCode")
    public String getWorkTimeCode(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model){
        model.addAttribute("list", workPlanService.getWorkTimeCode(params));
        return "jsonView";
    }

    //유연근무리스트
    @RequestMapping(value = "/workPlan/getWorkPlanList")
    public String getWorkPlanList(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model){
        model.addAttribute("list", workPlanService.getWorkPlanList(params));
        return "jsonView";
    }

    @RequestMapping(value = "/workPlan/setWorkPlan")
    public String setWorkPlan(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model){
        model.addAttribute("ds", workPlanService.setWorkPlan(params));
        return "jsonView";
    }

    @RequestMapping(value = "/workPlan/workPlanUserApp")
    public String workPlanUserApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try {
            workPlanService.workPlanUserApp(bodyMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생(" + e.getMessage() + ")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping(value = "/workPlan/workPlanAdminApp")
    public String workPlanAdminApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try {
            workPlanService.workPlanAdminApp(bodyMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생(" + e.getMessage() + ")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }
}
