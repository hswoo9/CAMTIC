package egovframework.com.devjitsu.approval.controller;

import egovframework.com.devjitsu.approval.service.ApprovalUserService;
import egovframework.com.devjitsu.common.service.CommonService;
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
public class ApprovalUserController {

    private static final Logger logger = LoggerFactory.getLogger(ApprovalUserController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private ApprovalUserService approvalUserService;

    @RequestMapping("/approvalUser/approvalLineManagement.do")
    public String openOrganizationChart(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        model.addAttribute("toDate", getCurrentDateTime());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("data", commonService.ctDept((String) login.getOrgnztId()));

        return "approval/user/approvalLineManagement";
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping("/approvalUser/getUserList")
    @ResponseBody
    public List<Map<String, Object>> getUserList(Model model, @RequestParam Map<String, Object> params){
        return commonService.getUserList(params);
    }

    @RequestMapping("/approvalUser/getUserFavApproveRouteList")
    @ResponseBody
    public List<Map<String, Object>> getUserFavApproveRouteList(@RequestParam Map<String, Object> params){
        return approvalUserService.getUserFavApproveRouteList(params);
    }

    @RequestMapping("/approvalUser/setUserFavApproveRoute")
    @ResponseBody
    public Map<String, Object> setUserFavApproveRoute(@RequestParam Map<String, Object> params){
        return approvalUserService.setUserFavApproveRoute(params);
    }

    @RequestMapping("/approvalUser/setUserFavApproveRouteActiveN")
    @ResponseBody
    public Map<String, Object> setUserFavApproveRouteActiveN(@RequestParam(value = "favArr[]") List<String> favArr, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginUser = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> params = new HashMap<>();
        params.put("empSeq", loginUser.getUniqId());
        params.put("favArr", favArr);

        return approvalUserService.setUserFavApproveRouteActiveN(params);
    }

    @RequestMapping("/approvalUser/getUserFavApproveRouteDetail")
    @ResponseBody
    public List<Map<String, Object>> getUserFavApproveRouteDetail(@RequestParam Map<String, Object> params, Model model){
        return approvalUserService.getUserFavApproveRouteDetail(params);
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
