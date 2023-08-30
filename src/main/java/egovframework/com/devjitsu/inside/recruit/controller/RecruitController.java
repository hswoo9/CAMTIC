package egovframework.com.devjitsu.inside.recruit.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

@Controller
public class RecruitController {

    private static final Logger logger = LoggerFactory.getLogger(RecruitController.class);

    @Autowired
    private RecruitService recruitService;
    @Autowired
    private UserService userService;

    //채용관리 페이지
    @RequestMapping("/Inside/recruitList.do")
    public String certificateReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/recruitList";
    }

    /**
     * 채용공고 상세보기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/recruitDetailPop.do")
    public String recruitDetailPop(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/inside/recruit/recruitDetailPop";
    }

    /**
     * 채용공고 단일 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getRecruit.do")
    public String getRecruit(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("recruit", recruitService.getRecruit(params));
        return "jsonView";
    }

    //채용관리 채용등록 팝업
    @RequestMapping("/Inside/pop/recruitReqPop.do")
    public String recruitReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = recruitService.getRecruitNum();
        model.addAttribute("recruitNum", data.get("RECRUIT_NUM"));
        model.addAttribute("params", params);

        return "popup/inside/recruit/recruitReqPop";
    }

    //채용관리 페이지
    @RequestMapping("/Inside/pop/recruitAdminPop.do")
    public String recruitAdminPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/recruitAdminPop";
    }

    //평가위원관리 페이지
    @RequestMapping("/Inside/commissionerManage.do")
    public String commissionerManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/commissionerManage";
    }

    //평가위원등록 페이지
    @RequestMapping("/Inside/pop/commissionerReqPop.do")
    public String commissionerReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/commissionerReqPop";
    }

    //외부의원 면접심사 페이지
    @RequestMapping("/Inside/externalInterview.do")
    public String externalInterview(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/externalInterview";
    }

    //채용공고 리스트
    @RequestMapping("/inside/getRecruitList")
    public String getRecruitList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = recruitService.getRecruitList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //평가위원 리스트
    @RequestMapping("/inside/getCommissionerList")
    public String getCommissionerList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = recruitService.getCommissionerList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //채용공고 저장
    @RequestMapping("/inside/setRecruitInsert")
    public String setRecruitInsert(@RequestParam Map<String, Object> params, Model model) {
        recruitService.setRecruitInsert(params);
        return "jsonView";
    }

    //평가위원 저장
    @RequestMapping("/inside/setCommissionerInsert")
    public String setCommissionerInsert(@RequestParam Map<String, Object> params, Model model) {
        recruitService.setCommissionerInsert(params);
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

}
