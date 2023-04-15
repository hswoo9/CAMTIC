package egovframework.com.devjitsu.subholiday.controller;

import egovframework.com.devjitsu.approval.controller.ApprovalController;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.subholiday.service.SubHolidayService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class SubHolidayController {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private SubHolidayService subHolidayService;

    /**
     * 시간 외 근무 신청 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/overWkReq.do")
    public String overWkReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "subHoliday/overWkReq";
    }

    /**
     * 시간 외 근무 승인 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/overWkApp.do")
    public String overWkAppView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "subHoliday/overWkApp";
    }

    /**
     * 시간 외 근무 현황(관리자) 화면
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/overWkAdminView.do")
    public String overWkAdminView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "subHoliday/overWkAdminView";
    }
}
