package egovframework.com.devjitsu.gw.user.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CommonService commonService;

    /** 직제관리 페이지 */
    @RequestMapping("/user/organizationChart.do")
    public String openOrganizationChart(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "user/organizationChart";
    }

    //조직도 팝업용
    @RequestMapping("/user/pop/orgPop.do")
    public String orgPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "popup/user/orgPop";
    }

    //유저 다수 선택 팝업
    @RequestMapping("/user/pop/userMultiSelectPop.do")
    public String userMultiSelectPop(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));

        return "popup/user/userMultiSelectPop";
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping(value = "/user/getOrgDeptList")
    @ResponseBody
    public List<Map<String, Object>> getOrgDeptList(@RequestParam Map<String, Object> params, Model model) throws Exception {
        return userService.getOrgDeptList(params);
    }

    //TODO. AJAX RETURN 오류로 JSONVIEW는 나중에 추가
    @RequestMapping("/user/getUserInfo")
    @ResponseBody
    public Map<String, Object> getUserInfo(@RequestParam Map<String, Object> params){
        return userService.getUserInfo(params);
    }

    @RequestMapping("/user/getIdCheck")
    public String getIdCheck(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = userService.getIdCheck(params);

        model.addAttribute("rs", map);

        return "jsonView";
    }

    @RequestMapping("/user/getEmpList")
    public String getEmpList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", userService.getEmpList(params));

        return "jsonView";
    }

    @RequestMapping("/user/getEmpSelList")
    public String getEmpSelList(@RequestBody Map<String, Object> params, Model model){

        List<Map<String, Object>> list = userService.getEmpSelList(params);

        model.addAttribute("list", list);

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

    //사용자 기본정보 팝업용
    @RequestMapping("/user/pop/myPop.do")
    public String myPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelOne = userService.getUserPersonnelOne(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("uprinfList", userPersonnelOne);
        model.addAttribute("pk", params.get("pk"));
        model.addAttribute("idPhoto", userService.getUserIdPhotoInfo(params));

        System.out.println("사용자 기본정보 --------" + userPersonnelOne);

        return "popup/user/myPop";
    }


    /**
     * 인사관리 > 조직도 관리 > 직급/등급 관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetGradePop.do")
    public String userSetGradePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetGradePop";
    }

    /**
     * 인사관리 > 조직도 관리 > 직책관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetDutyPop.do")
    public String userSetDutyPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetDutyPop";
    }

    /**
     * 인사관리 > 조직도 관리 > 직책/직급 서열관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetRankPop.do")
    public String userSetRankPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetRankPop";
    }

    /**
     * 인사관리 > 조직도 관리 > 조직도 직제 관리 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/user/pop/userSetOrganizationPop.do")
    public String userSetOrganizationPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/user/userSetOrganizationPop";
    }

}
