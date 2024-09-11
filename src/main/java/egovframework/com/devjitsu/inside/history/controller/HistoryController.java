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
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

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

    //발령장 조회 페이지
    @RequestMapping("/Inside/historyView.do")
    public String historyView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/historyView";
    }

    //발령장 조회 팝업
    @RequestMapping("/Inside/pop/historyPrintPop.do")
    public String historyPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        Map<String, Object> data = new HashMap<>();
        if(params.containsKey("apntSn")){
            data = historyService.getHistoryOne(params);
            model.addAttribute("data", new Gson().toJson(data));
        }

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        System.out.println("****params : "+params);
        model.addAttribute("apntSn", params.get("apntSn"));
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        return "popup/inside/history/historyPrintPop";
    }

    //발령관리 페이지
    @RequestMapping("/Inside/historyReq.do")
    public String historyReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

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
        HttpServletRequest servletRequest = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || servletRequest.getServerName().contains("218.158.231.186")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.186/upload/templateForm/");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
            params.put("hwpTemplateFile", "http://218.158.231.184/upload/templateForm/");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("data", params);
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

        if(login == null){
            return "error/error";
        }
        
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
    public String rewardReqBatchPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
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

    @RequestMapping("/inside/getHistoryListAdmin")
    public String getHistoryListAdmin(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = historyService.getHistoryListAdmin(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 발령조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getUpdHistoryList")
    public String getUpdHistoryList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = historyService.getUpdHistoryList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 포상조회
     * @param params
     * @return
     */
    @RequestMapping("/inside/getUpdRewardList")
    public String getUpdRewardList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = historyService.getUpdRewardList(params);
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
    public String setHistoryInsert(@RequestParam Map<String, Object> params,Model model) {
        historyService.setHistoryInsert(params, BASE_DIR);
        model.addAttribute("apntSn",params.get("apntSn"));
//        userService.setUserInfoUpdate(params);
        System.out.println("params"+params);
        return "jsonView";
    }

    /**
     * 발령수정
     * @param params
     * @return
     */
    @RequestMapping("/inside/setHistoryUpdate")
    public String setHistoryUpdate(@RequestParam Map<String, Object> params) {
        historyService.setHistoryUpdate(params);
//        userService.setUserInfoUpdate(params);
        return "jsonView";
    }

    @RequestMapping("/inside/setHistoryDelete")
    public String setHistoryDelete(@RequestParam Map<String, Object> params) {
        historyService.setHistoryDelete(params);
        return "jsonView";
    }

    /**
     * 수동발령
     * @param params
     * @return
     */
    @RequestMapping("/inside/appointProcessing")
    public String appointProcessing(@RequestParam Map<String, Object> params) {
        historyService.appointmentEmpInfoUpd(params);
        return "jsonView";
    }

    /** 포상등록 */
    @RequestMapping("/inside/setRewardInsert")
    public String setRewardInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("rewardFile").toArray(new MultipartFile[0]);
        //historyService.setRewardInsert(params, file, SERVER_DIR, BASE_DIR);
        historyService.setRewardInsert(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    @RequestMapping("/inside/setRewardDelete")
    public String setRewardDelete(@RequestParam Map<String, Object> params) {
        historyService.setRewardDelete(params);
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

    @RequestMapping("/inside/modAf")
    public String modAf(@RequestParam Map<String, Object> params, Model model) {
        try{
            historyService.modAf(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    private static final Map<String, Map<String, Object>> storage = new HashMap<>();
    @RequestMapping(value = "/Inside/pop/saveMergedData", method = RequestMethod.POST, produces = "application/json")
    @ResponseBody
    public Map<String, Object> saveMergedData(@RequestParam Map<String, Object> params) {

        Map<String, Object> data = new HashMap<>();

        data.putAll(params);
        System.out.println("****params :****" +params);
        System.out.println("****data :****" +data);

        String identifier = generateIdentifier();
        storage.put(identifier, data);

        Map<String, Object> response = new HashMap<>();
        response.put("identifier", identifier);
        return response;

    }

    @RequestMapping("/Inside/pop/historyReqPrintPop.do")
    public String historyReqPrintPop(@RequestParam("identifier") String identifier,
                                     HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        model.addAttribute("hwpUrl", hwpUrl);

        Map<String, Object> mergedData = storage.get(identifier);
        model.addAttribute("data", new Gson().toJson(mergedData));

        System.out.println("****mergedData :****" + mergedData);

        Map<String, Object> params = new HashMap<>();

        params.put("hwpUrl", hwpUrl);
        params.put("identifier",identifier);
        System.out.println("****params :****" + params);
        model.addAttribute("params", new Gson().toJson(params));

        return "popup/inside/history/historyReqPrintPop";
    }

    private String generateIdentifier() {
        return UUID.randomUUID().toString();
    }

    @RequestMapping("/inside/pop/setTmpActiveUpdate.do")
    public String setTmpActiveUpdate(@RequestParam Map<String, Object> params) {

            historyService.setTmpActiveUpdate(params);

        return "jsonView";
    }


}
