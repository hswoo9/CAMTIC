package egovframework.com.devjitsu.campus.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.campus.service.CampusService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class CampusController {

    private static final Logger logger = LoggerFactory.getLogger(CampusController.class);

    @Autowired
    private CampusService campusService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 나의학습현황 페이지 */
    @RequestMapping("/Campus/myEduStatus.do")
    public String myEduStatus(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/myEduStatus";
    }

    /** 개인학습신청 페이지 */
    @RequestMapping("/Campus/eduReq.do")
    public String eduReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduReq";
    }

    /** 캠퍼스 개요 팝업 */
    @RequestMapping("/Campus/pop/myStudy/campusGuide1Pop.do")
    public String campusGuide1(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/myStudy/campusGuide1Pop";
    }

    /** 역량/학습강화 팝업 */
    @RequestMapping("/Campus/pop/myStudy/campusGuide2Pop.do")
    public String campusGuide2Pop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/myStudy/campusGuide2Pop";
    }

    /** 직무 학습체계도 사용자 팝업 */
    @RequestMapping("/Campus/pop/myStudy/campusGuide3Pop.do")
    public String campusGuide3Pop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/myStudy/campusGuide3Pop";
    }

    /** 학습신청 팝업 */
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

    /** 목표기술서선택 팝업 */
    @RequestMapping("/Campus/pop/targetEduSetPop.do")
    public String targetEduSetPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", params);
        return "popup/campus/targetEduSetPop";
    }

    /** 개인학습관리 페이지 */
    @RequestMapping("/Campus/eduInfo.do")
    public String eduInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduInfo";
    }

    /** 개인학습조회팝업 페이지 */
    @RequestMapping("/Campus/pop/eduInfoViewPop.do")
    public String eduInfoViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        model.addAttribute("params", params);
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

    /** 학습결과보고서작성 팝업 */
    @RequestMapping("/Campus/pop/eduResultReqPop.do")
    public String eduResultReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getEduResultOne(params);
//        model.addAttribute("data", data);
        String EDU_FORM_TYPE = data.get("EDU_FORM_TYPE").toString();
        model.addAttribute("eduFormType", EDU_FORM_TYPE);
        model.addAttribute("params", params);

//        params.put("EDU_INFO_ID", params.get("eduInfoId"));
//        List<Map<String, Object>> fileInfo = campusService.getEduInfoFileList(params);
//        model.addAttribute("fileInfo", fileInfo);

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
        }
        return "popup/campus/eduResultReqPop";
    }

    /** 학습결과보고서조회 팝업 */
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
        model.addAttribute("params", params);

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
        }
        return "popup/campus/eduResultViewPop";
    }

    /** 회계담당자 설정 팝업 */
    @RequestMapping("/Campus/pop/eduResponsablePop.do")
    public String eduResponsablePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/campus/eduResponsablePop";
    }

    /** 회계담당자 리스트 */
    @RequestMapping("/campus/getEduResponsableList")
    public String getEduResponsableList(@RequestParam Map<String, Object> params, Model model) {
        /*List<Map<String, Object>> list = campusService.getEduResponsableList(params);
        model.addAttribute("list", list);*/

        model.addAttribute("rs", campusService.getEduResponsableList(params));
        return "jsonView";
    }

    /** 직원학습관리 페이지 */
    @RequestMapping("/Campus/eduInfoMng.do")
    public String eduInfoMng(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduInfoMng";
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
    public String studyReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
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
        Map<String, Object> resultData = campusService.getStudyResultOne(params);
        model.addAttribute("resultData", resultData);
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
        model.addAttribute("params", params);
        return "popup/campus/studyJournalPop";
    }

    /** 전파학습 조회 팝업 */
    @RequestMapping("/Campus/pop/propagViewPop.do")
    public String propagViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/propagViewPop";
    }

    /** 전파학습 학습일지 작성 팝업 */
    @RequestMapping("/Campus/pop/studyPropagPop.do")
    public String studyPropagPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        model.addAttribute("params", params);
        return "popup/campus/studyPropagPop";
    }

    /** OJT 조회 팝업 */
    @RequestMapping("/Campus/pop/ojtViewPop.do")
    public String ojtViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/ojtViewPop";
    }

    /** OJT 학습계획 팝업 */
    @RequestMapping("/Campus/pop/ojtPlanPop.do")
    public String ojtPlanPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        List<Map<String, Object>> list = campusService.getOjtPlanList(params);
        model.addAttribute("list", list);
        return "popup/campus/ojtPlanPop";
    }

    /** OJT 학습일지 팝업 */
    @RequestMapping("/Campus/pop/ojtResultPop.do")
    public String ojtResultPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/ojtResultPop";
    }

    /** 오픈스터디 페이지 */
    @RequestMapping("/Campus/openStudyInfo.do")
    public String openStudyInfo(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/openStudyInfo";
    }

    /** 오픈스터디 작성 팝업 */
    @RequestMapping("/Campus/pop/openStudyReqPop.do")
    public String openStudyReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/openStudyReqPop";
    }

    /** 오픈스터디 모임 -> 결과보고서 작성 팝업 */
    @RequestMapping("/Campus/pop/openStudyResultPop.do")
    public String openStudyResultPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> data = campusService.getOpenStudyResultList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("data", data);
        return "popup/campus/openStudyResultPop";
    }

    /** 오픈스터디 결과보고 페이지 */
    @RequestMapping("/Campus/openStudyRes.do")
    public String openStudyRes(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/openStudyRes";
    }

    /** 오픈스터디 결과보고서 조회 팝업 */
    @RequestMapping("/Campus/pop/openStudyResPop.do")
    public String openStudyResPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/openStudyResPop";
    }

    /** 오픈스터디 결과보고 관리자 페이지 */
    @RequestMapping("/Campus/openStudyResMng.do")
    public String openStudyResMng(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/openStudyResMng";
    }

    /** 공통학습현황 페이지 */
    @RequestMapping("/Campus/commonEduList.do")
    public String commonEduList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "campus/commonEduList";
    }

    /** 공통학습관리 관리자 페이지 */
    @RequestMapping("/Campus/eduManagement.do")
    public String eduManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduManagement";
    }

    /** 공통학습관리 등록 팝업 */
    @RequestMapping("/Campus/pop/commonEduReqPop.do")
    public String commonEduReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/commonEduReqPop";
    }

    /** 공통학습관리 학습참여관리 팝업 */
    @RequestMapping("/Campus/pop/commonEduUserListPop.do")
    public String commonEduUserListPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/commonEduUserListPop";
    }

    /** 공통학습관리 선택직원추가 팝업 */
    @RequestMapping("/Campus/pop/commonEduUserAddPop.do")
    public String commonEduUserAddPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/commonEduUserAddPop";
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

    /** 전체 학습통계(관리자) */
    @RequestMapping("/Campus/eduAllStatAdmin.do")
    public String eduAllStatAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/eduAllStatAdmin";
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

    /** 직무기술서 관리자 페이지 */
    @RequestMapping("/Campus/dutyInfoMng.do")
    public String dutyInfoMng(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/dutyInfoMng";
    }

    /** 목표기술서 관리자 팝업 */
    @RequestMapping("/Campus/pop/targetEduMngPop.do")
    public String targetEduMngPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/campus/targetEduMngPop";
    }


    //캠퍼스 - 학습신청서 전자결재
    @RequestMapping("/Campus/pop/campusApprovalPop.do")
    public String campusApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
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
    
    //캠퍼스 - 단체학습신청서 전자결재
    @RequestMapping("/Campus/pop/studyApprovalPop.do")
    public String studyApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/studyApprovalPop";
    }

    //캠퍼스 - 학습조 학습일지 한글뷰어
    @RequestMapping("/Campus/pop/studyPrintPop.do")
    public String studyPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);
        return "/popup/campus/approvalFormPopup/studyPrintPop";
    }

    //캠퍼스 - 전파학습 학습일지 한글뷰어
    @RequestMapping("/Campus/pop/propagPrintPop.do")
    public String propagPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);
        return "/popup/campus/approvalFormPopup/propagPrintPop";
    }

    //캠퍼스 - OJT 학습일지 한글뷰어
    @RequestMapping("/Campus/pop/ojtPrintPop.do")
    public String ojtPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);
        return "/popup/campus/approvalFormPopup/ojtPrintPop";
    }

    //캠퍼스 - 단체학습 학습조 결과보고서 전자결재
    @RequestMapping("/Campus/pop/studyResApprovalPop.do")
    public String studyResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/studyResApprovalPop";
    }

    //캠퍼스 - 단체학습 전파학습 학습신청서 전자결재
    @RequestMapping("/Campus/pop/studyPropagApprovalPop.do")
    public String studyPropagApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/studyPropagApprovalPop";
    }

    //캠퍼스 - 단체학습 전파학습 결과보고서 전자결재
    @RequestMapping("/Campus/pop/propagResApprovalPop.do")
    public String propagResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/propagResApprovalPop";
    }

    //캠퍼스 - 단체학습 OJT 학습신청서 전자결재
    @RequestMapping("/Campus/pop/studyOjtApprovalPop.do")
    public String studyOjtApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/studyOjtApprovalPop";
    }

    //캠퍼스 - 단체학습 OJT 결과보고서 전자결재
    @RequestMapping("/Campus/pop/ojtResApprovalPop.do")
    public String ojtResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/campus/approvalFormPopup/ojtResApprovalPop";
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

    /** 이번년도 실제 교육 시간*/
    @RequestMapping("/campus/getRealEduTimeYear")
    public String getRealEduTimeYear(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getRealEduTimeYear(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 학습조 이번주 실제 교육 시간*/
    @RequestMapping("/campus/getRealEduTimeStudyWeekly")
    public String getRealEduTimeStudyWeekly(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getRealEduTimeStudyWeekly(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 전파학습 이번주 실제 교육 시간*/
    @RequestMapping("/campus/getRealEduTimePropagWeekly")
    public String getRealEduTimePropagWeekly(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getRealEduTimePropagWeekly(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 개인학습 리스트 */
    @RequestMapping("/campus/getEduInfoList")
    public String getEduInfoList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduInfoList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 개인학습 학습취소 */
    @RequestMapping("/campus/setEduInfoDelete")
    public String setEduInfoDelete(@RequestParam Map<String, Object> params) {
        campusService.setEduInfoDelete(params);
        return "jsonView";
    }

    /** 오픈스터디 모임개설취소 */
    @RequestMapping("/campus/setOpenStudyInfoDelete")
    public String setOpenStudyInfoDelete(@RequestParam Map<String, Object> params) {
        campusService.setOpenStudyInfoDelete(params);
        return "jsonView";
    }

    /** 단체학습 학습취소 */
    @RequestMapping("/campus/setStudyInfoDelete")
    public String setStudyInfoDelete(@RequestParam Map<String, Object> params) {
        campusService.setStudyInfoDelete(params);
        return "jsonView";
    }

    //개인학습관리 - 개인학습조회팝업 - 단일데이터 조회
    @RequestMapping("/campus/getEduInfoOne")
    public String getEduInfoOne(@RequestParam Map<String, Object> params, Model model) {
        params.put("EDU_INFO_ID", params.get("eduInfoId"));
        Map<String, Object> data = campusService.getEduInfoOne(params);
        model.addAttribute("data", data);
        model.addAttribute("fileInfo", campusService.getEduInfoFileList(params));
        return "jsonView";
    }

    //개인학습관리 - 결과보고서조회팝업 - 단일데이터 조회
    @RequestMapping("/campus/getEduResultOne")
    public String getEduResultOne(@RequestParam Map<String, Object> params, Model model) {
        params.put("EDU_INFO_ID", params.get("eduInfoId"));
        Map<String, Object> data = campusService.getEduResultOne(params);
        model.addAttribute("data", data);
        model.addAttribute("fileInfo", campusService.getEduResultInfoFileList(params));
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

    /** 나의학습계획 공통학습 리스트 */
    @RequestMapping("/campus/getStudyInfoStatList")
    public String getStudyInfoStatList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyInfoStatList(params);
        model.addAttribute("list", list);
        return "jsonView";
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

    @RequestMapping("/campus/getOjtResultInfoOne")
    public String getOjtResultInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOjtResultInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/campus/getOjtOjtResultSnOne")
    public String getOjtOjtResultSnOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOjtOjtResultSnOne(params);
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

    /** 전파학습 학습일지 단일 데이터  */
    @RequestMapping("/campus/getStudyPropagInfoOne")
    public String getStudyPropagInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getStudyPropagInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 전파학습 학습일지 리스트 */
    @RequestMapping("/campus/getStudyPropagList")
    public String getStudyPropagList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyPropagList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 전파학습 학습일지 실제 참여자 리스트 */
    @RequestMapping("/campus/getStudyPropagUserList")
    public String getStudyPropagUserList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyPropagUserList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/campus/getStudyPropagUserInfo")
    public String getStudyPropagUserInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyPropagUserInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/campus/getStudyPropagUserInfo2")
    public String getStudyPropagUserInfo2(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyPropagUserInfo2(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/campus/getStudyOjtUserInfo")
    public String getStudyOjtUserInfo(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyOjtUserInfo(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** OJT 학습계획 리스트 */
    @RequestMapping("/campus/getOjtPlanList")
    public String getOjtPlanList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getOjtPlanList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** OJT 학습계획 단일 데이터  */
    @RequestMapping("/campus/getOjtPlanOne")
    public String getOjtPlanOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOjtPlanOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** OJT 학습일지 리스트 */
    @RequestMapping("/campus/getOjtResultList")
    public String getOjtResultList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getOjtResultList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }


    /** OJT 학습계획 단일 데이터  */
    @RequestMapping("/campus/getOjtResultOne")
    public String getOjtResultOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOjtResultOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 나의학습관리 오픈스터디 리스트 */
    @RequestMapping("/campus/getOpenStudyInfoStatList")
    public String getOpenStudyInfoStatList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getOpenStudyInfoStatList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 오픈스터디 리스트 */
    @RequestMapping("/campus/getOpenStudyInfoList")
    public String getOpenStudyInfoList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO)session.getAttribute("LoginVO");
        params.put("empSeq",login.getUniqId());
        List<Map<String, Object>> list = campusService.getOpenStudyInfoList(params);
        model.addAttribute("loginVO", login);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 오픈스터디 리스트 (관리자) */
    @RequestMapping("/campus/getOpenStudyInfoAdminList")
    public String getOpenStudyInfoAdminList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO)session.getAttribute("LoginVO");
        params.put("empSeq",login.getUniqId());
        List<Map<String, Object>> list = campusService.getOpenStudyInfoAdminList(params);
        model.addAttribute("loginVO", login);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 오픈스터디 단일 데이터  */
    @RequestMapping("/campus/getOpenStudyInfoOne")
    public String getOpenStudyInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOpenStudyInfoOne(params);

        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 오픈스터디 참여자 리스트 */
    @RequestMapping("/campus/getOpenStudyUserList")
    public String getOpenStudyUserList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getOpenStudyUserList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 오픈스터디 참여자 리스트(결과보고 작성 페이지) */
    @RequestMapping("/campus/getOpenStudyUserList2")
    public String getOpenStudyUserList2(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getOpenStudyUserList2(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 나의학습현황 공통학습 리스트 */
    @RequestMapping("/campus/getCommonEduStatList")
    public String getCommonEduStatList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCommonEduStatList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 공통학습 리스트 */
    @RequestMapping("/campus/getCommonEduList")
    public String getCommonEduList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCommonEduList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 공통학습 관리자 리스트 */
    @RequestMapping("/campus/getCommonEduMngList")
    public String getCommonEduMngList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCommonEduMngList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 공통학습 단일 데이터  */
    @RequestMapping("/campus/getCommonEduOne")
    public String getCommonEduOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getCommonEduOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 공통학습 참여자 리스트 */
    @RequestMapping("/campus/getCommonEduUserList")
    public String getCommonEduUserList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCommonEduUserList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 공통학습 선택직원추가 리스트 */
    @RequestMapping("/campus/getCommonEduUserAddList")
    public String getCommonEduUserAddList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getCommonEduUserAddList(params);
        model.addAttribute("list", list);
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

    /** 개인학습 통계 리스트 */
    @RequestMapping("/campus/getEduMyStatList")
    public String getEduMyStatList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getEduMyStatList(params);
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

    /** 목표/직무기술서 리스트 */
    @RequestMapping("/campus/getDutyInfoMngList")
    public String getDutyInfoMngList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getDutyInfoMngList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/campus/agreeSubject")
    public String agreeSubject(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.agreeSubject(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/agreeDutySubject")
    public String agreeDutySubject(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.agreeDutySubject(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }




    /** 교육수강신청서 저장 */
    @RequestMapping("/campus/setEduInfoInsert")
    public String setEduInfoInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
            campusService.setEduInfoInsert(params, fileList, SERVER_DIR, BASE_DIR);
            /*Integer eduInfoId = campusService.setEduInfoInsert(params, request, SERVER_DIR, BASE_DIR);*/
            /*model.addAttribute("eduInfoId", eduInfoId);*/
            model.addAttribute("eduInfoId", params.get("eduInfoId"));
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 교육수강신청서 수정 */
    @RequestMapping("/campus/setEduInfoModify")
    public String setEduInfoModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
            campusService.setEduInfoModify(params, fileList, SERVER_DIR, BASE_DIR);
            model.addAttribute("eduInfoId", params.get("eduInfoId"));
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 학습결과보고서 저장 */
    @RequestMapping("/campus/setEduResultInsert")
    public String setEduResultInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request) {
        MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
        campusService.setEduResultInsert(params, fileList, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 학습결과보고서 수정 */
    @RequestMapping("/campus/setEduResultModify")
    public String setEduResultModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request) {
        MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
        campusService.setEduResultModify(params, fileList, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 개인학습 이수완료/이수취소 처리 */
    @RequestMapping("/campus/setMngCheckUpd")
    public String setMngCheckUpd(@RequestParam Map<String, Object> params) {
        campusService.setMngCheckUpd(params);
        return "jsonView";
    }

    @RequestMapping("/campus/setEduResultEduTimeUpd")
    public String setEduResultEduTimeUpd(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setEduResultEduTimeUpd(params);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 학습조 저장 */
    @RequestMapping("/campus/setStudyInfoInsert")
    public String setStudyInfoInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
        campusService.setStudyInfoInsert(params, fileList, SERVER_DIR, BASE_DIR);
        model.addAttribute("studyUserSn", params.get("studyUserSn"));
        return "jsonView";
    }

    /** 학습조 수정 */
    @RequestMapping("/campus/setStudyInfoModify")
    public String setStudyInfoModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);
        campusService.setStudyInfoModify(params, fileList, SERVER_DIR, BASE_DIR);
        model.addAttribute("studyUserSn", params.get("studyUserSn"));
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
//        campusService.setStudyInfoComplete(params);
        return "jsonView";
    }


    /** 학습조 학습일지 저장 */
    @RequestMapping("/campus/setStudyJournalInsert")
    public String setStudyJournalInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        campusService.setStudyJournalInsert(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 학습조 학습일지 수정 */
    @RequestMapping("/campus/setStudyJournalModify")
    public String setStudyJournalModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        campusService.setStudyJournalModify(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    @RequestMapping("/campus/setStudyResultSc")
    public String setStudyResultSc(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.setStudyResultSc(params);
            model.addAttribute("code",200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 학습조 조장, 간사 검토완료 처리 */
    @RequestMapping("/campus/setStudyJournalApp")
    public String setStudyJournalApp(@RequestParam Map<String, Object> params) {
        campusService.setStudyJournalApp(params);
        return "jsonView";
    }

    /** 전파학습 학습일지 저장 */
    @RequestMapping("/campus/setStudyPropagInsert")
    public String setStudyPropagInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        campusService.setStudyPropagInsert(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 전파학습 학습일지 수정 */
    @RequestMapping("/campus/setStudyPropagModify")
    public String setStudyPropagModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        campusService.setStudyPropagModify(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 전파학습 학습일지 삭제 */
    @RequestMapping("/campus/setPropagDelete")
    public String setPropagDelete(@RequestParam Map<String, Object> params) {
        campusService.setPropagDelete(params);
        return "jsonView";
    }

    /** 전파학습 실제인정시간 저장 */
    @RequestMapping("/campus/setResultPropagUpd")
    public String setResultPropagUpd(@RequestParam Map<String, Object> params) {
        campusService.setResultPropagUpd(params);
        return "jsonView";
    }

    /** OJT 학습계획 저장 */
    @RequestMapping("/campus/setOjtPlanInsert")
    public String setOjtPlanInsert(@RequestParam Map<String, Object> params) {
        campusService.setOjtPlanInsert(params);
        return "jsonView";
    }

    /** OJT 학습계획 수정 */
    @RequestMapping("/campus/setOjtPlanUpdate")
    public String setOjtPlanUpdate(@RequestParam Map<String, Object> params) {
        campusService.setOjtPlanUpdate(params);
        return "jsonView";
    }

    /** OJT 학습계획 삭제 */
    @RequestMapping("/campus/setOjtPlanDelete")
    public String setOjtPlanDelete(@RequestParam Map<String, Object> params) {
        campusService.setOjtPlanDelete(params);
        return "jsonView";
    }

    /** OJT 학습일지 저장 */
    @RequestMapping("/campus/setOjtResultInsert")
    public String setOjtResultInsert(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request) {
        campusService.setOjtResultInsert(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** OJT 학습일지 수정 */
    @RequestMapping("/campus/setOjtResultModify")
    public String setOjtResultModify(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        campusService.setOjtResultModify(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /** 오픈스터디 등록 */
    @RequestMapping("/campus/setOpenStudyInfoIns")
    public String setOpenStudyInfoIns(@RequestParam Map<String, Object> params, Model model) {
        campusService.setOpenStudyInfoIns(params);
        model.addAttribute("pk", params.get("openStudyKey"));
        return "jsonView";
    }

    /** 오픈스터디 인정시간 체크*/
    @RequestMapping("/campus/getRealEduTimeCheck")
    public String getRealEduTimeCheck(@RequestParam Map<String, Object> params, Model model) {
        params.put("pk", params.get("pk"));
        List<Map<String, Object>> list = campusService.getRealEduTimeCheck(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 오픈스터디 인정시간 수정*/
    @RequestMapping("/campus/setOpenStudyRealEduTimeUpd")
    public String setOpenStudyRealEduTimeUpd(@RequestParam Map<String, Object> params) {
        campusService.setOpenStudyRealEduTimeUpd(params);
        return "jsonView";
    }

    /** 오픈스터디 수정 */
    @RequestMapping("/campus/setOpenStudyInfoUpd")
    public String setOpenStudyInfoUpd(@RequestParam Map<String, Object> params,Model model) {
        campusService.setOpenStudyInfoUpd(params);
        return "jsonView";
    }

    /** 오픈스터디 단계 진행 프로세스 */
    @RequestMapping("/campus/setOpenNextStep")
    public String setOpenNextStep(@RequestParam Map<String, Object> params) {
        campusService.setOpenNextStep(params);
        return "jsonView";
    }

    /**
     * 참여자 중복체크
     * @param params
     * @return
     */
    @RequestMapping("/campus/getOpenStudyUserDoubleChk")
    public String getOpenStudyUserDoubleChk(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", campusService.getOpenStudyUserDoubleChk(params));
        return "jsonView";
    }

    /** 오픈스터디 참여자 등록 */
    @RequestMapping("/campus/setOpenStudyUser")
    public String setOpenStudyUser(@RequestParam Map<String, Object> params) {
        campusService.setOpenStudyUser(params);
        return "jsonView";
    }

    /** 오픈스터디 결과보고서 등록 */
    @RequestMapping("/campus/setOpenStudyResultUpd")
    public String setOpenStudyResultUpd(@RequestParam Map<String, Object> params) {
        campusService.setOpenStudyResultUpd(params);
        return "jsonView";
    }

    /** 오픈스터디 결과보고서 승인프로세스 */
    @RequestMapping("/campus/setOpenStudyCertReq")
    public String setOpenStudyCertReq(@RequestParam Map<String, Object> params, Model model) {
        campusService.setOpenStudyCertReq(params);
        return "jsonView";
    }

    /** 공통학습 등록 */
    @RequestMapping("/campus/setCommonEduIns")
    public String setCommonEduIns(@RequestParam Map<String, Object> params) {
        campusService.setCommonEduIns(params);
        return "jsonView";
    }

    /** 공통학습 수정 */
    @RequestMapping("/campus/setCommonEduUpd")
    public String setCommonEduUpd(@RequestParam Map<String, Object> params) {
        campusService.setCommonEduUpd(params);
        return "jsonView";
    }

    /** 공통학습 전직원 추가 */
    @RequestMapping("/campus/setCommonEduAddUserAll")
    public String setCommonEduAddUserAll(@RequestParam Map<String, Object> params) {
        campusService.setCommonEduAddUserAll(params);
        return "jsonView";
    }

    /** 공통학습 직원데이터 업데이트 1. 이수처리 2. 미이수처리 3. 선택직원삭제 */
    @RequestMapping("/campus/setCommonEduUserUpd")
    public String setCommonEduUserUpd(@RequestParam Map<String, Object> params) {
        campusService.setCommonEduUserUpd(params);
        return "jsonView";
    }

    /** 공통학습 직원데이터 업데이트 1. 이수시간 */
    @RequestMapping("/campus/setCommonEduUserTimeUpd")
    public String setCommonEduUserTimeUpd(@RequestParam Map<String, Object> params) {
        campusService.setCommonEduUserTimeUpd(params);
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
    public String setDutyInfoIns(@RequestParam Map<String, Object> params, Model model) {
        campusService.setDutyInfoIns(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 캠퍼스 직무기술서 수정 */
    @RequestMapping("/campus/setDutyInfoUpd")
    public String setDutyInfoUpd(@RequestParam Map<String, Object> params) {
        campusService.setDutyInfoUpd(params);
        return "jsonView";
    }

    /** 목표기술서 승인프로세스 */
    @RequestMapping("/campus/setTargetCertReq")
    public String setTargetCertReq(@RequestParam Map<String, Object> params, Model model) {
        campusService.setTargetCertReq(params);
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

    /**
     * 단체학습신청서 결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/studyReqApp")
    public String studyReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updateStudyDocState(bodyMap);
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
     * 단체학습 학습조 결과보고서  결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/studyResReqApp")
    public String studyResReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updateStudyResDocState(bodyMap);
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
     * 전파학습 결과보고서  결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/propagResReqApp")
    public String propagResReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updatePropagResDocState(bodyMap);
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
     * OJT 결과보고서  결재 상태값에 따른 UPDATE 메서드
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/campus/ojtResReqApp")
    public String ojtResReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            campusService.updateOjtResDocState(bodyMap);
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

    @RequestMapping("/campus/pop/popSubjectMember.do")
    public String popSubjectMember(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("params", params);

        return "popup/campus/popSubjectMember";
    }

    @RequestMapping("/campus/deleteStudyJournal")
    public String deleteStudyJournal(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.deleteStudyJournal(params);
            model.addAttribute("code", 200);
            model.addAttribute("msg", "삭제되었습니다.");
        }catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setStudyInfoComplete")
    public String setStudyInfoComplete(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.setStudyInfoComplete(params);
            model.addAttribute("code", 200);
            model.addAttribute("msg", "학습이 완료되었습니다.");
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setPropagInfoComplete")
    public String setPropagInfoComplete(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.setPropagInfoComplete(params);
            model.addAttribute("code", 200);
            model.addAttribute("msg", "학습이 완료되었습니다.");
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/pop/resultDocPop.do")
    public String resultDocPop(@RequestParam Map<String, Object> params, Model model,HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        model.addAttribute("params", params);

        return "popup/campus/resultDocPop";
    }

    @RequestMapping("/campus/pop/resultOjtDocPop.do")
    public String resultOjtDocPop(@RequestParam Map<String, Object> params, Model model,HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        model.addAttribute("params", params);

        return "popup/campus/resultOjtDocPop";
    }

    @RequestMapping("/campus/pop/resultPropagDocPop.do")
    public String resultPropagDocPop(@RequestParam Map<String, Object> params, Model model,HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        Map<String, Object> data = campusService.getStudyInfoOne(params);
        model.addAttribute("data", data);
        model.addAttribute("params", params);

        return "popup/campus/resultPropagDocPop";
    }

    @RequestMapping("/campus/setStudyResultModify")
    public String setStudyResultModify(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setStudyResultModify(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setOjtOjtResultInsert")
    public String setOjtOjtResultInsert(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setOjtOjtResultInsert(params);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setOjtOjtResultModify")
    public String setOjtOjtResultModify(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setOjtOjtResultModify(params);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setStudyResult")
    public String setStudyResult(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setStudyResult(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setStudyResultY")
    public String setStudyResultY(@RequestParam Map<String, Object> params, Model model) {

        try{
            campusService.setStudyResultY(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/getStudyResultData")
    public String getStudyResultData(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> data = campusService.getStudyResultData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/campus/getStudyResultList")
    public String getStudyResultList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = campusService.getStudyResultList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/campus/deleteOjtResult")
    public String deleteOjtResult(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.deleteOjtResult(params);
            model.addAttribute("code", 200);
            model.addAttribute("msg", "삭제되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/campus/setStudyResultComplete")
    public String setStudyResultComplete(@RequestParam Map<String, Object> params, Model model) {
        try{
            campusService.setStudyResultComplete(params);
            model.addAttribute("code", 200);
            model.addAttribute("msg", "승인 요청되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** OJT 학습일지 단일 데이터  */
    @RequestMapping("/campus/getStudyOjtInfoOne")
    public String getStudyOjtInfoOne(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getStudyOjtInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/campus/getOjtOjtResultCount")
    public String getOjtOjtResultCount(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> data = campusService.getOjtOjtResultCount(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/campus/dutyInfoLeader.do")
    public String dutyInfoLeader(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/dutyInfoLeader";
    }

    @RequestMapping("/campus/getEmpTeamOrDept")
    public String getEmpTeamOrDept(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("data", campusService.getEmpTeamOrDept(params));

        return "jsonView";
    }

    /**
     * 캠퍼스 개인학습현황 리스트 페이지
     */
    @RequestMapping("/cmapus/eduInfoHist.do")
    public String eduInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/eduInfoHist";
    }
    /**
     * 캠퍼스 학습조 리스트 페이지
     */
    @RequestMapping("/cmapus/studyInfoHist.do")
    public String studyInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/studyInfoHist";
    }
    /**
     * 캠퍼스 전파학습 리스트 페이지
     */
    @RequestMapping("/cmapus/propagInfoHist.do")
    public String propagInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/propagInfoHist";
    }
    /**
     * 캠퍼스 OJT 리스트 페이지
     */
    @RequestMapping("/cmapus/ojtInfoHist.do")
    public String ojtInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/ojtInfoHist";
    }
    /**
     * 캠퍼스 오픈스터디 리스트 페이지
     */
    @RequestMapping("/cmapus/openstudyInfoHist.do")
    public String openstudyInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/openstudyInfoHist";
    }
    /**
     * 캠퍼스 공통학습 리스트 페이지
     */
    @RequestMapping("/cmapus/commonEduInfoHist.do")
    public String commonEduInfoHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/commonEduInfoHist";
    }
    /**
     * 캠퍼스 직원학습관리이력 리스트 페이지
     */
    @RequestMapping("/cmapus/eduInfoMngHist.do")
    public String eduInfoMngHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/eduInfoMngHist";
    }
    /**
     * 캠퍼스 공통학습관리 리스트 페이지
     */
    @RequestMapping("/cmapus/commonEduInfoMngHist.do")
    public String commonEduInfoMngHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "campus/hist/commonEduInfoMngHist";
    }
    @RequestMapping("/campus/getEduInfoHistList")
    public String getEduInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getEduInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getStudyInfoHistList")
    public String getStudyInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getStudyInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getPropagInfoHistList")
    public String getPropagInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getPropagInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getOjtInfoHistList")
    public String getOjtInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getOjtInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getOpenstudyInfoHistList")
    public String getOpenstudyInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getOpenstudyInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getCommonEduInfoHistList")
    public String getCommonEduInfoHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getCommonEduInfoHistList(params));
        return "jsonView";
    }
    @RequestMapping("/campus/getOpenstudyInfoMngHistList")
    public String getOpenstudyInfoMngHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", campusService.getOpenstudyInfoMngHistList(params));
        return "jsonView";
    }
}
