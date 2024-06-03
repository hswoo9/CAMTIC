package egovframework.com.devjitsu.inside.evaluation.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import egovframework.com.devjitsu.inside.evaluation.service.EvaluationService;
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
public class EvaluationController {

    private static final Logger logger = LoggerFactory.getLogger(EvaluationController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private EvaluationService evaluationService;

    //평가등록
    @RequestMapping("/Inside/evaluationReq.do")
    public String evaluationReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/evaluationReq";
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
        model.addAttribute("list", evaluationService.getEvaluationList(params));
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

        model.addAttribute("list", evaluationService.getEvaluationScoreList(params));
        model.addAttribute("data", evaluationService.getEvaluationView(params));


        return "jsonView";
    }


    //평가결과조회
    @RequestMapping("/Inside/evaluationResultList.do")
    public String evaluationResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/evaluationResultList";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatA.do")
    public String evaluationStatA(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/evaluationStatA";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatB.do")
    public String evaluationStatB(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/evaluationStatB";
    }

    //평가통계조회
    @RequestMapping("/Inside/evaluationStatC.do")
    public String evaluationStatC(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/evaluationStatC";
    }

    //직원면담카드
    @RequestMapping("/Inside/employeeInterviewCard.do")
    public String employeeInterviewCard(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
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
    public String contentWritePop(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
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

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

}
