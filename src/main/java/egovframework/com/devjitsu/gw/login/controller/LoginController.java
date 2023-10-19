package egovframework.com.devjitsu.gw.login.controller;

import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.login.service.LoginService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class LoginController {

    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Autowired
    private LoginService loginService;

    @RequestMapping("/login.do")
    public String openLoginPage(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.removeAttribute("menuNm");
        return "login";
    }

    @RequestMapping("/loginAccess")
    public String loginAccess(@RequestParam Map<String, Object> params, @ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, ModelMap model) throws Exception {

        if (params != null && params.get("id") != null && !params.get("id").equals("")) {
            boolean isAdmin = false;
            logger.info("params : "+params);
            LoginVO login = new LoginVO();

            login.setId(params.get("id").toString());
            login = loginService.actionLogin(loginVO);

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

                return "redirect:intro.do";
            }else {
                model.addAttribute("message", "Login failed.");
                return "forward:login.do";
            }

        }else {
            model.addAttribute("message", "Login failed.");
            return "forward:login.do";
        }

    }
}
