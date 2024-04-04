package egovframework.com.devjitsu.inside.recruit.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.utiles.AESCipher;
import egovframework.com.devjitsu.doc.config.EgovFileScrty;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Controller
public class RecruitController {

    private static final Logger logger = LoggerFactory.getLogger(RecruitController.class);

    @Autowired
    private UserManageService userManageService;

    @Autowired
    private RecruitService recruitService;

    @Autowired
    private EvalManageService evalManageService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    /**
     * 채용관리 리스트 페이지(관리자)
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
     * 채용관리 리스트 페이지(팀장)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/recruitListTl.do")
    public String recruitListTl(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/recruitListTl";
    }

    /**
     * 채용관리 리스트 페이지(평가위원)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/recruitListEval.do")
    public String recruitListEval(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/recruitListEval";
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
        //System.out.println("컨트롤러 채용 리스트 목록" + list);
        return "jsonView";
    }

    /**
     * 채용공고 삭제
     * @param params
     * @return
     */
    @RequestMapping("/inside/setRecruitDel.do")
    public String setRecruitDel(@RequestParam Map<String,Object> params) {
        recruitService.setRecruitDel(params);
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
     * 채용공고 분야 단일 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getUserInfoByApplication")
    public String getUserInfoByApplication(@RequestParam Map<String,Object> params, Model model) {
        Map<String, Object> data = recruitService.getUserInfoByApplication(params);
        model.addAttribute("data", data);
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

        Object recruitInfoSnObj = params.get("recruitInfoSn");
        Integer recruitInfoSn = null;

        if (recruitInfoSnObj instanceof Integer) {
            recruitInfoSn = (Integer) recruitInfoSnObj;
        } else if (recruitInfoSnObj instanceof String) {
            try {
                recruitInfoSn = Integer.parseInt((String) recruitInfoSnObj);
            } catch (NumberFormatException e) {
                // 처리할 수 없는 문자열인 경우 예외처리
            }
        }

        System.out.println("******recruitInfoSn******* : " + recruitInfoSn);
        Map<String, Object> resultMap = new HashMap<>(params);
        resultMap.put("recruitInfoSn", recruitInfoSn);

        List<Map<String, Object>> recruitAreaList = recruitService.getRecruitAreaList(resultMap);
        System.out.println("******recruitAreaList******* : " + recruitAreaList);

        processRecruitAreaList(recruitInfoSn, recruitAreaList);

        return "jsonView";
    }

    private void processRecruitAreaList(Integer recruitInfoSn, List<Map<String, Object>> recruitAreaList) {
        Map<String, Object> newMap = new HashMap<>();
        newMap.put("tempDivision", "N");
        newMap.put("recruitInfoSn", recruitInfoSn);

        for (Map<String, Object> area : recruitAreaList) {
            processRecruitArea(newMap, area);
        }
    }

    private void processRecruitArea(Map<String, Object> newMap, Map<String, Object> area) {
        //String deptName = (String) area.get("DEPT_NAME");

        Integer recruitAreaInfoSn = (Integer) area.get("RECRUIT_AREA_INFO_SN");
        Integer recruitInfoSn = (Integer) area.get("RECRUIT_INFO_SN");
        String deptSeq = (String) area.get("DEPT_SEQ");
        String teamSeq = (String) area.get("TEAM_SEQ");
        //System.out.println("DEPT_NAME: " + deptName);
        System.out.println("DEPT_SEQ: " + deptSeq);
        System.out.println("TEAM_SEQ: " + teamSeq);
        System.out.println("RECRUIT_AREA_INFO_SN: " + recruitAreaInfoSn);
        System.out.println("RECRUIT_INFO_SN: " + recruitInfoSn);

        //newMap.put("deptName", deptName);
        newMap.put("recruitAreaInfoSn", recruitAreaInfoSn);
        newMap.put("deptSeq", deptSeq);
        newMap.put("teamSeq", teamSeq);

        System.out.println("******newMap******* : " + newMap);

        List<Map<String, Object>> matchingDeptMaps = getMatchingDeptMaps(newMap);

        processMatchingDeptMaps(recruitInfoSn, recruitAreaInfoSn, matchingDeptMaps);
    }

    private List<Map<String, Object>> getMatchingDeptMaps(Map<String, Object> newMap) {
        List<Map<String, Object>> newListMap = recruitService.getCommissionerList(newMap);
        newMap.put("authorityGroupId", "18");
        List<Map<String, Object>> recruitMngList = menuManagementRepository.getAuthorityGroupUserList(newMap);  // 메뉴권한 - 채용관리자
        List<Map<String, Object>> allMatchingDeptMaps = new ArrayList<>();

        for (Map<String, Object> commissionerMap : newListMap) {
            String commissionerDeptSeq = (String) commissionerMap.get("DEPT_SEQ");
            String commissionerDutyName = (String) commissionerMap.get("DUTY_NAME");
            String commissionerPDeptName = (String) commissionerMap.get("PARENT_DEPT_SEQ");

            if ("1221".equals(commissionerDeptSeq) && "팀장".equals(commissionerDutyName)) {
                allMatchingDeptMaps.add(commissionerMap);
                System.out.println("********allMatchingDeptMaps******* :" + allMatchingDeptMaps);
            }

            // 메뉴권한 - 채용관리자
            for(Map<String, Object> mngMap : recruitMngList) {
                if(commissionerMap.get("EMP_SEQ").toString().equals(mngMap.get("EMP_SEQ"))) {
                    allMatchingDeptMaps.add(commissionerMap);
                    System.out.println("********allMatchingDeptMaps******* :" + allMatchingDeptMaps);
                }
            }

            if (comparatorMatches(commissionerDeptSeq, newMap.get("deptSeq"))) {
                if ("본부장".equals(commissionerDutyName)) {
                    allMatchingDeptMaps.add(commissionerMap);
                    System.out.println("********allMatchingDeptMaps******* :" + allMatchingDeptMaps);
                }
            } else if (comparatorMatches(commissionerDeptSeq, newMap.get("teamSeq"))) {
                // TEAM_SEQ와 비교
                if ("팀장".equals(commissionerDutyName) || "센터장".equals(commissionerDutyName)) {
                    allMatchingDeptMaps.add(commissionerMap);
                    System.out.println("********allMatchingDeptMaps******* :" + allMatchingDeptMaps);
                }
            }
        }

        return allMatchingDeptMaps;
    }
    // 값을 비교하기 위한 메서드
    private boolean comparatorMatches(String value1, Object value2) {
        return value1 != null && value1.equals(value2);
    }

    private void processMatchingDeptMaps(Integer recruitInfoSn, Integer recruitAreaInfoSn, List<Map<String, Object>> matchingDeptMaps) {
        for (Map<String, Object> matchingDeptMap : matchingDeptMaps) {
            Integer empSeq = (Integer) matchingDeptMap.get("EMP_SEQ");
            System.out.println("**********emp_seq******** : " +empSeq);
            processEvalSelection(recruitInfoSn, recruitAreaInfoSn, empSeq, "doc");
            processEvalSelection(recruitInfoSn, recruitAreaInfoSn, empSeq, "in");
        }
    }

    private void processEvalSelection(Integer recruitInfoSn, Integer recruitAreaInfoSn, Integer empSeq, String evalType) {
        Map<String, Object> evalSelectionParams = new HashMap<>();
        evalSelectionParams.put("recruitInfoSn", recruitInfoSn);
        evalSelectionParams.put("recruitAreaInfoSn", recruitAreaInfoSn);
        evalSelectionParams.put("evalType", evalType);
        evalSelectionParams.put("empSeq", empSeq);
        evalSelectionParams.put("evalEmpSeq", empSeq);

        String result = evalManageService.setEvalSelection(evalSelectionParams);
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
        model.addAttribute("recruit", recruitService.getRecruit(params));

        return "popup/inside/recruit/recruitAdminPop";
    }

    /**
     * 채용공고 공고상태변경
     * @param params
     * @return
     */
    @RequestMapping("/inside/setRecruitStatusUpd.do")
    public String setRecruitStatusUpd(@RequestParam Map<String,Object> params) {
        recruitService.setRecruitStatusUpd(params);
        return "jsonView";
    }

    /**
     * 채용공고 모집분야 리스트
     * @param params
     * @return
     */
    @RequestMapping("/inside/getRecruitAreaList.do")
    public String getRecruitAreaList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("recruitArea", recruitService.getRecruitAreaList(params));
        return "jsonView";
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
     * 응시자 상세보기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/applicationView.do")
    public String applicationView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("data", recruitService.getApplication(params));

        return "popup/inside/recruit/applicationView";
    }

    @RequestMapping("/inside/applicationViewRegrid")
    public String applicationViewRegrid(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("data", recruitService.getApplication(params));

        return "jsonView";
    }


    /**
     * 채용공고 응시자 중복지원 리스트 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/duplicationPop.do")
    public String duplicationPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/recruit/duplicationPop";
    }

    /**
     * 중복지원 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getUserDuplicationList.do")
    public String getUserDuplicationList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", recruitService.getUserDuplicationList(params));
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
    @RequestMapping("/inside/pop/screenViewPop.do")
    public String screenViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("recruit", recruitService.getRecruit(params));

        return "popup/inside/recruit/screenViewPop";
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
        model.addAttribute("recruit", recruitService.getRecruit(params));

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
    @RequestMapping("/inside/pop/selEvalPop.do")
    public String selInEvalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("recruit", recruitService.getRecruit(params));

        return "popup/inside/recruit/selEvalPop";
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
     * 채용공고관리 응시원서 예비합격자 선정
     * @param params
     * @return
     */
    @RequestMapping("/inside/setPrePassAppl.do")
    public String setPrePassAppl(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        recruitService.setPrePassAppl(params);
        return "jsonView";
    }


    /**
     * 채용관리 리스트 페이지(평가위원)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/recruitEvalSel.do")
    public String recruitEvalSel(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/recruitEvalSel";
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

    @RequestMapping("/inside/getCommissionerListCustom")
    public String getCommissionerListCustom(@RequestParam Map<String,Object> params, Model model) {
        List<Map<String, Object>> list = recruitService.getCommissionerListCustom(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /**
     * 평가위원 등록양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/inside/evalSetExcelFormDown.do")
    public void evalSetExcelFormDown(HttpServletRequest request, HttpServletResponse response){
        recruitService.evalSetExcelFormDown(request, response);
    }

    /**
     * 평가위원 엑셀업로드 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/evalExcelUploadPop.do")
    public String evalExcelUploadPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/evalExcelUploadPop";
    }

    /**
     * 평가위원 엑셀 업로드 데이터
     * @param params
     * @return
     */
    @RequestMapping("/inside/evalExcelUploadData.do")
    public String evalExcelUploadData(@RequestParam Map<String,Object> params, MultipartHttpServletRequest request, Model model) throws Exception {
        model.addAttribute("list", recruitService.evalExcelUploadData(params, request));
        return "jsonView";
    }

    /**
     * 평가위원 엑셀 업로드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setEvalExcelUploadData.do")
    public String setEvalExcelUploadData(@RequestParam Map<String, Object> params, Model model) throws Exception{
        recruitService.setEvalExcelUploadData(params);
        return "jsonView";
    }

    /**
     * 평가위원 평가이력 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/evalHistoryPop.do")
    public String evalHistoryPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("empInfo", userManageService.getUserPersonnelinformList(params));
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/evalHistoryPop";
    }

    /**
     * 평가위원 평가이력 리스트 ( 평균 값 )
     * @param params
     * @return
     */
    @RequestMapping("/inside/getEvalHistoryList.do")
    public String getEvalHistoryList(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("list", recruitService.getEvalHistoryList(params));
        return "jsonView";
    }

    /**
     * 평가위원 삭제
     * @param params
     * @return
     */
    @RequestMapping("/inside/setCommissionerEmpInfoDel")
    public String setCommissionerDel(@RequestParam Map<String,Object> params) {
        recruitService.setCommissionerEmpInfoDel(params);
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
     * 평가위원 비밀번호 초기화
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setCommissionerPassWdUpd.do")
    public String setCommissionerPassWdUpd(@RequestParam Map<String, Object> params, Model model) throws Exception{
        userManageService.setCommissionerPassWdUpd(params);
        return "jsonView";
    }


    /**
     * 평가위원 상세보기
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/commissionerInfoPop.do")
    public String commissionerInfoPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("data", userManageService.getUserPersonnelinformList(params));
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/commissionerInfoPop";
    }

    /**
     * 평가위원 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setCommissionerEmpInfo")
    public String setCommissionerEmpInfo(@RequestParam Map<String, Object> params, Model model) throws Exception{
        String inputLoginId = params.get("LOGIN_ID").toString() + params.get("userIdSub1").toString() + params.get("userIdSub2").toString();
        Boolean completeKeyFlag = false;
        params.put("LOGIN_ID", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
        params.put("LOGIN_PASSWD", passwordEncrypt(replacePasswd(AESCipher.AES128SCRIPT_Decode(params.get("LOGIN_PASSWD").toString(), completeKeyFlag))));
        params.put("loginId", params.get("LOGIN_ID"));

        recruitService.setEvalEmpInfo(params);
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

    public static String passwordEncrypt(String userPassword) throws Exception {
        if(userPassword != null && !userPassword.equals("")){
            return EgovFileScrty.encryptPassword(userPassword);
        }else{
            return "";
        }
    }

    public String replacePasswd(String str){
        if(str.indexOf("&nbsp;") != -1) {
            str = str.replaceAll("&nbsp;", " ");}
        if(str.indexOf("&amp;") != -1) {
            str = str.replaceAll("&amp;", "&");}
        if(str.indexOf("&lt;") != -1) {
            str = str.replaceAll("&lt;", "<");}
        if(str.indexOf("&gt;") != -1) {
            str = str.replaceAll("&gt;", ">");}
        if(str.indexOf("&quot;") != -1) {
            str = str.replaceAll("&quot;", "\"");}
        return str;
    }

    @RequestMapping("/Inside/pop/recruitPrintPop.do")
    public String recruitPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
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


        return "popup/inside/recruit/recruitPrintPop";
    }

    @RequestMapping("/Inside/pop/applicationPrintPop.do")
    public String applicationPrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
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


        return "popup/inside/recruit/applicationPrintPop";
    }

    @RequestMapping("/inside/getRecruitPrint")
    public String getRecruitPrint(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("list", recruitService.getRecruitPrint(params));
        return "jsonView";
    }

    @RequestMapping("/inside/getRecruitPrintTitle")
    public String getRecruitPrintTitle(@RequestParam Map<String,Object> params, Model model) {
        Map<String, Object> recruitPrintTitle = recruitService.getRecruitPrintTitle(params);
        model.addAttribute("recruitPrintTitle", recruitPrintTitle);
        return "jsonView";
    }


    @RequestMapping("/inside/insRecruitMember")
    public String insRecruitMember(@RequestParam Map<String,Object> params, Model model) {

        try{
            recruitService.insRecruitMember(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/inside/insRecruitMemberDelete")
    public String insRecruitMemberDelete(@RequestParam Map<String,Object> params, Model model) {

        try{
            recruitService.insRecruitMemberDelete(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 채용공고 전자결재 관리 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/recruitDraftingPop.do")
    public String recruitDrafting(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/recruit/recruitDraftingPop";
    }

    /** 채용 전자결재 팝업*/
    @RequestMapping("/popup/inside/approvalFormPopup/recruitApprovalPop.do")
    public String recruitApprovalPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/inside/recruit/approvalFormPopup/recruitApprovalPop";
    }

    /** 채용 전자결재 팝업*/
    @RequestMapping("/popup/inside/approvalFormPopup/recruitOfficialApprovalPop.do")
    public String recruitOfficialApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "popup/inside/recruit/approvalFormPopup/recruitOfficialApprovalPop";
    }

    /**
     * 채용 > 예산변경 및 반납 전자결재 리스트 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getDraftingList")
    public String getDraftingList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", recruitService.getDraftingList(params));
        return "jsonView";
    }

    /** 채용 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/inside/recruitReqApp")
    public String changeReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            recruitService.updateDraftDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/inside/pop/recruitReqStatPop.do")
    public String recruitReqStatPop(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/inside/recruit/recruitReqStatPop";
    }

    @RequestMapping("/inside/setRecruitUpd.do")
    public String setRecruitUpd(@RequestParam Map<String,Object> params) {
        recruitService.setRecruitUpdate(params);
        return "jsonView";
    }

    @RequestMapping("/inside/pop/applicationReg.do")
    public String applicationRegPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        System.out.println("params : " + params);
        Object recruitValue = params.get("recruitAreaInfoSn");
        Object appValue = params.get("applicationId");

        Map <String,Object> recruitAreaInfoSn = new HashMap<>();
        recruitAreaInfoSn.put("recruitAreaInfoSn",recruitValue);
        Map <String,Object> applicationId =new HashMap<>();
        applicationId.put("applicationId",appValue);

        Map <String,Object> recruitArea = recruitService.getRecruitArea(recruitAreaInfoSn);
        Map <String,Object> applicationInfo = recruitService.getApplication(applicationId);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("recruitArea",recruitArea);
        model.addAttribute("applicationInfo",applicationInfo);

        return "popup/inside/recruit/applicationReg";
    }

    @RequestMapping("/inside/applicationCareer")
    public String getApplicationCareer(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("career",recruitService.getApplicationCareer(params));
        return "jsonView";
    }

    /**채용 합격자 인사 등록**/
    @RequestMapping("/inside/setApplicationtoUser.do")
    public String setApplicationtoUser(@RequestParam Map<String, Object> params,HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("regEmpSeq", loginVO.getUniqId());

        Object appId = params.get("applicationId");

        Map<String,Object> applicationId = new HashMap<>();
        applicationId.put("applicationId",appId);

        Map <String,Object> applicationInfo = recruitService.getApplication(applicationId);
        applicationInfo.put("applicationId", applicationInfo.get("applicationId"));
        params.remove("applicationId");


        applicationInfo.putAll(params);
        applicationInfo.put("LOGIN_PASSWD","1");

        applicationInfo.put("EMP_NAME_KR",applicationInfo.get("USER_NAME"));
        applicationInfo.put("EMP_NAME_EN",applicationInfo.get("USER_NAME_EN"));
        applicationInfo.put("EMP_NAME_CN",applicationInfo.get("USER_NAME_CN"));
        applicationInfo.put("LUNAR_CAL",applicationInfo.get("LUNAR_YN"));
        applicationInfo.put("OFFICE_TEL_NUM",applicationInfo.get("TEL_NUM"));
        applicationInfo.put("EMAIL_ADDR",applicationInfo.get("USER_EMAIL"));
        applicationInfo.put("genderCode",applicationInfo.get("GENDER"));
        applicationInfo.put("SPECIALITY",applicationInfo.get("SPECIALTY"));

        applicationInfo.remove("introduce");
        applicationInfo.remove("QUALIFICATION");

        System.out.println("****edit applicationInfo****"+applicationInfo);

        userManageService.setUserReqDetailInsert(applicationInfo);
        Object empSeq = applicationInfo.get("empSeq");
        System.out.println("empSeq : " +empSeq);

        //학력
        Object schoolObject = applicationInfo.get("school");
        if (schoolObject != null && !((List<?>) schoolObject).isEmpty()) {
            List<Map<String, Object>> schoolList = convertToMapList(schoolObject);
            System.out.println("schoolList : " + schoolList);
            for (Map<String, Object> schoolData : schoolList) {
                System.out.println(schoolData);

                schoolData.put("EMP_SEQ",empSeq);
                schoolData.put("EMP_NAME",applicationInfo.get("USER_NAME"));
                schoolData.put("REG_EMP_SEQ", loginVO.getUniqId());
                schoolData.put("SCHOOL_NAME", schoolData.get("SCHOOL_NAME")+ " " +schoolData.get("MAJOR"));

                Map<String,Object> resultMap = classifySchoolData(schoolData);

                resultMap.put("DEGREE_CODE","B0204");


                userManageService.setEduReqDetailInsert(resultMap);
            }
        }

        //경력
        Object careerObject = applicationInfo.get("career");
        if (careerObject != null && !((List<?>) careerObject).isEmpty()) {
            List<Map<String, Object>> careerList = convertToMapList(careerObject);
            System.out.println("careerList : " + careerList);
            for (Map<String, Object> careerData : careerList) {
                System.out.println(careerData);

                careerData.put("EMP_SEQ",empSeq);
                careerData.put("EMP_NAME",applicationInfo.get("USER_NAME"));
                careerData.put("REG_EMP_SEQ", loginVO.getUniqId());

                Map<String,Object> resultMap = careerPeriod(careerData);
                System.out.println("***resultMap***"+resultMap);
                userManageService.setCareerReqDetailInsert(resultMap);


            }
        }

        //자격증
        Object certObject = applicationInfo.get("cert");
        if (certObject != null && !((List<?>) certObject).isEmpty()) {
            List<Map<String, Object>> certList = convertToMapList(certObject);
            System.out.println("certList : " +certList);
            for (Map<String, Object> certData : certList) {
                System.out.println(certData);

                certData.put("EMP_SEQ",empSeq);
                certData.put("EMP_NAME",applicationInfo.get("USER_NAME"));
                certData.put("REG_EMP_SEQ", loginVO.getUniqId());
                certData.put("ACQUISITION_DAY", "-");

                userManageService.setCertReqDetailInsert(certData);
            }
        }

        //언어
        Object langObject = applicationInfo.get("lang");
        if (langObject != null && !((List<?>) langObject).isEmpty()) {
            List<Map<String, Object>> langList = convertToMapList(langObject);
            System.out.println(" langList : " + langList);
            for (Map<String, Object> langData :  langList) {
                System.out.println(langData);

                langData.put("EMP_SEQ",empSeq);
                langData.put("EMP_NAME",applicationInfo.get("USER_NAME"));
                langData.put("REG_EMP_SEQ", loginVO.getUniqId());
            }
        }

        return "jsonView";
    }

    private static List<Map<String, Object>> convertToMapList(Object object) {
        List<Map<String, Object>> resultList = new ArrayList<>();

        if (object instanceof List<?>) {
            List<?> objectList = (List<?>) object;

            for (Object objectItem : objectList) {
                if (objectItem instanceof Map<?, ?>) {
                    @SuppressWarnings("unchecked")
                    Map<String, Object> data = (Map<String, Object>) objectItem;
                    resultList.add(new HashMap<>(data));
                }
            }
        }

        return resultList;
    }

    private static Map<String,Object> classifySchoolData(Map<String,Object> map){
        Map<String,Object> resultMap = map;

        resultMap.put("ADMISSION_DAY",map.get("ADMISSION_DT"));
        resultMap.put("GRADUATION_DAY",map.get("GRADUATION_DT"));
        resultMap.put("SCORE",map.get("GRADE"));
        resultMap.put("GRADE_NO",map.get("DEGREE_FILE"));
        resultMap.put("SCORE_NO",map.get("SEXUAL_FILE"));


        Object schoolType = map.get("SCHOOL_TYPE");
        Object graduateType = map.get("GRADUATE_TYPE");

        //고등학교
        if (schoolType != null && "1".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0102");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","undefined");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","undefined");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","undefined");
            }
        }
        //전문대학
        if (schoolType != null && "2".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0103");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","B0201");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","undefined");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","undefined");
            }
        }
        //대학1
        if (schoolType != null && "3".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0104");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","B0202");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","undefined");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","undefined");
            }
        }
        //대학2
        if (schoolType != null && "4".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0104");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","B0202");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","undefined");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","undefined");
            }
        }
        //대학원(석사)
        if (schoolType != null && "5".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0105");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","B0203");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","B0202");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","B0202");
            }
        }
        //대학원(박사)
        if (schoolType != null && "6".equals(schoolType.toString())) {
            resultMap.put("GUBUN_CODE", "B0106");
            if(graduateType != null && "1".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0301");
                resultMap.put("DEGREE_CODE","B0204");
            }else if("2".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0302");
                resultMap.put("DEGREE_CODE","B0203");
            }else if("3".equals(graduateType.toString())){
                resultMap.put("GRADUATION_CODE","B0303");
                resultMap.put("DEGREE_CODE","B0203");
            }
        }


        return resultMap;
    }

    private static Map<String,Object> careerPeriod(Map<String,Object> map){
        Map<String,Object> resultMap = map;

        Object startWorkDate = map.get("WORK_ST_DT");
        Object endWorkDate = map.get("WORK_EN_DT");

        if (startWorkDate instanceof String && endWorkDate instanceof String) {

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

            LocalDate startDate = LocalDate.parse((String) startWorkDate, formatter);
            LocalDate endDate = LocalDate.parse((String) endWorkDate, formatter);
            YearMonth startYearMonth = YearMonth.from(startDate);
            YearMonth endYearMonth = YearMonth.from(endDate);

            long yearsWorked = ChronoUnit.YEARS.between(startYearMonth.atDay(1), endYearMonth.atDay(1));
            long monthsWorked = ChronoUnit.MONTHS.between(startYearMonth, endYearMonth) % 12;

            System.out.println("근무 년 수: " + yearsWorked);
            System.out.println("근무 개월 수: " + monthsWorked);

            resultMap.put("CAREER_PERIOD",yearsWorked);
            resultMap.put("CAREER_MONTH",monthsWorked);
        } else {
            System.out.println("날짜 형식이 아닌 데이터가 포함되어 있습니다.");
        }

        return resultMap;
    }
    @RequestMapping("/inside/recruitTmpAgreePop")
    public String openRecruitTmpAgree (){
        return "popup/inside/recruit/recruitTmpAgreePop";
    }

    @RequestMapping("/inside/recruitTmpForm.do")
    public String openRecruitTmpForm(@RequestParam Map<String, Object> params, Model model){
        System.out.println("params :" +params);
        model.addAttribute("params",params);
        return "popup/inside/recruit/recruitTmpform";
    }

    /**
     * 채용이력 리스트 페이지(평가위원)
     */
    @RequestMapping("/recruitHist/recruitHist.do")
    public String recruitHist(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/recruitHist";
    }
    @RequestMapping("/inside/getRecruitHistList")
    public String getRecruitHistList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", recruitService.getRecruitHistList(params));
        return "jsonView";
    }

}
