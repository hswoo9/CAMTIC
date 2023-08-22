package egovframework.com.devjitsu.campus.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
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
public class CampusController {

    private static final Logger logger = LoggerFactory.getLogger(CampusController.class);

    @Autowired
    private CampusService campusService;

    //개인학습신청
    @RequestMapping("/Campus/eduReq.do")
    public String eduReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduReq";
    }

    //개인학습신청 - 학습신청팝업
    @RequestMapping("/Campus/pop/eduReqPop.do")
    public String eduReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        model.addAttribute("eduFormType", params.get("eduFormType"));

        String pageName = "";
        String directory = "";
        int eduFormType = Integer.parseInt(params.get("eduFormType").toString());
        switch (eduFormType) {
            case 1 :
                directory = "offLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "교육기관");
                model.addAttribute("careNameVar", "기관명");
                model.addAttribute("careLocationVar", "소재지");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 2 :
                directory = "onLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "학습사이트");
                model.addAttribute("careNameVar", "사이트명");
                model.addAttribute("careLocationVar", "URL");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 3 :
                directory = "forum";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 4 :
                directory = "expo";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 5 :
                directory = "books";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "도서내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "도서비용");
                break;
            case 6 :
                directory = "treatise";
                model.addAttribute("eduNameVar", "논문/학술지명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "구입비용");
                break;
            case 7 :
                directory = "writeTreatise";
                model.addAttribute("eduNameVar", "논문명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 8 :
                directory = "writeWork";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "저술목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 9 :
                directory = "visit";
                model.addAttribute("eduNameVar", "방문명");
                model.addAttribute("eduObjectVar", "방문목적");
                model.addAttribute("eduContentVar", "방문내용");
                model.addAttribute("eduDateVar", "방문기간");
                model.addAttribute("eduMoneyVar", "소요비용");
                break;
            case 10 :
                directory = "competence";
                model.addAttribute("eduNameVar", "자격증명");
                model.addAttribute("eduObjectVar", "취득목적");
                model.addAttribute("eduContentVar", "자격증내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "응시료");
                break;
            case 11 :
                directory = "debate";
                model.addAttribute("eduNameVar", "발표목적");
                model.addAttribute("eduObjectVar", "발표목적");
                model.addAttribute("eduContentVar", "발표내용");
                model.addAttribute("eduDateVar", "발표일");
                break;
        }
        pageName = "popup/campus/eduReqPop";
        return pageName;
    }

    //개인학습신청 - 학습신청팝업 - 목표기술서선택팝업
    @RequestMapping("/Campus/pop/targetEduSetPop.do")
    public String targetEduSetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetEduSetPop";
    }

    //개인학습관리
    @RequestMapping("/Campus/eduInfo.do")
    public String eduInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduInfo";
    }

    //개인학습관리 - 개인학습조회팝업
    @RequestMapping("/Campus/pop/eduInfoViewPop.do")
    public String eduInfoViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        String EDU_FORM_TYPE = data.get("EDU_FORM_TYPE").toString();
        model.addAttribute("eduFormType", EDU_FORM_TYPE);

        String directory = "";
        int eduFormType = Integer.parseInt(EDU_FORM_TYPE);
        switch (eduFormType) {
            case 1 :
                directory = "offLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "교육기관");
                model.addAttribute("careNameVar", "기관명");
                model.addAttribute("careLocationVar", "소재지");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 2 :
                directory = "onLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "학습사이트");
                model.addAttribute("careNameVar", "사이트명");
                model.addAttribute("careLocationVar", "URL");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 3 :
                directory = "forum";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 4 :
                directory = "expo";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 5 :
                directory = "books";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "도서내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "도서비용");
                break;
            case 6 :
                directory = "treatise";
                model.addAttribute("eduNameVar", "논문/학술지명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "구입비용");
                break;
            case 7 :
                directory = "writeTreatise";
                model.addAttribute("eduNameVar", "논문명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 8 :
                directory = "writeWork";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "저술목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 9 :
                directory = "visit";
                model.addAttribute("eduNameVar", "방문명");
                model.addAttribute("eduObjectVar", "방문목적");
                model.addAttribute("eduContentVar", "방문내용");
                model.addAttribute("eduDateVar", "방문기간");
                model.addAttribute("eduMoneyVar", "소요비용");
                break;
            case 10 :
                directory = "competence";
                model.addAttribute("eduNameVar", "자격증명");
                model.addAttribute("eduObjectVar", "취득목적");
                model.addAttribute("eduContentVar", "자격증내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "응시료");
                break;
            case 11 :
                directory = "debate";
                model.addAttribute("eduNameVar", "발표목적");
                model.addAttribute("eduObjectVar", "발표목적");
                model.addAttribute("eduContentVar", "발표내용");
                model.addAttribute("eduDateVar", "발표일");
                break;
        }
        return "popup/campus/eduInfoViewPop";
    }

    //개인학습관리 - 학습결과보고서작성팝업
    @RequestMapping("/Campus/pop/eduResultReqPop.do")
    public String eduResultReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        String EDU_FORM_TYPE = data.get("EDU_FORM_TYPE").toString();
        model.addAttribute("eduFormType", EDU_FORM_TYPE);

        String directory = "";
        int eduFormType = Integer.parseInt(EDU_FORM_TYPE);
        switch (eduFormType) {
            case 1 :
                directory = "offLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "교육기관");
                model.addAttribute("careNameVar", "기관명");
                model.addAttribute("careLocationVar", "소재지");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 2 :
                directory = "onLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "학습사이트");
                model.addAttribute("careNameVar", "사이트명");
                model.addAttribute("careLocationVar", "URL");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 3 :
                directory = "forum";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 4 :
                directory = "expo";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 5 :
                directory = "books";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "도서내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "도서비용");
                break;
            case 6 :
                directory = "treatise";
                model.addAttribute("eduNameVar", "논문/학술지명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "구입비용");
                break;
            case 7 :
                directory = "writeTreatise";
                model.addAttribute("eduNameVar", "논문명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 8 :
                directory = "writeWork";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "저술목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 9 :
                directory = "visit";
                model.addAttribute("eduNameVar", "방문명");
                model.addAttribute("eduObjectVar", "방문목적");
                model.addAttribute("eduContentVar", "방문내용");
                model.addAttribute("eduDateVar", "방문기간");
                model.addAttribute("eduMoneyVar", "소요비용");
                break;
            case 10 :
                directory = "competence";
                model.addAttribute("eduNameVar", "자격증명");
                model.addAttribute("eduObjectVar", "취득목적");
                model.addAttribute("eduContentVar", "자격증내용");
                model.addAttribute("eduMoneyVar", "응시료");
                model.addAttribute("eduDateVar", "취득종류(인정시간)");
                break;
            case 11 :
                directory = "debate";
                model.addAttribute("eduNameVar", "발표목적");
                model.addAttribute("eduObjectVar", "발표목적");
                model.addAttribute("eduContentVar", "발표내용");
                model.addAttribute("eduDateVar", "발표일");
                break;
        }
        return "popup/campus/eduResultReqPop";
    }

    //개인학습관리 - 학습결과보고서조회팝업
    @RequestMapping("/Campus/pop/eduResultViewPop.do")
    public String eduResultViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        String EDU_FORM_TYPE = data.get("EDU_FORM_TYPE").toString();
        model.addAttribute("eduFormType", EDU_FORM_TYPE);

        String directory = "";
        int eduFormType = Integer.parseInt(EDU_FORM_TYPE);
        switch (eduFormType) {
            case 1 :
                directory = "offLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "교육기관");
                model.addAttribute("careNameVar", "기관명");
                model.addAttribute("careLocationVar", "소재지");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 2 :
                directory = "onLine";
                model.addAttribute("eduNameVar", "과정명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "학습내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("careVar", "학습사이트");
                model.addAttribute("careNameVar", "사이트명");
                model.addAttribute("careLocationVar", "URL");
                model.addAttribute("eduMoneyVar", "교육비");
                break;
            case 3 :
                directory = "forum";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 4 :
                directory = "expo";
                model.addAttribute("eduNameVar", "행사명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "행사내용");
                model.addAttribute("eduDateVar", "행사기간");
                model.addAttribute("careVar", "행사주관");
                model.addAttribute("careNameVar", "주관명");
                model.addAttribute("careLocationVar", "행사장소");
                model.addAttribute("eduMoneyVar", "참가비");
                break;
            case 5 :
                directory = "books";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "도서내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "도서비용");
                break;
            case 6 :
                directory = "treatise";
                model.addAttribute("eduNameVar", "논문/학술지명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "학습기간");
                model.addAttribute("eduMoneyVar", "구입비용");
                break;
            case 7 :
                directory = "writeTreatise";
                model.addAttribute("eduNameVar", "논문명");
                model.addAttribute("eduObjectVar", "학습목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 8 :
                directory = "writeWork";
                model.addAttribute("eduNameVar", "도서명");
                model.addAttribute("eduObjectVar", "저술목적");
                model.addAttribute("eduContentVar", "주요내용");
                model.addAttribute("eduDateVar", "저술기간");
                model.addAttribute("eduMoneyVar", "관련비용");
                break;
            case 9 :
                directory = "visit";
                model.addAttribute("eduNameVar", "방문명");
                model.addAttribute("eduObjectVar", "방문목적");
                model.addAttribute("eduContentVar", "방문내용");
                model.addAttribute("eduDateVar", "방문기간");
                model.addAttribute("eduMoneyVar", "소요비용");
                break;
            case 10 :
                directory = "competence";
                model.addAttribute("eduNameVar", "자격증명");
                model.addAttribute("eduObjectVar", "취득목적");
                model.addAttribute("eduContentVar", "자격증내용");
                model.addAttribute("eduMoneyVar", "응시료");
                model.addAttribute("eduDateVar", "취득종류(인정시간)");
                break;
            case 11 :
                directory = "debate";
                model.addAttribute("eduNameVar", "발표목적");
                model.addAttribute("eduObjectVar", "발표목적");
                model.addAttribute("eduContentVar", "발표내용");
                model.addAttribute("eduDateVar", "발표일");
                break;
        }
        return "popup/campus/eduResultViewPop";
    }

    /** 학습조 리스트 페이지 */
    @RequestMapping("/Campus/studyInfo.do")
    public String studyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/studyInfo";
    }

    /** 학습조 리스트 관리자 페이지 */
    @RequestMapping("/Campus/studyInfoMng.do")
    public String studyInfoMng(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/studyInfoMng";
    }

    /** 학습조 신청 팝업 */
    @RequestMapping("/Campus/pop/studyReqPop.do")
    public String studyReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/studyReqPop";
    }

    /** 학습조 조회 팝업 */
    @RequestMapping("/Campus/pop/studyViewPop.do")
    public String studyViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        List<Map<String, Object>> list = campusService.getStudyUserList(params);
        model.addAttribute("params", params);
        model.addAttribute("list", list);
        return "popup/campus/studyViewPop";
    }

    /** 학습조 학습일지 작성 팝업 */
    @RequestMapping("/Campus/pop/studyJournalPop.do")
    public String studyJournalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        if(params.containsKey("studyJournalSn")){
            Map<String, Object> info = campusService.getStudyJournalOne(params);
            model.addAttribute("info", new Gson().toJson(info));
        }
        model.addAttribute("params", params);
        return "popup/campus/studyJournalPop";
    }


    //전파학습관리
    @RequestMapping("/Campus/propagInfo.do")
    public String propagInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/propagInfo";
    }

    //OJT관리
    @RequestMapping("/Campus/ojtInfo.do")
    public String ojtInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/ojtInfo";
    }

    //오픈스터디관리
    @RequestMapping("/Campus/openStudyInfo.do")
    public String openStudyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/openStudyInfo";
    }

    //공통학습관리(캠화지등)
    @RequestMapping("/Campus/eduManagement.do")
    public String eduManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduManagement";
    }

    //학습통계
    @RequestMapping("/Campus/eduStat.do")
    public String eduStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduStat";
    }

    /** 전체 학습통계 */
    @RequestMapping("/Campus/eduAllStat.do")
    public String eduAllStat(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduAllStat";
    }

    //목표기술서 작성페이지
    @RequestMapping("/Campus/targetInfo.do")
    public String targetInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/targetInfo";
    }

    //목표기술서 - STEP1: 목표기술서 등록팝업
    @RequestMapping("/Campus/pop/targetAddYearPop.do")
    public String targetAddYearPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/targetAddYearPop";
    }

    //목표기술서 - STEP2-1: 주업무 선택팝업
    @RequestMapping("/Campus/pop/targetInfoPop.do")
    public String targetInfoPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetInfoPop";
    }

    //목표기술서 - STEP2-2: 주업무 현황 및 목표 설정팝업
    @RequestMapping("/Campus/pop/targetMainSetPop.do")
    public String targetMainClassSet(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetMainSetPop";
    }

    //목표기술서 - STEP3-1: 연계업무 선택팝업
    @RequestMapping("/Campus/pop/targetSubInfoPop.do")
    public String targetSubInfoPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetSubInfoPop";
    }

    //목표기술서 - STEP3-2: 연계업무 현황 및 목표 설정팝업
    @RequestMapping("/Campus/pop/targetSubSetPop.do")
    public String targetSubSetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetSubSetPop";
    }

    //목표기술서 - STEP4-1: 학습계획 작성팝업
    @RequestMapping("/Campus/pop/eduPlanReqPop.do")
    public String eduPlanPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/eduPlanReqPop";
    }

    //학습체계도관리
    @RequestMapping("/Campus/systemManagement.do")
    public String systemManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/systemManagement";
    }

    /** 학습체계도 코드 조회 팝업 */
    @RequestMapping("/Campus/pop/systemAdminPop.do")
    public String systemAdminPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/campus/systemAdminPop";
    }

    /** 학습체계도 코드 관리 팝업 */
    @RequestMapping("/Campus/pop/systemAdminReqPop.do")
    public String systemAdminReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        if(params.get("mode").equals("upd") && params.get("type").equals("A")){
            Map<String, Object> data = campusService.getCodeOne(params);
            model.addAttribute("data", data);
        }else if(params.get("mode").equals("upd") && params.get("type").equals("B")){
            Map<String, Object> data = campusService.getEduCategoryOne(params);
            model.addAttribute("data", data);
        }else if(params.get("mode").equals("upd") && params.get("type").equals("C")){
            Map<String, Object> data = campusService.getEduCategoryDetailOne(params);
            model.addAttribute("data", data);
        }
        return "popup/campus/systemAdminReqPop";
    }

    /** 직무기술서 관리 페이지 */
    @RequestMapping("/Campus/dutyInfo.do")
    public String dutyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/dutyInfo";
    }

    /** 직무기술서 등록 팝업 */
    @RequestMapping("/Campus/pop/dutyInfoReqPop.do")
    public String dutyInfoReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/dutyInfoReqPop";
    }

    //캠퍼스 - 학습신청서 전자결재
    @RequestMapping("/Campus/pop/campusApprovalPop.do")
    public String workHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/campusApprovalPop";
    }

    //캠퍼스 - 학습결과보고서 전자결재
    @RequestMapping("/Campus/pop/campusResApprovalPop.do")
    public String campusResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/campusResApprovalPop";
    }





    /** 캠퍼스 코드 리스트 조회 */
    @RequestMapping("/campus/getCodeList")
    public String getCodeList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCodeList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 캠퍼스 코드 단일 데이터 조회 */
    @RequestMapping("/campus/getCodeOne")
    public String getCodeOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getCodeOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //개인학습관리 - 개인학습리스트 조회
    @RequestMapping("/campus/getEduInfoList")
    public String getEduInfoList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduInfoList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //개인학습관리 - 개인학습조회팝업 - 단일데이터 조회
    @RequestMapping("/campus/getEduInfoOne")
    public String getEduInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getEduInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //개인학습관리 - 결과보고서조회팝업 - 단일데이터 조회
    @RequestMapping("/campus/getEduResultOne")
    public String getEduResultOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    //목표기술서 등록된연도 조회
    @RequestMapping("/campus/getTargetYearList")
    public String getTargetYearList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getTargetYearList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //목표기술서작성 - 해당연도 중복 조회
    @RequestMapping("/campus/getTargetOne")
    @ResponseBody
    public Map<String, Object> getTargetOne(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetOne(params);
        Map<String, Object> result = new HashMap<>();
        result.put("flag", false);
        if(list.size() == 0) {
            result.put("flag", true);
        }else {
            result.put("list", list);
        }
        return result;
    }

    //목표기술서작성 - 직무조회
    @RequestMapping("/campus/getTargetList")
    @ResponseBody
    public Map<String, Object> getTargetList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("flag", false);
        if(list.size() > 0) {
            result.put("flag", true);
            result.put("list", list);
        }
        return result;
    }

    /** 목표기술서 구분명 단일 데이터 조회 */
    @RequestMapping("/campus/getEduCategoryOne")
    public String getEduCategoryOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getEduCategoryOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 목표기술서 구분명 리스트 조회 */
    @RequestMapping("/campus/getEduCategoryList")
    public String getEduCategoryList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduCategoryList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 목표기술서 항목명 단일데이터 조회 */
    @RequestMapping("/campus/getEduCategoryDetailOne")
    public String getEduCategoryDetailOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getEduCategoryDetailOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 목표기술서 항목명 리스트 조회 */
    @RequestMapping("/campus/getEduCategoryDetailList")
    public String getEduCategoryDetailList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduCategoryDetailList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    //목표기술서작성 - 유저별 선택 구분 리스트
    @RequestMapping("/campus/getTargetCategoryList")
    @ResponseBody
    public Map<String, Object> getTargetCategoryList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetCategoryList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //목표기술서작성 - 유저별 선택 레벨 리스트
    @RequestMapping("/campus/getTargetCategoryDetailList")
    @ResponseBody
    public Map<String, Object> getTargetCategoryDetailList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getTargetCategoryDetailList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //학습체계도 - 학습계획리스트
    @RequestMapping("/campus/getEduPlanList")
    @ResponseBody
    public Map<String, Object> getEduPlanList(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getEduPlanList(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    //목표기술서작성 - 학습계획설정팝업 - 학습계획데이터조회
    @RequestMapping("/campus/getEduPlanOne")
    @ResponseBody
    public Map<String, Object> getEduPlanOne(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getEduPlanOne(params);
        Map<String, Object> result = new HashMap<>();
        result.put("flag", false);
        if(list.size() > 0) {
            result.put("flag", true);
            result.put("list", list);
        }
        return result;
    }

    /** 학습조 리스트 */
    @RequestMapping("/campus/getStudyInfoList")
    public String getStudyInfoList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyInfoList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 학습조 단일 데이터  */
    @RequestMapping("/campus/getStudyInfoOne")
    public String getStudyInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 학습조 유저 리스트 */
    @RequestMapping("/campus/getStudyUserList")
    public String getStudyUserList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyUserList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 학습조 학습일지 리스트 */
    @RequestMapping("/campus/getStudyJournalList")
    public String getStudyJournalList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyJournalList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 학습조 학습일지 단일 데이터  */
    @RequestMapping("/campus/getStudyJournalOne")
    public String getStudyJournalOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getStudyJournalOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 개인학습 통계 리스트  */
    @RequestMapping("/campus/getEduStat")
    @ResponseBody
    public Map<String, Object> getEduStat(@RequestParam Map<String, Object> params) {
        List<Map<String, Object>> list = campusService.getEduStat(params);
        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        return result;
    }

    /** 전체학습 통계 리스트 */
    @RequestMapping("/campus/getEduAllStatList")
    public String getEduAllStatList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduAllStatList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 직무기술서 리스트 조회 */
    @RequestMapping("/campus/getDutyInfoList")
    public String getDutyInfoList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getDutyInfoList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 직무기술서 단일 데이터 조회 */
    @RequestMapping("/campus/getDutyInfoOne")
    public String getDutyInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getDutyInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }




    //학습신청 - 교육수강신청서 - 저장
    @RequestMapping("/campus/setEduInfoInsert")
    public String setEduInfoInsert(@RequestParam Map<String, Object> params) {
        campusService.setEduInfoInsert(params);
        return "jsonView";
    }

    //학습관리 - 학습결과보고서 - 저장
    @RequestMapping("/campus/setEduResultInsert")
    public String setEduResultInsert(@RequestParam Map<String, Object> params) {
        campusService.setEduResultInsert(params);
        return "jsonView";
    }

    /** 학습조 저장 */
    @RequestMapping("/campus/setStudyInfoInsert")
    public String setStudyInfoInsert(@RequestParam Map<String, Object> params) {
        campusService.setStudyInfoInsert(params);
        return "jsonView";
    }

    /** 학습조 조장, 간사 지정 */
    @RequestMapping("/campus/setStudyUserMngUpdate")
    public String setStudyUserMngUpdate(@RequestParam Map<String, Object> params) {
        campusService.setStudyUserMngUpdate(params);
        return "jsonView";
    }

    /** 학습조 승인 프로세스 */
    @RequestMapping("/campus/studyReq")
    public String studyReq(@RequestParam Map<String, Object> params) {
        campusService.studyReq(params);
        return "jsonView";
    }

    /** 학습조 학습일지 저장 */
    @RequestMapping("/campus/setStudyJournalInsert")
    public String setStudyJournalInsert(@RequestParam Map<String, Object> params) {
        campusService.setStudyJournalInsert(params);
        return "jsonView";
    }

    /** 학습조 조장, 간사 검토완료 처리 */
    @RequestMapping("/campus/setStudyJournalApp")
    public String setStudyJournalApp(@RequestParam Map<String, Object> params) {
        campusService.setStudyJournalApp(params);
        return "jsonView";
    }

    //목표기술서작성 - 연도등록팝업 - 연도등록
    @RequestMapping("/campus/setTargetInsert")
    @ResponseBody
    public Map<String, Object> setTargetInsert(@RequestParam Map<String, Object> params) {
        return campusService.setTargetInsert(params);
    }

    //목표기술서작성 - 목표등록팝업 - 직무등록
    @RequestMapping("/campus/setTargetDetailInsert")
    @ResponseBody
    public Map<String, Object> setTargetDetailInsert(@RequestParam Map<String, Object> params) {
        return campusService.setTargetDetailInsert(params);
    }

    //목표기술서작성 - 현황/목표설정팝업 - 현황/목표설정
    @RequestMapping("/campus/setEduTargetDetailUpdate")
    @ResponseBody
    public Map<String, Object> setEduTargetDetailUpdate(@RequestParam Map<String, Object> params) {
        return campusService.setEduTargetDetailUpdate(params);
    }

    //목표기술서작성 - 학습계획 - 등록
    @RequestMapping("/campus/setEduPlanInsert")
    @ResponseBody
    public Map<String, Object> setEduPlanInsert(@RequestParam Map<String, Object> params) {
        return campusService.setEduPlanInsert(params);
    }

    //목표기술서작성 - 학습계획 - 수정
    @RequestMapping("/campus/setEduPlanUpdate")
    @ResponseBody
    public Map<String, Object> setEduPlanUpdate(@RequestParam Map<String, Object> params) {
        return campusService.setEduPlanUpdate(params);
    }

    //개인학습관리 - 승인프로세스(임시)
    @RequestMapping("/campus/updateEduInfoApprStat")
    @ResponseBody
    public Map<String, Object> updateEduInfoApprStat(@RequestParam Map<String, Object> params) {
        return campusService.updateEduInfoApprStat(params);
    }

    //목표기술서작성 - 승인프로세스(임시)
    @RequestMapping("/campus/updateApprStat")
    @ResponseBody
    public Map<String, Object> updateApprStat(@RequestParam Map<String, Object> params) {
        return campusService.updateApprStat(params);
    }

    /** 캠퍼스 코드 저장 */
    @RequestMapping("/campus/setEduCode")
    public String setEduCode(@RequestParam Map<String, Object> params) {
        campusService.setEduCode(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 구분명 저장 */
    @RequestMapping("/campus/setEduCategory")
    public String setEduCategory(@RequestParam Map<String, Object> params) {
        campusService.setEduCategory(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 항목명 저장 */
    @RequestMapping("/campus/setEduCategoryDetail")
    public String setEduCategoryDetail(@RequestParam Map<String, Object> params) {
        campusService.setEduCategoryDetail(params);
        return "jsonView";
    }

    /** 캠퍼스 코드 수정 */
    @RequestMapping("/campus/setEduCodeUpd")
    public String setEduCodeUpd(@RequestParam Map<String, Object> params) {
        campusService.setEduCodeUpd(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 구분명 수정 */
    @RequestMapping("/campus/setEduCategoryUpd")
    public String setEduCategoryUpd(@RequestParam Map<String, Object> params) {
        campusService.setEduCategoryUpd(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 항목명 수정 */
    @RequestMapping("/campus/setEduCategoryDetailUpd")
    public String setEduCategoryDetailUpd(@RequestParam Map<String, Object> params) {
        campusService.setEduCategoryDetailUpd(params);
        return "jsonView";
    }

    /** 캠퍼스 코드 삭제 */
    @RequestMapping("/campus/setEduCodeDel")
    public String setEduCodeDel(@RequestParam Map<String, Object> params) {
        campusService.setEduCodeDel(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 구분명 삭제 */
    @RequestMapping("/campus/setEduCategoryDel")
    public String setEduCategoryDel(@RequestParam Map<String, Object> params) {
        campusService.setEduCategoryDel(params);
        return "jsonView";
    }

    /** 캠퍼스 학습체계도 항목명 삭제 */
    @RequestMapping("/campus/setEduCategoryDetailDel")
    public String setEduCategoryDetailDel(@RequestParam Map<String, Object> params) {
        campusService.setEduCategoryDetailDel(params);
        return "jsonView";
    }

    /** 캠퍼스 직무기술서 등록 */
    @RequestMapping("/campus/setDutyInfoIns")
    public String setDutyInfoIns(@RequestParam Map<String, Object> params) {
        campusService.setDutyInfoIns(params);
        return "jsonView";
    }

    /** 캠퍼스 직무기술서 수정 */
    @RequestMapping("/campus/setDutyInfoUpd")
    public String setDutyInfoUpd(@RequestParam Map<String, Object> params) {
        campusService.setDutyInfoUpd(params);
        return "jsonView";
    }

    /** 직무기술서 승인프로세스 */
    @RequestMapping("/campus/setDutyCertReq")
    public String setDutyCertReq(@RequestParam Map<String, Object> params, Model model) {
        campusService.setDutyCertReq(params);
        return "jsonView";
    }

    /**
     * 학습신청서 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/educationReqApp")
    public String educationReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /**
     * 학습결과보고서 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/educationResReqApp")
    public String educationResReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updateResDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
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
