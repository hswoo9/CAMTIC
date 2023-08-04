package egovframework.com.devjitsu.inside.history.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.history.service.HistoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class HistoryController {

    private static final Logger logger = LoggerFactory.getLogger(HistoryController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private HistoryService historyService;

    //발령관리 페이지
    @RequestMapping("/Inside/historyReq.do")
    public String historyReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/historyReq";
    }

    //발령신청 페이지
    @RequestMapping("/Inside/pop/historyReqPop.do")
    public String historyReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        String hwpUrl = "";

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.186:8080/upload/templateForm/");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.186:8080/upload/templateForm/");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        return "popup/inside/history/historyReqPop";
    }

    //세부 발령 사항 페이지
    @RequestMapping("/Inside/pop/historyViewPop.do")
    public String historyViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = historyService.getHistoryOne(params);
        model.addAttribute("data", data);
        return "popup/inside/history/historyViewPop";
    }

    //포상관리 페이지
    @RequestMapping("/Inside/rewardReq.do")
    public String rewardReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/rewardReq";
    }

    //포상관리등록 페이지
    @RequestMapping("/Inside/pop/rewardReqPop.do")
    public String rewardReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/history/rewardReqPop";
    }

    //포상관리일괄등록 페이지
    @RequestMapping("/Inside/pop/rewardReqBatchPop.do")
    public String rewardReqBatchPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/history/rewardReqBatchPop";
    }

    //포상구분관리 페이지
    @RequestMapping("/Inside/pop/rewardGubunPop.do")
    public String rewardGubunPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/history/rewardGubunPop";
    }

    /**
     * 발령조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getHistoryList")
    public String getHistoryList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = historyService.getHistoryList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 발령 단일조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getHistoryOne")
    public String getHistoryOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = historyService.getHistoryOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /**
     * 포상조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getRewardList")
    public String getRewardList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = historyService.getRewardList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 발령등록
     * @param params
     * @return
     */
    @RequestMapping("/inside/setHistoryInsert")
    public String setHistoryInsert(@RequestParam Map<String, Object> params) {
        historyService.setHistoryInsert(params, BASE_DIR);
        userService.setUserInfoUpdate(params);
        return "jsonView";
    }

    /**
     * 포상등록
     * @param params
     * @return
     */
    @RequestMapping("/inside/setRewardInsert")
    public String setRewardInsert(@RequestParam Map<String, Object> params) {
        historyService.setRewardInsert(params);
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
