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

        Integer recruitInfoSn = (Integer) params.get("recruitInfoSn");
        System.out.println("******recruitInfoSn******* : "+recruitInfoSn);
        Map<String, Object> resultMap = new HashMap<>(params);
        resultMap.put("recruitInfoSn", recruitInfoSn);

        List<Map<String, Object>> recruitAreaList = recruitService.getRecruitAreaList(resultMap);
        System.out.println("******recruitAreaList******* : "+recruitAreaList);

        Map<String, Object> newMap = new HashMap<>();
        newMap.put("tempDivision", "N");
        newMap.put("recruitInfoSn", recruitInfoSn);



        for (Map<String, Object> area : recruitAreaList) {
            String deptName = (String) area.get("DEPT_NAME");
            Integer recruitAreaInfoSn = (Integer) area.get("RECRUIT_AREA_INFO_SN");
            System.out.println("DEPT_NAME: " + deptName);
            System.out.println("RECRUIT_AREA_INFO_SN: " + recruitAreaInfoSn);

            newMap.put("deptName", deptName);
            newMap.put("recruitAreaInfoSn", recruitAreaInfoSn);

            System.out.println("******newMap******* : " + newMap);
            List<Map<String, Object>> newListMap = recruitService.getCommissionerList(newMap);
            List<Map<String, Object>> allMatchingDeptMaps = new ArrayList<>();

            for (Map<String, Object> commissionerMap : newListMap) {
                String commissionerDeptName = (String) commissionerMap.get("DEPT_NAME");
                String commissionerDutyName = (String) commissionerMap.get("DUTY_NAME");

                if (deptName.equals(commissionerDeptName) &&
                        ("팀장".equals(commissionerDutyName) || "본부장".equals(commissionerDutyName) || "센터장".equals(commissionerDutyName))) {
                    allMatchingDeptMaps.add(commissionerMap);

                    System.out.println("********allMatchingDeptMaps******* :"+allMatchingDeptMaps);

                    for (Map<String, Object> matchingDeptMap : allMatchingDeptMaps) {
                        Integer empSeq = (Integer) matchingDeptMap.get("EMP_SEQ");

                        Map<String, Object> evalSelectionParams = new HashMap<>();
                        evalSelectionParams.put("recruitInfoSn", recruitInfoSn);
                        evalSelectionParams.put("recruitAreaInfoSn", recruitAreaInfoSn);
                        evalSelectionParams.put("evalType", "doc");
                        evalSelectionParams.put("empSeq", empSeq);
                        evalSelectionParams.put("evalEmpSeq", empSeq);

                        String result1 = evalManageService.setEvalSelection(evalSelectionParams);

                        Map<String, Object> inEvalSelectionParams = new HashMap<>();
                        inEvalSelectionParams.put("recruitInfoSn", recruitInfoSn);
                        inEvalSelectionParams.put("recruitAreaInfoSn", recruitAreaInfoSn);
                        inEvalSelectionParams.put("evalType", "in");
                        inEvalSelectionParams.put("empSeq", empSeq);
                        inEvalSelectionParams.put("evalEmpSeq", empSeq);

                        String result2 = evalManageService.setEvalSelection(inEvalSelectionParams);




                    }

                }
            }

            Map<String, Object> evalSelectionParamsY = new HashMap<>();
            evalSelectionParamsY.put("recruitInfoSn", recruitInfoSn);
            evalSelectionParamsY.put("recruitAreaInfoSn", recruitAreaInfoSn);
            evalSelectionParamsY.put("evalType", "doc");
            evalSelectionParamsY.put("empSeq", "31");
            evalSelectionParamsY.put("evalEmpSeq", "31");

            String result3 = evalManageService.setEvalSelection(evalSelectionParamsY);

            Map<String, Object> inEvalSelectionParamsY = new HashMap<>();
            inEvalSelectionParamsY.put("recruitInfoSn", recruitInfoSn);
            inEvalSelectionParamsY.put("recruitAreaInfoSn", recruitAreaInfoSn);
            inEvalSelectionParamsY.put("evalType", "in");
            inEvalSelectionParamsY.put("empSeq", "31");
            inEvalSelectionParamsY.put("evalEmpSeq", "31");

            String result4 = evalManageService.setEvalSelection(inEvalSelectionParamsY);

        }







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

    @RequestMapping("/popup/inside/approvalFormPopup/recruitApprovalPop.do")
    public String recruitApprovalPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/inside/recruit/approvalFormPopup/recruitApprovalPop";
    }

    @RequestMapping("/inside/getRecruitPrint")
    public String getRecruitPrint(@RequestParam Map<String,Object> params, Model model) {
        model.addAttribute("list", recruitService.getRecruitPrint(params));
        return "jsonView";
    }


}
