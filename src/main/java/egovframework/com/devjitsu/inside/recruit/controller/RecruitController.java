package egovframework.com.devjitsu.inside.recruit.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
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
    private EvalManageService evalManageService;

    @Autowired
    private UserService userService;

    /**
     * 채용관리 리스트 페이지
     * @param request
     * @param model
     * @return
     */
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
     * 채용공고 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getRecruitList")
    public String getRecruitList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = recruitService.getRecruitList(params);
        model.addAttribute("list", list);
        return "jsonView";
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

    /**
     * 채용공고 분야 단일 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getRecruitArea.do")
    public String getRecruitArea(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("recruitArea", recruitService.getRecruitArea(params));
        return "jsonView";
    }

    /**
     * 채용관리 채용등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
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

    /**
     * 채용공고 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setRecruitInsert")
    public String setRecruitInsert(@RequestParam Map<String, Object> params, Model model) {
        recruitService.setRecruitInsert(params);
        return "jsonView";
    }

    /**
     * 채용공고관리 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/recruitAdminPop.do")
    public String recruitAdminPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/recruit/recruitAdminPop";
    }

    /**
     * 채용공고 응시자 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getApplicationList")
    public String getApplicationList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("list", recruitService.getApplicationList(params));
        return "jsonView";
    }

    /**
     * 응시원서 상태 업데이트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setApplicationUpd.do")
    public String setApplicationUpd(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        recruitService.setApplicationUpd(params);
        return "jsonView";
    }

    /**
     * 응시원서 면접 불참자 업데이트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setInAvoidUpd.do")
    public String setInAvoidUpd(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        recruitService.setInAvoidUpd(params);
        return "jsonView";
    }


    /**
     * 응시원서 면접시간 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getInApplicationList.do")
    public String getInApplicationList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("list", recruitService.getInApplicationList(params));
        return "jsonView";
    }

    /**
     * 채용공고 면접시간 설정 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/inTimeSetPop.do")
    public String inTimeSetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("recruit", new Gson().toJson(recruitService.getRecruit(params)));

        return "popup/inside/recruit/inTimeSetPop";
    }

    /**
     * 면접시간 설정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setApplicationInTime.do")
    public String setApplicationInTime(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        recruitService.setApplicationInTime(params);
        return "jsonView";
    }

    /**
     * 채용공고 면접평가표 설정 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/selInEvalItemPop.do")
    public String selInEvalItemPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/recruit/selInEvalItemPop";
    }

    /**
     * 채용공고 면접평가위원 설정 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/selInEvalPop.do")
    public String selInEvalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/recruit/selInEvalPop";
    }

    /**
     * 채용관리 위원 선발 로그인 정보 저장
     * @return
     */
    @RequestMapping("/inside/setEvalSelection.do")
    public String setEvalSelection(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("duplicationTxt", evalManageService.setEvalSelection(params));
        return "jsonView";
    }

    /**
     * 공고별 평가지 저장
     * @param params
     * @return
     */
    @RequestMapping("/inside/setRecruitEvalSelSheet.do")
    public String setRecruitEvalSelSheet(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        evalManageService.setRecruitEvalSelSheet(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 평가위원관리 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/commissionerManage.do")
    public String commissionerManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/commissionerManage";
    }

    /**
     * 평가위원 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getCommissionerList")
    public String getCommissionerList(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = recruitService.getCommissionerList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 평가위원등록 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/commissionerReqPop.do")
    public String commissionerReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/commissionerReqPop";
    }

    /**
     * 평가위원 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setCommissionerInsert")
    public String setCommissionerInsert(@RequestParam Map<String, Object> params, Model model) {
        recruitService.setCommissionerInsert(params);
        return "jsonView";
    }

    /**
     * 외부의원 면접심사 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/externalInterview.do")
    public String externalInterview(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/externalInterview";
    }

    /**
     * 오늘날짜 구하기 yyyyMMddhhmmss
     * @return
     */
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
