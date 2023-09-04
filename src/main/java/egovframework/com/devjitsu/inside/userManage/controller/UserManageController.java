package egovframework.com.devjitsu.inside.userManage.controller;

import com.google.gson.Gson;
import dev_jitsu.MainLib;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserManageController {

    private static final Logger logger = LoggerFactory.getLogger(UserManageController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private UserManageService userManageService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /**
     * 인사관리(관리자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/userPersonList.do")
    public String userPersonList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userPersonList";
    }

    /**
     * 인사관리(사용자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/userPersonList2.do")
    public String userPersonList2(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userPersonList2";
    }

    private static void menuSession(HttpServletRequest request, HttpSession session) {
        session.setAttribute("menuNm", request.getRequestURI());
    }

    /**
     * 인사기록카드(사용자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/userPersonnelRecord.do")
    public String userPersonnelRecord(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        menuSession(request, session);

        Map<String,Object> map = new HashMap<>();
        if(!StringUtils.isEmpty(params.get("admin")) && !StringUtils.isEmpty(params.get("empSeq"))){
            map.put("empSeq", params.get("empSeq"));
        }else{
            map.put("empSeq", login.getUniqId());
        }

        Map<String,Object> userPersonnelRecordList = userManageService.getUserPersonnelRecordList(map);
        List<Map<String,Object>> educationalList = userManageService.getEducationalList(map);
        Map<String,Object> militarySvcInfo = userManageService.getMilitarySvcInfo(map);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("uprList", userPersonnelRecordList);
        model.addAttribute("eList", educationalList);
        model.addAttribute("mInfo", militarySvcInfo);



        model.addAttribute("cList", userManageService.getCareerInfoList(map));
        model.addAttribute("fList", userManageService.getFamilyInfoList(map));
        model.addAttribute("lList", userManageService.getLicenceInfoList(map));
        model.addAttribute("aList", userManageService.getAppointInfoList(map));
        model.addAttribute("rList", userManageService.getRewardInfoList(map));
        model.addAttribute("dList", userManageService.getDutyInfoList(map));
        model.addAttribute("pList", userManageService.getProposalInfoList(map));
        /*model.addAttribute("RewordList", userManageService.getReward2InfoList(map));*/

        return "inside/userManage/userPersonnelRecord";
    }

    /**
     * 직원 개인 기본정보 수정
     * @param params
     * @return
     */
    @RequestMapping("/inside/setBasicInfo.do")
    public String setBasicInfo(@RequestParam Map<String,Object> params) {
        userManageService.setBasicInfo(params);
        return "jsonView";
    }

    /**
     * 인사관리 직원 정보 조회 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewPop.do")
    public String userViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewPop";
    }

    /**
     * 인사관리 직원 정보 조회 팝업2 - 인사관리(사용자)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewPop2.do")
    public String userViewPop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewPop2";
    }

    /**
     * 인사관리 직원 정보 등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userReqPop.do")
    public String userReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);

        return "popup/inside/userManage/userReqPop";
    }

    /**
     * 인사관리 직원 퇴사처리 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/userResignRegPop.do")
    public String userResignRegPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", login);
        model.addAttribute("empInfo", userManageService.getUserPersonnelinformList(params));

        return "popup/inside/userManage/userResignRegPop";
    }

    /**
     * 인사관리 직원 퇴사처리
     * @param map
     * @return
     */
    @RequestMapping("/userManage/setUserResignReg.do")
    public String setUserResignReg(@RequestParam Map<String,Object> map) {
        userManageService.setUserResignReg(map);
        return "jsonView";
    }

    /**
     * 인사관리 직원 삭제처리
     * @param map
     * @return
     */
    @RequestMapping("/userManage/setUserDel.do")
    public String setUserDel(@RequestParam Map<String,Object> params) {
        userManageService.setUserDel(params);
        return "jsonView";
    }

    /**
     * 인사관리 직원 정보 조회 - 계좌정보 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userAccountPop.do")
    public String userAccountPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userAccountPop";
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/pop/userReqPopImage.do")
    public String userReqPopImage(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("data", userManageService.getUserImageList(params));

        return "popup/inside/userManage/userReqPopImage";
    }

    //성과결과조회 페이지
    @RequestMapping("/Inside/performanceResultList.do")
    public String performanceResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/performanceResultList";
    }

    /**
     * 인사정보변경신청(관리자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/userInfoMod.do")
    public String userInfoMod(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userInfoMod";
    }

    /**
     * 인사정보변경신청(관리자) 리스트
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/userManage/getPersonRecordApplyList")
    public String getPersonRecordApplyList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("list", userManageService.getPersonRecordApplyList(map));
        return "jsonView";
    }

    /**
     * 인사정보변경신청(사용자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/userInfoModReg.do")
    public String userInfoModReg(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        return "inside/userManage/userInfoModReg";
    }

    /**
     * 인사정보변경신청(사용자) 리스트
     * @param map
     * @param model
     * @return
     */
    @RequestMapping("/userManage/getPersonRecordApplyList2")
    public String getPersonRecordApplyList2(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("list", userManageService.getPersonRecordApplyList2(map));
        return "jsonView";
    }

    /**
     * 연봉근로계약서(사용자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/employmentReq.do")
    public String employmentReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        return "inside/userManage/employmentReq";
    }

    /**
     * 연봉근로계약서(관리자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/employmentManage.do")
    public String employmentManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/employmentManage";
    }

    /**
     * 연봉근로계약서 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/userManage/getEmploymentContList.do")
    public String getEmploymentContList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", userManageService.getEmploymentContList(params));
        return "jsonView";
    }

    /**
     * 연봉근로계약서 작성(관리자)
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/employmentReqPop.do")
    public String employmentReqPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/employ/employmentReqPop";
    }

    /**
     * 연봉근로계약서 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/userManage/setEmploymentContract.do")
    public String setEmploymentContract(@RequestParam Map<String, Object> params, Model model){
        userManageService.setEmploymentContract(params);
        return "jsonView";
    }

    /**
     * 연봉근로계약서 발송
     * @param params
     * @return
     */
    @RequestMapping("/userManage/sendSalaryWorkerReq.do")
    public String sendSalaryRWorkerReq(@RequestParam(value = "sendArr[]") List<String> params){
        userManageService.sendSalaryWorkerReq(params);
        return "jsonView";
    }

    /**
     * 연봉근로계약서 보기 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/pop/employmentPop.do")
    public String employmentPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", new Gson().toJson((LoginVO) session.getAttribute("LoginVO")));

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }
        params.put("hwpUrl", hwpUrl);
        params.put("menuCd", "employment");

        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));

        return "popup/inside/employ/employmentPop";
    }

    /**
     * 연봉근로계약서 데이터 조회
     * @param params
     * @return
     */
    @RequestMapping("/userManage/getEmploymentInfo.do")
    public String getEmploymentInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", userManageService.getEmploymentInfo(params));
        return "jsonView";
    }

    @RequestMapping("/userManage/setEmploymentInfoFlag.do")
    public String setEmploymentInfoFlag(@RequestParam Map<String, Object> params){
        userManageService.setEmploymentInfoFlag(params);
        return "jsonView";
    }


    //연봉계약서 페이지
    @RequestMapping("/Inside/agreementReq.do")
    public String agreementReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/agreementReq";
    }

    //캠스팟메뉴 이미지관리
    @RequestMapping("/Inside/imageManage.do")
    public String imageManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        Map<String, Object> params = new HashMap<>();
        params.put("empSeq", login.getUniqId());

        model.addAttribute("menuCd", request.getServletPath().split("/")[1]);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("data", userManageService.getUserImageList(params));
        return "inside/userManage/imageManage";
    }

    @RequestMapping("/Inside/pop/sign/popDrawSignView.do")
    public String popDrawSignView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/userManage/popDrawSignView";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }
    //학력사항 수정 팝업 내용
    @RequestMapping("/userManage/getEduinfoList.do")
    public String getEduinfoList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("rs", userManageService.getEduinfoList(map));
        return "jsonView";
    }

    @RequestMapping("/useManage/userPersonnelRecordPop.do")
    public String userPersonnelRecordEduAddPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        String viewName = "";

        model.addAttribute("params", params);
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        switch(params.get("popName").toString()) {
            case "degree":
                viewName = "popup/inside/userManage/userPersonnelRecordDegreePop"; break;
            case "career":
                viewName = "popup/inside/userManage/userPersonnelRecordCareerPop"; break;
            case "military":
                viewName = "popup/inside/userManage/userPersonnelRecordMilitaryPop"; break;
            case "family":
                viewName = "popup/inside/userManage/userPersonnelRecordFamilyPop"; break;
            case "license":
                viewName = "popup/inside/userManage/userPersonnelRecordLicensePop"; break;
            case "job":
                viewName = "popup/inside/userManage/userPersonnelRecordJobPop"; break;
            case "appointing":
                viewName = "popup/inside/userManage/userPersonnelRecordAppointingPop"; break;
            case "reward":
                viewName = "popup/inside/userManage/userPersonnelRecordRewardPop"; break;
            case "edu":
                viewName = "popup/inside/userManage/userPersonnelRecordEduPop"; break;
            case "workEval":
                viewName = "popup/inside/userManage/userPersonnelRecordWorkEvalPop"; break;
            case "proposal":
                viewName = "popup/inside/userManage/userPersonnelRecordProposalPop"; break;
        }
        model.addAttribute("pk", params.get("pk"));

        return viewName;
    }

    @RequestMapping("/useManage/getMilitaryInfo.do")
    public String getMilitaryInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", userManageService.getMilitaryInfo(params));
        return "jsonView";
    }

    @RequestMapping("/useManage/setUserPersonnelRecordInfo")
    public String setUserDegreeInfo(@RequestParam Map<String,Object> map, Model model,HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        Map<String,Object> params = new HashMap<>();
        params.put("EMP_SEQ", login.getUniqId());
        params.put("EMP_NAME", login.getName());

        params.put("regErpEmpCd", login.getErpEmpCd());
        params.put("regDeptSeq", login.getDeptId());
        params.put("regDeptName", login.getDeptNm());
        params.put("regTeamSeq", login.getTeamId());
        params.put("regTeamName", login.getTeamNm());

        params.putAll(map);
        switch(params.get("type").toString()) {
            case "degree":
                try {
                    userManageService.setEducationalInfo(params);
                    /*userManageService.setRecordHisInfo(params);*/
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "career":
                try {
                    userManageService.setCareerInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "military":
                try {
                    userManageService.setMilitaryInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "family":
                try {
                    userManageService.setFmailyInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "license":
                try {
                    userManageService.setLicenceInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "job":
                try {
                    userManageService.setJobInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "appointing":
                try {
                    userManageService.setAppointingInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "reward":
                try {
                    userManageService.setRewardInfo(params); //////
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "edu":
                try {
                    userManageService.setEduInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "workEval":
                try {
                    userManageService.setWorkEvalInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "proposal":
                try {
                    userManageService.setProposalInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
        }
        return "jsonView";
    }

    @RequestMapping("/userManage/getCodeList")
    public String getCodeList(Model model) {
        model.addAttribute("rs", userManageService.getCodeList());
        return "jsonView";
    }

    //직원추가
    @RequestMapping("/userManage/setUserReqDetailInsert")
    @ResponseBody
    public Map<String, Object> setUserInfoReqSave(@RequestParam Map<String, Object> params, HttpServletRequest request) {
        Map<String,Object> result = new HashMap<>();
        System.out.println("test : : : : : : : : "+params);

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("regEmpSeq", loginVO.getUniqId());
        String code = "";
        String message = "";
        try{
            userManageService.setUserReqDetailInsert(params);
            code = "200";
            message = "저장되었습니다.";
        }catch (Exception e){
            code = "500";
            message = "실패했습니다.";
        }
        result.put("code", code);
        result.put("message", message);

        return result;
    }

    //유저코드 - 부서코드리스트
    @RequestMapping("/userManage/getDeptCodeList2")
    @ResponseBody
    public Map<String, Object> getDeptCodeList2(@RequestParam Map<String, Object> params){
        Map<String,Object> result = new HashMap<>();
        result.put("list", userManageService.getDeptCodeList2(params));
        return result;
    }

    //유저코드 - 팀코드리스트
    @RequestMapping("/userManage/getDeptCodeList")
    @ResponseBody
    public Map<String, Object> getDeptCodeList(@RequestParam Map<String, Object> params){
        Map<String,Object> result = new HashMap<>();
        result.put("list", userManageService.getDeptCodeList(params));
        return result;
    }
    @RequestMapping("/userManage/getEmpInfoList")
    public String getEmpInfoList(@RequestParam Map<String,Object> map, Model model) {
        System.out.println("map : "+map);
        model.addAttribute("list", userManageService.getEmpInfoList(map));
        return "jsonView";
    }

    @RequestMapping("/userManage/getEmpInfoDetailList")
    public String getEmpInfoDetailList(@RequestParam Map<String,Object> map, Model model) {
        map.put("searchDetail1",map.get("searchDetail1").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail2",map.get("searchDetail2").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail3",map.get("searchDetail3").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail4",map.get("searchDetail4").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail5",map.get("searchDetail5").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail6",map.get("searchDetail6").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail7",map.get("searchDetail7").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail8",map.get("searchDetail8").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        System.out.println("searchDetail1 : "+map.get("searchDetail1"));
        System.out.println("searchDetail2 : "+map.get("searchDetail2"));
        System.out.println("searchDetail3 : "+map.get("searchDetail3"));
        System.out.println("searchDetail4 : "+map.get("searchDetail4"));
        System.out.println("searchDetail5 : "+map.get("searchDetail5"));
        System.out.println("searchDetail6 : "+map.get("searchDetail6"));
        System.out.println("searchDetail7 : "+map.get("searchDetail7"));
        System.out.println("searchDetail8 : "+map.get("searchDetail8"));
        model.addAttribute("list", userManageService.getEmpInfoDetailList(map));
        return "jsonView";
    }

    @RequestMapping("/userManage/setUpdateUserInfoModY")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoModY(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoModY(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    @RequestMapping("/userManage/setUpdateUserInfoModN")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoModN(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoModN(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    /*김승환 작성 반려 컬럼추가 RETURNYN RETURNYN_DATE 로 반려 업데이트*/
    @RequestMapping("/userManage/setUpdateUserInfoReturnY")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoReturnY(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoReturnY(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    @RequestMapping("/userManage/setUpdateUserInfoReturnN")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoReturnN(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoReturnN(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }

    //이미지관리 파일 추가
    @RequestMapping("/userManage/setempInfoFileSave.do")
    public String setempInfoFileSave(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String server_path = SERVER_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";
        String base_path = BASE_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";

        MainLib mainLib = new MainLib();
        List<Map<String, Object>> idPhotoFile = new ArrayList<>();
        List<Map<String, Object>> signPhotoFile = new ArrayList<>();
        List<Map<String, Object>> myPhotoFile = new ArrayList<>();

        idPhotoFile = mainLib.multiFileUpload(request.getFiles("idPhotoFile").toArray(new MultipartFile[0]), server_path);
        signPhotoFile = mainLib.multiFileUpload(request.getFiles("signPhotoFile").toArray(new MultipartFile[0]), server_path);
        myPhotoFile = mainLib.multiFileUpload(request.getFiles("myPhotoFile").toArray(new MultipartFile[0]), server_path);

        int photoFileId = userManageService.setThumbnailUpload(idPhotoFile, params, base_path);     //증명사진
        int signPhotoFileId = userManageService.setThumbnailUpload(signPhotoFile, params, base_path);   //결재사진
        int myPhotoFileId = userManageService.setThumbnailUpload(myPhotoFile, params, base_path);   //개인사진

        params.put("loginEmpSeq", loginVO.getUniqId());
        params.put("idImg", photoFileId);
        params.put("signImg", signPhotoFileId);
        params.put("personalImg", myPhotoFileId);

        userManageService.setUserInfoReqUpd(params);

        return "jsonView";
    }
    @RequestMapping("/userManage/userInfoModDetail")
    public String userInfoModeDetail(@RequestParam Map<String,Object> map, Model model) {
        System.out.println(map.get("KEY_SN"));
        model.addAttribute("rs", userManageService.getUserInfoModDetail(map));
        return "jsonView";
    }
    @RequestMapping("/userManage/modDetailPop.do")
    public String modDetailPop(@RequestParam Map<String, Object> params, Model model) {
        String viewName = "";

        model.addAttribute("params", params);

        switch(params.get("typeName").toString()) {
            default: break;
            case "학력사항" : viewName = "popup/inside/userManageView/degreePop"; break;
            case "병력사항" : viewName = "popup/inside/userManageView/militaryPop"; break;
            case "가족사항" : viewName = "popup/inside/userManageView/familyPop"; break;
            case "직무사항" : viewName = "popup/inside/userManageView/jobPop"; break;
            case "발령사항" : viewName = "popup/inside/userManageView/appointingPop"; break;
            case "경력사항" : viewName = "popup/inside/userManageView/careerPop"; break;
            case "보유면허" : viewName = "popup/inside/userManageView/licensePop"; break;
            case "상벌사항" : viewName = "popup/inside/userManageView/rewardPop"; break;
            case "제안제도" : viewName = "popup/inside/userManageView/proposalPop"; break;
        }

        return viewName;
    }


    /**
     * 직원 계좌 정보 수정
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/userManage/updateUserBankInfo")
    public String updateUserBankInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
            model.addAttribute("rs", userManageService.updateUserBankInfo(params));
        return "jsonView";
    }

    /**
     * 직원 정보 수정
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/userManage/setUserReqDetailUpdate")
    public String setUserReqDetailUpdate(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("regEmpSeq", loginVO.getUniqId());
        model.addAttribute("rs", userManageService.setUserReqDetailUpdate(params));
        return "jsonView";
    }

    /**
     * 인사통계현황 - 입/퇴사 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/joinLeaveView.do")
    public String joinLeaveView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/joinLeaveView";
    }

    /**
     * 인사통계현황 - 소속 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/depView.do")
    public String depView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/depView";
    }

    /**
     * 인사통계현황 - 직급 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/dutyView.do")
    public String dutyView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/dutyView";
    }
    /**
     * 인사통계현황 - 년도별 직급 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/yearDutyView.do")
    public String yearDutyView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/yearDutyView";
    }
    /**
     * 인사통계현황 - 년도별 발령 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/yearHistoryView.do")
    public String yearHistoryView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/yearHistoryView";
    }
    /**
     * 인사통계현황 - 성별/연령별 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/genderAgeView.do")
    public String genderAgeView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/genderAgeView";
    }
    /**
     * 인사통계현황 - 학위별 현황 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/degreeView.do")
    public String degreeView(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        menuSession(request, session);
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/degreeView";
    }

    /**
     * 인사통계현황 - 입/퇴사 현황 - 팝업
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/joinLeaveViewPop.do")
    public String joinLeaveViewPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/userManage/joinLeaveViewPop";
    }

    /**
     * 인사관리 계약직원-경비/환경, 단기직원, 위촉직원 직원 정보 조회 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewContractPop.do")
    public String userViewContractPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewContractPop";
    }

    /**
     * 인사관리 연수생/학생연구원 직원 정보 조회 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewTraineePop.do")
    public String userViewTraineePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewTraineePop";
    }

    /**
     * 인사관리 계약직원-경비/환경, 단기직원, 위촉직원 직원 정보 조회 팝업 (사용자)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewContractPop2.do")
    public String userViewContractPop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewContractPop2";
    }

    /**
     * 인사관리 연수생/학생연구원 직원 정보 조회 팝업 (사용자)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/userViewTraineePop2.do")
    public String userViewTraineePop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("idPhoto", userManageService.getUserIdPhotoInfo(params));

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userViewTraineePop2";
    }

    /**
     * 인사기록카드 - 학력 사항 삭제
     */
    @RequestMapping("/userManage/setEduDelete")
    public String setEduDelete(@RequestParam(value = "eduChk[]") List<String> eduChk, Model model){
        model.addAttribute("rs", userManageService.setEduDelete(eduChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 경력 사항 삭제
     */
    @RequestMapping("/userManage/setCareerDelete")
    public String setCareerDelete(@RequestParam(value = "employChk[]") List<String> employChk, Model model){
        model.addAttribute("rs", userManageService.setCareerDelete(employChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 가족 사항 삭제
     */
    @RequestMapping("/userManage/setFamilyDelete")
    public String setFamilyDelete(@RequestParam(value = "familyChk[]") List<String> familyChk, Model model){
        model.addAttribute("rs", userManageService.setFamilyDelete(familyChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 보유면허 삭제
     */
    @RequestMapping("/userManage/setLicenseDelete")
    public String setLicenseDelete(@RequestParam(value = "certChk[]") List<String> certChk, Model model){
        model.addAttribute("rs", userManageService.setLicenseDelete(certChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 직무사항 삭제
     */
    @RequestMapping("/userManage/setJobDelete")
    public String setJobDelete(@RequestParam(value = "dutyInfoChk[]") List<String> dutyInfoChk, Model model){
        model.addAttribute("rs", userManageService.setJobDelete(dutyInfoChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 상벌사항 삭제
     */
    @RequestMapping("/userManage/setRewordDelete")
    public String setRewordDelete(@RequestParam(value = "rewordChk[]") List<String> rewordChk, Model model){
        model.addAttribute("rs", userManageService.setRewordDelete(rewordChk));
        return "jsonView";
    }

    /**
     * 인사기록카드 - 제안제도 삭제
     */
    @RequestMapping("/userManage/setProposalDelete")
    public String setProposalDelete(@RequestParam(value = "propChk[]") List<String> propChk, Model model){
        model.addAttribute("rs", userManageService.setProposalDelete(propChk));
        return "jsonView";
    }

}
