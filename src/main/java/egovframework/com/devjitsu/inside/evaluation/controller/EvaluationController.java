package egovframework.com.devjitsu.inside.evaluation.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.evaluation.service.EvaluationService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
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
import java.util.*;

@Controller
public class EvaluationController {

    private static final Logger logger = LoggerFactory.getLogger(EvaluationController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private EvaluationService evaluationService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private UserManageService userManageService;

    //평가등록
    @RequestMapping("/Inside/evaluationReq.do")
    public String evaluationReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationReq";
    }

    @RequestMapping("/evaluation/getEvalEmpList")
    public String getEvalEmpList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("list", evaluationService.getEvalEmpList(params));
        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluationOne")
    public String getEvaluationOne(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("data", evaluationService.getEvaluationOne(params));
        return "jsonView";
    }
    @RequestMapping("/evaluation/getEvaluationPerOne")
    public String getEvaluationPerOne(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("data", evaluationService.getEvaluationPerOne(params));
        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluationChk")
    public String getEvaluationChk(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("data", evaluationService.getEvaluationChk(params));
        return "jsonView";
    }

    //역량평가 하기
    @RequestMapping("/Inside/pop/evalPop.do")
    public String evalPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        params.put("bsYMD", params.get("bsYear")+"-12-31");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("empData", evaluationService.getUserPersonnelinformOne(params));
        return  "popup/inside/userManage/evalPop";
    }

    @RequestMapping("/evaluation/pop/evaluationEmpListPop.do")
    public String evaluationEmpListPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        params.put("bsYMD", params.get("bsYear")+"-12-31");

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("empData", evaluationService.getUserPersonnelinformOne(params));
        return "popup/inside/evaluation/evaluationEmpListPop";
    }

    @RequestMapping("/evaluation/getEvaluationOneList")
    public String getEvaluationOneList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        model.addAttribute("list", evaluationService.getEvaluationOneList(params)); // 본인평가
        model.addAttribute("self", evaluationService.getEvaluationSelf(params)); // 본인평가
        model.addAttribute("first", evaluationService.getEvaluationEmpCountFirst(params)); // 1차평가
        model.addAttribute("second", evaluationService.getEvaluationEmpCount(params)); // 2차평가
        return "jsonView";
    }

    //평가관리
    @RequestMapping("/Inside/evaluationList.do")
    public String evaluationList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationList";
    }

    /**
     * 평가관리 그리드 조회
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getEvaluationList")
    public String getEvaluationList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("rs", evaluationService.getEvaluationList(params));
        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluationEmpList")
    public String getEvaluationEmpList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("list", evaluationService.getEvaluationEmpList(params));
        return "jsonView";
    }

    /**
     * 평가등록 팝업창
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/pop/evaluationSet.do")
    public String evaluationSet(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evaluationSet";
    }

    @RequestMapping("/evaluation/pop/evaluationReq.do")  // 인사평가 등록 팝업
    public String evaluationReq(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evaluationReq";
    }

    @RequestMapping("/evaluation/pop/evaluationCom.do")  // 역량평가 설정 팝업
    public String evaluationCom(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evaluationCom";
    }

    /**
     * 평가결과 팝업창
     * @param request
     * @param model
     * @return
     */

    @RequestMapping("/evaluation/pop/evalResultMng.do")
    public String evalResultMng(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalResultMng";
    }

    @RequestMapping("/evaluation/pop/evalResUserPop.do")
    public String evalResUserPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalResUserPop";
    }

    @RequestMapping("/evaluation/pop/evalResult.do")
    public String evalResult(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalResult";
    }
    @RequestMapping("/evaluation/getEvalResultEmpList")
    public String getEvalResultEmpList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("list", evaluationService.getEvalResultEmpList(params));
        model.addAttribute("data", evaluationService.getEvaluationApp(params));
        return "jsonView";
    }

    @RequestMapping("/evaluation/pop/evalMngList.do")
    public String evalMngList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalMngList";
    }

    @RequestMapping("/evaluation/pop/evaluationPop.do")
    public String evaluationPop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        params.put("bsYMD", params.get("bsYear")+"-12-31");

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("empData", evaluationService.getUserPersonnelinformOne(params));
        return "popup/inside/evaluation/evaluationPop";
    }


    /**
     * 인사평가 대상설정 팝업
     * @param request
     * @param model
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/pop/requestEvaluationUsers")
    public String requestEvaluationUsers(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        params.put("evalSn", params.get("pk"));
        List<Map<String, Object>> chkList = evaluationService.getRequestEvaluationUser(params);
        model.addAttribute("chkList", chkList);
        model.addAttribute("params", params);

        return "popup/inside/evaluation/requestEvaluationUsers";
    }


    /**
     * 인사평가 대상 전체 직원 조회
     * @param request
     * @param model
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/getRequestEvaluationMemberTot")
    public String getRequestEvaluationMemberTot(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        List<Map<String, Object>> list = evaluationService.getRequestEvaluationMemberTot(params);
        model.addAttribute("list", list);

        return "jsonView";
    }


    /**
     * 평가등록
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/setEvaluation")
    public String setEvaluation(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setEvaluation(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/evaluation/setUpdReqEvaluation")
    public String setUpdReqEvaluation(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setUpdReqEvaluation(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/evaluation/setUpdComEvaluation")
    public String setUpdComEvaluation(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setUpdComEvaluation(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }
    @RequestMapping("/evaluation/delEvaluation")
    public String delEvaluation(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        evaluationService.delEvaluation(params);
        return "jsonView";
    }


    @RequestMapping("/evaluation/setEvaluationItemCopy")
    public String setEvaluationItemCopy(@RequestParam Map<String, Object> params) {
        evaluationService.setEvaluationItemCopy(params);
        return "jsonView";
    }

    @RequestMapping("/evaluation/setEvalScoreTemSave")
    public String setEvalScoreTemSave(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setEvalScoreTemSave(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/evaluation/setEvalScoreTemSaveAll")
    public String setEvalScoreTemSaveAll(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setEvalScoreTemSaveAll(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/evaluation/setSaveMngScore")
    public String setSaveMngScore(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        try{
            evaluationService.setSaveMngScore(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }


    /**
     * 업적평가 설정 등록 체크
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setEvalAchieveSetChk")
    public String setEvalAchieveSetChk(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evaluationService.setEvalAchieveSetChk(params));
        return "jsonView";
    }

    /**
     * 업적평가설정
     * @return
     */
    @RequestMapping("/evaluation/setEvalAchieveSetting")
    public String setEvalAchieveSetting(@RequestParam Map<String, Object> params) {
        evaluationService.setEvalAchieveSetting(params);
        return "jsonView";
    }

    /**
     * 업적평가설정, 팀 목표 조회
     * @return
     */
    @RequestMapping("/evaluation/getEvalAchieveSet")
    public String getEvalAchieveSet(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evaluationService.getEvalAchieveSet(params));
        return "jsonView";
    }

    /**
     * 업적평가설정 삭제
     * @return
     */
    @RequestMapping("/evaluation/setEvalAchieveSetDel")
    public String setEvalAchieveSetDel(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        evaluationService.setEvalAchieveSetDel(params);
        return "jsonView";
    }





    @RequestMapping("/evaluation/setEvaluationMngList")
    public String setEvaluationMngList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        try{
            evaluationService.setEvaluationMngList(params);
            model.addAttribute("params", params);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluation")
    public String getEvaluation(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {
        model.addAttribute("empList", evaluationService.getRequestEvaluationUser(params));
        model.addAttribute("empCnt", evaluationService.getRequestEvaluationUserCnt(params));
        model.addAttribute("data", evaluationService.getEvaluation(params));
        model.addAttribute("bsData", evaluationService.getEvaluationBs(params));
        model.addAttribute("btData", evaluationService.getEvaluationBt(params));

        model.addAttribute("bsList", evaluationService.getEvaluationBsList(params));
        model.addAttribute("btList", evaluationService.getEvaluationBtList(params));
        model.addAttribute("scList", evaluationService.getEvaluationScList(params));


        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluationMngList")
    public String getEvaluationMngList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        model.addAttribute("list", evaluationService.getEvaluationMngList(params));


        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvaluationScoreList")
    public String getEvaluationScoreList(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        Map<String, Object> data = evaluationService.getEvaluationView(params);
        model.addAttribute("data", data);
        if("eval".equals(params.get("rType").toString())){
            params.put("eval", data.get("EVAL"));
        }else if("evalF".equals(params.get("rType").toString())){
            params.put("eval", data.get("EVAL_F"));
        }else{
            params.put("eval", data.get("EVAL_S"));
        }
        model.addAttribute("list", evaluationService.getEvaluationScoreList(params));


        return "jsonView";
    }

    @RequestMapping("/evaluation/getEvalMemDet")
    public String getEvalMemDet(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", evaluationService.getEvalMemDet(params));
        return "jsonView";
    }


    //평가결과조회
    @RequestMapping("/Inside/evaluationResultList.do")
    public String evaluationResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationResultList";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatA.do")
    public String evaluationStatA(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationStatA";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatB.do")
    public String evaluationStatB(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationStatB";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatC.do")
    public String evaluationStatC(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationStatC";
    }

    //직원면담카드
    @RequestMapping("/Inside/employeeInterviewCard.do")
    public String employeeInterviewCard(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }
        
        return "inside/userManage/employeeInterviewCard";
    }

    //직원 면담 카드 - 면담내용 설정 팝업창
    @RequestMapping("/Inside/pop/contentPop.do")
    public String contentPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/userManage/contentPop";
    }

    //직원 면담 카드 - 직원 면담카드 작성 팝업창
    @RequestMapping("/Inside/pop/contentWritePop.do")
    public String contentWritePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/userManage/contentWritePop";
    }

    //직원 면담 카드 - 상세 페이지
    @RequestMapping("/Inside/pop/contentDetailPop.do")
    public String contentDetailPop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/userManage/contentDetailPop";
    }

    @RequestMapping("/evaluation/getEvalResultList")
    public String getEvalResultList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = evaluationService.getEvalResultList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/evaluation/getNowEvalCount")
    public String getNowEvalCount(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = evaluationService.getNowEvalCount(params);
        model.addAttribute("list", list);
        model.addAttribute("data", evaluationService.getEvaluation(params));
        return "jsonView";
    }

    @RequestMapping("/evaluation/getExcelDownloadData")
    public String getExcelDownloadData(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = evaluationService.getExcelDownloadData(params);
        model.addAttribute("list", list);
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


    /**
     * 업적평가하기
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/evaluationPerReq.do")
    public String evaluationPerReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(login == null){
            return "error/error";
        }

        return "inside/userManage/evaluationPerReq";
    }

    /**
     * 업적평가 상신여부 체크
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getTeamAchieveApprove")
    public String getTeamAchieveApprove(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evaluationService.getTeamAchieveApprove(params));
        return "jsonView";
    }

    /**
     * 업적평가 개인 목표 설정 ( 미사용)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/evalReqPop.do")
    public String evalReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("evalGoal", evaluationService.getEvalGoal(params));
        model.addAttribute("toDate", getCurrentDateTime());

        return "popup/inside/userManage/evalReqPop";
    }

    /**
     * 업적평가 목표 등록 ( 미사용)
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setEvalGoal")
    public String setEvalGoal(@RequestParam Map<String, Object> params) {
//        evaluationService.setEvalGoal(params);
        return "jsonView";
    }


    /**
     * 업적평가 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getEvalGoalList")
    public String getEvalGoalList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if(session.getAttribute("LoginVO") == null){
            return "error/error";
        }

        model.addAttribute("rs", evaluationService.getEvalGoalList(params));

        return "jsonView";
    }

    /**
     * 개인업적평가 점수 산출 (팝업)
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/Inside/pop/evalScorePop.do")
    public String evalScorePop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);

        return "popup/inside/userManage/evalScorePop";
    }

    /**
     * 개인업적평가 점수산출 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getEvalAchieveScoreList")
    public String getEvalAchieveScoreList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        if(session.getAttribute("LoginVO") == null){
            return "error/error";
        }

        model.addAttribute("rs", evaluationService.getEvalAchieveScoreList(params));
        return "jsonView";
    }

    /**
     * 개인업적평가 점수 산출 등록
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setEvalAchieve")
    public String setEvalAchieve(@RequestParam Map<String, Object> params) {
        evaluationService.setEvalAchieve(params);
        return "jsonView";
    }


    /**
     * 개인업적평가 목표 설정 결재 팝업
     * @param request
     * @param model
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/evalGoalSetPop.do")
    public String popPoem(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        params.put("empSeq", loginVO.getUniqId());

        return "popup/inside/evaluation/evalGoalSetPop";
    }

    /**
     * 팀원 조회
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/getUserList")
    public String getUserList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", userManageService.getEmpInfoList(params));
        return "jsonView";
    }

    /**
     * 개인업적평가 목표 설정 저장
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setEvalGoalTemp")
    public String setEvalGoalTemp(@RequestParam Map<String, Object> params, Model model) {
        evaluationService.setEvalGoalTemp(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 업적평가 목표 결재 양식 그리는 팝업*/
    @RequestMapping("/popup/evaluation/approvalFormPopup/evalGoalApprovalPop.do")
    public String evalGoalApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/evaluation/approvalFormPopup/evalGoalApprovalPop";
    }

    /**
     * 개인업적평가 목표 설정 저장데이터 조회
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/getEvalGoalTempList")
    public String getEvalGoalTempList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evaluationService.getEvalGoalTempList(params));
        return "jsonView";
    }

    /** 개인목표설정 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/evaluation/evalGoalApp")
    public String poemReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            evaluationService.updateEvalGoalState(bodyMap);
//            docViewProcessService.updatePoemDocState(bodyMap);
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
     * 개인업적평가 달성점수 입력 후  설정 저장
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setEvalAchieveApprove")
    public String setEvalAchieveApprove(@RequestParam Map<String, Object> params, Model model) {
        evaluationService.setEvalAchieveApprove(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 업적평가 달성 결재 양식 그리는 팝업*/
    @RequestMapping("/popup/evaluation/approvalFormPopup/evalAchieveApprovalPop.do")
    public String evalAchieveApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/inside/evaluation/approvalFormPopup/evalAchieveApprovalPop";
    }

    /**
     * 업적평가 달성 저장데이터 조회
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/getEvalAchieveApproveList")
    public String getEvalAchieveApproveList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evaluationService.getEvalAchieveApproveList(params));
        return "jsonView";
    }

    /** 업적평가 달성 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/evaluation/evalAchieveApp")
    public String evalAchieveApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            evaluationService.updateEvalAchieveState(bodyMap);
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
     * 평가결과 팝업창
     * @param request
     * @param model
     * @return
     */

    @RequestMapping("/evaluation/pop/evalAchieveResult.do")
    public String evalAchieveResult(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalAchieveResult";
    }

    /**
     * 평가결과 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getEvalAchieveResultList")
    public String getEvalAchieveResultList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("rs", evaluationService.getEvalAchieveResultList(params));
        return "jsonView";
    }

    /**
     * 평가결과 팝업창
     * @param request
     * @param model
     * @return
     */

    @RequestMapping("/evaluation/pop/allEvalApprovePop.do")
    public String allEvalApprovePop(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/evaluation/allEvalApprovePop";
    }

    /**
     * 평가결과 역량 업적 합산 결재 리스트
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/evaluation/getAllEvalApproveList.do")
    public String getAllEvalApproveList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("rs", evaluationService.getAllEvalApproveList(params));
        return "jsonView";
    }




    private static LoginVO getLoginVO(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = session.getAttribute("LoginVO") == null ? null : (LoginVO) session.getAttribute("LoginVO");


        if(session.getAttribute("LoginVO") == null){
            return null;
        }
        return loginVO;
    }
}
