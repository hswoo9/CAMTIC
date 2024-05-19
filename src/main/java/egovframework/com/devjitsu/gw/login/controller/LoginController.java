package egovframework.com.devjitsu.gw.login.controller;

import com.google.common.hash.Hashing;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @RequestMapping("/login.do")
    public String openLoginPage(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.removeAttribute("menuNm");
        model.addAttribute("params", params);

        if(session.getAttribute("LoginVO") != null){
            return "redirect:indexB.do";
        } else {
            return "login";
        }
    }

    /**
     * 로그아웃
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/logoutAction")
    public String logout(HttpServletRequest request, ModelMap model){
        HttpSession session = request.getSession();


        RequestContextHolder.getRequestAttributes().removeAttribute("loginVO", RequestAttributes.SCOPE_SESSION);
        session.invalidate();

        return "redirect:login.do";
    }

    @RequestMapping("/updMasterKey")
    public String updMasterKey(@RequestParam Map<String, Object> params, HttpServletRequest request, ModelMap model) throws Exception {
        loginService.updMasterKey(params);
        return "jsonView";
    }

    @RequestMapping("/loginAccess")
    public String loginAccess(@RequestParam Map<String, Object> params, @ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, ModelMap model) throws Exception {

        if(params.containsKey("NEWCAMTICS") && !params.get("NEWCAMTICS").equals("")){
            /** 임시) 구 캠스팟에서 링크 이동시 자동 로그인 (오픈 시 삭제 예정) */
            boolean isAdmin = false;
            LoginVO login = new LoginVO();

            login.setId(params.get("NEWCAMTICS").toString());
            login = loginService.actionLogin(loginVO);

            if (login != null) {
                if(login.getUniqId().equals("1")){
                    isAdmin = true;
                    login.setUserSe("ADMIN");
                }

                request.getSession().setAttribute("LoginVO", login);
                request.getSession().setAttribute("isAdmin", isAdmin);

                return "redirect:indexB.do";
            }else {
                model.addAttribute("message", "Login failed.");
                return "forward:login.do";
            }
        }

        if (params != null && params.get("id") != null && !params.get("id").equals("")) {

            boolean isAdmin = false;
            logger.info("params : "+params);
            LoginVO login = new LoginVO();
            login.setId(params.get("id").toString());
            String passwordTmp = params.get("password").toString();

            Map<String, Object> userData = userService.getUserInfoToId(params);
            String masterKey = userService.getMasterKey();

            if(userData != null){

                if(userData.get("DIVISION").equals("9999")){
                    model.addAttribute("message", "퇴사한 계정입니다.");
                    if(params.containsKey("deviceType")){
                        return "forward:m/login.do";
                    } else {
                        return "forward:login.do";
                    }
                }

                if(userData.get("TEMP_DIVISION").toString().equals("E") || passwordTmp.equals(masterKey)){
                    login = loginService.actionLogin(loginVO);
                }else{
                    /** 비밀번호 암호화 하여 대조*/
                    String password = Hashing.sha256().hashString(passwordTmp, StandardCharsets.UTF_8).toString();
                    loginVO.setPasswd(password);
                    login = loginService.actionLogin(loginVO);
                }
            }else if(passwordTmp.equals(masterKey)){
                login = loginService.actionLogin(loginVO);
            }else{
                /** 비밀번호 암호화 하여 대조*/
                String password = Hashing.sha256().hashString(passwordTmp, StandardCharsets.UTF_8).toString();
                loginVO.setPasswd(password);
                login = loginService.actionLogin(loginVO);
            }


            logger.info("LoginVO : "+login);

            if (login != null) {
                if(login.getUniqId().equals("1")){
                    isAdmin = true;
                    login.setUserSe("ADMIN");
                }

                request.getSession().setAttribute("LoginVO", login);
                request.getSession().setAttribute("isAdmin", isAdmin);



                logger.info("이름은 : "+login.getName());
                //Map<String, Object> loginMsMap = loginService.actionLoginMs(params);
                if(params.containsKey("deviceType")){
                    return "forward:mobileMain.do";
                } else {
                    return "redirect:indexB.do";
                }

            }else {
                model.addAttribute("message", "Login failed.");
                if(params.containsKey("deviceType")){
                    return "forward:m/login.do";
                } else {
                    return "forward:login.do";
                }
            }
        }else {
            model.addAttribute("message", "Login failed.");
            if(params.containsKey("deviceType")){
                return "forward:m/login.do";
            } else {
                return "forward:login.do";
            }
        }

    }
}
