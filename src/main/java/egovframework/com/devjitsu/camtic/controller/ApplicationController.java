package egovframework.com.devjitsu.camtic.controller;

import egovframework.com.devjitsu.common.utiles.AESCipher;
import egovframework.com.devjitsu.doc.config.EgovFileScrty;
import egovframework.com.devjitsu.camtic.service.ApplicationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

@Controller
public class ApplicationController {

    private static final Logger logger = LoggerFactory.getLogger(ApplicationController.class);

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @Autowired
    private ApplicationService applicationService;

    /**
     * 재용공고 - 로그인 페이지
     */
    @RequestMapping("/application/applicationLogin.do")
    public String applicationLogin(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("params", params);
        return "camtic/application/applicationLogin";
    }

    /**
     * 사용자 체크
     * @return
     */
    @RequestMapping("/join/userChk.do")
    public String userChk(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) throws Exception{
        Map<String, Object> returnMap = new HashMap<>();
        String inputLoginId = params.get("userEmail").toString() + params.get("userEmailSub1").toString() + params.get("userEmailSub2").toString();
        Boolean completeKeyFlag = false;
        params.put("userEmail", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
        params.put("userPassword", AESCipher.AES128SCRIPT_Decode(params.get("userPassword").toString(), completeKeyFlag));

        Map<String, Object> userMap = applicationService.getApplicationUser(params);
        if(userMap != null){
            if(!checkPassword(userMap, params)){
                returnMap.put("code", "500");
                returnMap.put("message", "비밀번호가 일치하지 않습니다.");
            }else{
                returnMap.put("code", "200");
                returnMap.putAll(applicationService.userAgreeChk(params));
                HttpSession session = request.getSession();
                session.setAttribute("userEmail", userMap.get("USER_EMAIL"));
                session.setAttribute("recruitInfoSn", params.get("recruitInfoSn"));
            }
        }else{
            returnMap.put("code", "999");
        }

        model.addAttribute("rs", returnMap);

        return "jsonView";
    }


    /**
     * 회원가입
     * @return
     */
    @RequestMapping("/join/setJoinAccess.do")
    public String setJoinAccess(@RequestParam Map<String, Object> params, HttpServletRequest request) throws Exception{
        String inputLoginId = params.get("userEmail").toString() + params.get("userEmailSub1").toString() + params.get("userEmailSub2").toString();
        Boolean completeKeyFlag = false;
        params.put("userEmail", AESCipher.AES128SCRIPT_Decode(inputLoginId, completeKeyFlag));
        params.put("userPassword", passwordEncrypt(replacePasswd(AESCipher.AES128SCRIPT_Decode(params.get("userPassword").toString(), completeKeyFlag))));
        applicationService.setJoinAccess(params);

        HttpSession session = request.getSession();
        session.setAttribute("userEmail", params.get("userEmail"));
        session.setAttribute("recruitInfoSn", params.get("recruitInfoSn"));

        return "jsonView";
    }


    /**
     * 재용공고 - 응시 (개인정보 동의서)
     */
    @RequestMapping("/application/userAgree.do")
    public String userAgree(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "camtic/application/userAgree";
    }

    /**
     * 재용공고 - 응시 (개인정보 동의 이력 저장)
     * @param params
     * @return
     */
    @RequestMapping("/application/setUserAgree.do")
    public String setUserAgree(@RequestParam Map<String, Object> params, HttpServletRequest request){
        applicationService.setUserAgree(params);
        return "jsonView";
    }


    /**
     * 재용공고 - 응시원서 작성 1 (기본정보)
     */
    @RequestMapping("/application/applicationForm1.do")
    public String applicationForm1(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "camtic/application/applicationForm1";
    }

    /**
     * 재용공고 - 응시원서 (기본정보) 조회
     * @param params
     * @return
     */
    @RequestMapping("/application/getApplicationForm1.do")
    public String getApplicationForm1(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        model.addAttribute("data", applicationService.getApplicationForm1(params));
        return "jsonView";
    }

    /**
     * 채용공고 - 응시원서 (기본정보) 저장
     * @param params
     * @return
     */
    @RequestMapping("/application/setApplicationForm1.do")
    public String setApplicationForm1(@RequestParam Map<String, Object> params,
                                      @RequestParam(name = "photoFile", required = false) MultipartFile photoFile,
                                      @RequestParam(name = "file", required = false) MultipartFile armiFile,
                                      HttpServletRequest request,
                                      Model model){
        applicationService.setApplicationForm1(params, photoFile, armiFile, SERVER_DIR, BASE_DIR);

        HttpSession session = request.getSession();
        if(session.getAttribute("applicationId") == null){
            session.setAttribute("applicationId", params.get("applicationId"));
        }

        model.addAttribute("params", params);

        return "jsonView";
    }


    /**
     * 재용공고 - 응시원서 작성 2 (학력/경력)
     */
    @RequestMapping("/application/applicationForm2.do")
    public String applicationForm2(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "camtic/application/applicationForm2";
    }

    /**
     * 채용공고 - 응시원서 저장 (학력/경력)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/application/setApplicationForm2.do")
    public String setApplicationForm2(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        applicationService.setApplicationForm2(params, request, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 재용공고 - 응시원서 (학력/경력)폼 조회
     * @param params
     * @return
     */
    @RequestMapping("/application/getApplicationForm2.do")
    public String getApplicationForm2(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", applicationService.getApplicationForm2(params));
        return "jsonView";
    }

    /**
     * 재용공고 - 응시원서 작성 3 (자격/면허, 어학)
     */
    @RequestMapping("/application/applicationForm3.do")
    public String applicationForm3(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "camtic/application/applicationForm3";
    }

    /**
     * 채용공고 - 응시원서 저장 (자격/면허, 어학)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/application/setApplicationForm3.do")
    public String setApplicationForm3(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        applicationService.setApplicationForm3(params, request, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 재용공고 - 응시원서 (자격/면허, 어학)폼 조회
     * @param params
     * @return
     */
    @RequestMapping("/application/getApplicationForm3.do")
    public String getApplicationForm3(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", applicationService.getApplicationForm3(params));
        return "jsonView";
    }

    /**
     * 재용공고 - 응시원서 작성 4 (자기소개서)
     */
    @RequestMapping("/application/applicationIntroduce.do")
    public String applicationIntroduce(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "camtic/application/applicationIntroduce";
    }

    /**
     * 채용공고 - 응시원서 저장 (자기소개서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/application/setApplicationIntroduce.do")
    public String setApplicationIntroduce(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        applicationService.setApplicationIntroduce(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 재용공고 - 응시원서 (자기소개서) 조회
     * @param params
     * @return
     */
    @RequestMapping("/application/getApplicationIntroduce.do")
    public String getApplicationIntroduce(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", applicationService.getApplicationIntroduce(params));
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
        if(user.get("USER_PASSWORD").equals(passwordEncrypt(replacePasswd(params.get("userPassword").toString())))) {
            flag = true;
        }
        return flag;
    }

    @RequestMapping("/application/getApplicationByRecruitArea.do")
    public String getApplicationByRecruitArea(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", applicationService.getApplicationByRecruitArea(params));
        return "jsonView";
    }






}
