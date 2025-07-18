package egovframework.com.devjitsu.camtic.controller;

import egovframework.com.devjitsu.camtic.service.ApplicationService;
import egovframework.com.devjitsu.camtic.service.EvalService;
import egovframework.com.devjitsu.common.utiles.AESCipher;
import egovframework.com.devjitsu.doc.config.EgovFileScrty;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
import org.apache.poi.hssf.util.HSSFColor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class EvalController {

    private static final Logger logger = LoggerFactory.getLogger(EvalController.class);

    @Autowired
    private EvalService evalService;

    @Autowired
    private EvalManageService evalManageService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private RecruitService recruitService;

    /**
     * 사용자 체크
     * @return
     */
    @RequestMapping("/evaluation/evalChk.do")
    public String evalChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception{
        model.addAttribute("eval", evalManageService.evalLoginChk(params));
        return "jsonView";
    }

    /**
     * 서류심사 평가페이지
     */
    @RequestMapping("/evaluation/evalDocScreen.do")
    public String evalDocScreen(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        params.put("uniqId", login.getUniqId());
        params.put("group", "Y");
        params.put("evalType", "doc");

        model.addAttribute("eval", evalManageService.evalLoginChk(params));
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalDocScreen";
    }


    /**
     * 면접심사 평가 대기 지원자 리스트 페이지
     */
    @RequestMapping("/evaluation/evalInApplicationList.do")
    public String evalInApplicationList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        params.put("uniqId", login.getUniqId());
        params.put("group", "Y");
        params.put("evalType", "in");

        model.addAttribute("eval", evalManageService.evalLoginChk(params));
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalInApplicationList";
    }

    /**
     * 면접심사 평가페이지
     */
    @RequestMapping("/evaluation/evalInScreen.do")
    public String evalInScreen(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        params.put("uniqId", login.getUniqId());
        params.put("group", "Y");

        model.addAttribute("eval", evalManageService.evalLoginChk(params));
        model.addAttribute("recruit", recruitService.getRecruit(params));
        model.addAttribute("application", applicationService.getApplicationForm1(params));
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalInScreen";
    }

    /**
     * 평가위원 평가 데이터
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/getApplicationScoreBoard")
    public String getApplicationScoreBoard(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", evalService.getApplicationScoreBoard(params));
        return "jsonView";
    }

    /**
     * 평가위원 평가 저장
     * @param params
     * @return
     */
    @RequestMapping("/evaluation/setApplicationEvalScreen.do")
    public String setApplicationEvalScreen(@RequestParam Map<String, Object> params){
        evalService.setApplicationEvalScreen(params);
        return "jsonView";
    }

    /**
     * 평가위원 평가 종료
     */
    @RequestMapping("/evaluation/setEvalEnd.do")
    public String setEvalEnd(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", evalService.setEvalEnd(params));
        return "jsonView";
    }
}
