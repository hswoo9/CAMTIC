package egovframework.com.devjitsu.camtic.controller;

import egovframework.com.devjitsu.camtic.service.ApplicationService;
import egovframework.com.devjitsu.camtic.service.EvalService;
import egovframework.com.devjitsu.common.utiles.AESCipher;
import egovframework.com.devjitsu.doc.config.EgovFileScrty;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import egovframework.com.devjitsu.inside.recruit.service.RecruitService;
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

    @Autowired
    private LoginService loginService;

    /**
     * 심사 - 로그인 페이지
     */
    @RequestMapping("/evaluation/evalLogin.do")
    public String evalLogin(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalLogin";
    }

    /**
     * 사용자 체크
     * @return
     */
    @RequestMapping("/evaluation/evalChk.do")
    public String evalChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception{
        HttpSession session = request.getSession();
        Map<String, Object> returnMap = new HashMap<>();
        String inputLoginId = params.get("userId").toString() + params.get("userIdSub1").toString() + params.get("userIdSub2").toString();
        Boolean completeKeyFlag = false;
        params.put("uniqId", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
        params.put("userId", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
        params.put("userPassword", passwordEncrypt(replacePasswd(AESCipher.AES128SCRIPT_Decode(params.get("userPassword").toString(), completeKeyFlag))));

        Map<String, Object> userMap = new HashMap<>();
        if(params.get("evalType").equals("doc")){
            userMap = loginService.actionLoginMap(params);
        }else if(params.get("evalType").equals("in")){
            userMap = evalService.getEvalLogin(params);
        }

        if(userMap != null){
            Map<String, Object> chkMap = new HashMap<>();
            if(params.get("evalType").equals("doc")){
                userMap.put("recruitInfoSn", params.get("recruitInfoSn"));
                chkMap = evalManageService.setEvalSelectionEmpSeq(userMap);
            }else if(params.get("evalType").equals("in")){
                chkMap = (Map<String, Object>) userMap.get("eval");
                chkMap.put("flag", userMap.get("flag"));
            }

            if(!checkPassword(chkMap, params)){
                returnMap.put("code", "500");
                returnMap.put("message", "비밀번호가 일치하지 않습니다.");
            }else{
                returnMap.put("code", "200");
                returnMap.put("flag", chkMap.get("flag"));
                if(Boolean.parseBoolean(chkMap.get("flag").toString())){
                    session.setAttribute("eval", chkMap);
                }
            }
        }else{
            returnMap.put("code", "999");
        }

        model.addAttribute("rs", returnMap);

        return "jsonView";
    }

    /**
     * 서류심사 평가페이지
     */
    @RequestMapping("/evaluation/evalDocScreen.do")
    public String evalDocScreen(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalDocScreen";
    }


    /**
     * 면접심사 평가 대기 지원자 리스트 페이지
     */
    @RequestMapping("/evaluation/evalInApplicationList.do")
    public String evalInApplicationList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("params", params);
        return "popup/inside/evaluation/evalInApplicationList";
    }

    /**
     * 면접심사 평가페이지
     */
    @RequestMapping("/evaluation/evalInScreen.do")
    public String evalInScreen(@RequestParam Map<String, Object> params, Model model) {
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

    public boolean checkPassword(Map<String, Object> user, Map<String, Object> params) throws Exception {
        boolean flag = false;
        // sha256 암호비교
        if(user.get("PWD").equals(params.get("userPassword").toString())) {
            flag = true;
        }
        return flag;
    }
}
