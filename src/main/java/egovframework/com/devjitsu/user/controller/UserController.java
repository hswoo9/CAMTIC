package egovframework.com.devjitsu.user.controller;

import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.user.service.UserService;
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
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("/user/organizationChart.do")
    public String openOrganizationChart(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("toDate", getCurrentDateTime());
        return "user/organizationChart";
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

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
