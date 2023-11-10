package egovframework.com.devjitsu.gw.main.controller;

import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.doc.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.service.BoardService;
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
public class MainController {

    @Autowired
    private CommonService commonService;

    @Autowired
    private BoardService boardService;

    @Autowired
    private ApprovalUserService approvalUserService;

    @Autowired
    private CustomBoardService customBoardService;

    @RequestMapping("/")
    public String index(){
        return "indexA";
    }

    @RequestMapping("/indexA.do")
    public String indexA(){
        return "indexA";
    }

    @RequestMapping("/indexB.do")
    public String indexB(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        int strStatus = approvalUserService.getUserDocStorageBoxList(params).size();
        int waitStatus = approvalUserService.getApproveDocBoxList(params).size();
        int scheduleStatus = customBoardService.getScheduleList(params).size();

        model.addAttribute("strStatus", strStatus);
        model.addAttribute("waitStatus", waitStatus);
        model.addAttribute("scheduleStatus", scheduleStatus);
        model.addAttribute("menuList", commonService.getMenuFullJsonString(loginVO));
        model.addAttribute("loginVO", loginVO);

        return "indexB";
    }

    @RequestMapping("/indexBMain.do")
    public String indexBMain(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        int strStatus = approvalUserService.getUserDocStorageBoxList(params).size();
        int waitStatus = approvalUserService.getApproveDocBoxList(params).size();
        int scheduleStatus = customBoardService.getScheduleList(params).size();

        model.addAttribute("strStatus", strStatus);
        model.addAttribute("waitStatus", waitStatus);
        model.addAttribute("scheduleStatus", scheduleStatus);
        model.addAttribute("loginVO", loginVO);
        return "indexB_cp";
    }

    @RequestMapping("/intro.do")
    public String intro(){
        return "intro";
    }

    @RequestMapping("/main/getMainList.do")
    public String getMainList(@RequestParam Map<String ,Object> param,HttpServletRequest request, Model model){

        List<Map<String, Object>> response = boardService.selectMainList(param);
        List<Map<String, Object>> response2 = boardService.selectBsnsMainList(param);

        model.addAttribute("list", response).addAttribute("list2", response2);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/subHolidayApplication.do")
    public String subHolidayApplication(){
        return "/subHoliday/subHolidayApplication";
    }



    @RequestMapping("/subHoliday/org.do")
    public String org(){
        return "/subHoliday/org";
    }

    @RequestMapping("/engineering/customerConsultation.do")
    public String customerConsultation(){
        return "/engineering/customerConsultation";
    }

    @RequestMapping("/engineering/estimate.do")
    public String estimate(){
        return "/engineering/estimate";
    }

    @RequestMapping("/engineering/orderManagement.do")
    public String orderManagement(){
        return "/engineering/orderManagement";
    }

    @RequestMapping("/engineering/developmentPlan.do")
    public String developmentPlan(){
        return "/engineering/developmentPlan";
    }

    @RequestMapping("/engineering/outsourcingPurchase.do")
    public String outsourcingPurchase(){
        return "/engineering/outsourcingPurchase";
    }

    @RequestMapping("/engineering/resultReport.do")
    public String resultReport(){
        return "/engineering/resultReport";
    }

    @RequestMapping("/engineering/deliveryManagement.do")
    public String deliveryManagement(){
        return "/engineering/deliveryManagement";
    }

    @RequestMapping("/main/getSearchMenu")
    public String getSearchMenu(@RequestParam Map<String,Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());
        model.addAttribute("ds", commonService.getSearchMenu(params));
        return "jsonView";
    }
}
