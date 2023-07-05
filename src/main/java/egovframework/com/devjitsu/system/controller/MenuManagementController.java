package egovframework.com.devjitsu.system.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.system.service.MenuManagementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class MenuManagementController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(MenuManagementController.class);

    @Autowired
    private MenuManagementService menuManagementService;

    @Autowired
    private CommonService commonService;

    /** 메뉴관리 */
    @RequestMapping("/system/menuManagement.do")
    public String menuManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", menuManagementService.getStringMenuList(params));
        model.addAttribute("loginVO", login);

        return "system/menu/menuManagement";
    }

    /** 메뉴별 권한 관리 */
    @RequestMapping("/system/menuAuthorityManagement.do")
    public String menuAuthorityManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("data", menuManagementService.getStringMenuList(params));
        model.addAttribute("loginVO", login);
        return "system/menu/menuAuthorityManagement";
    }

    /** 메뉴 그룹별 권한 부여 */
    @RequestMapping("/system/menuGroupAuthorityGrant.do")
    public String menuGroupAuthorityGrant(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        return "system/menu/menuGroupAuthorityGrant";
    }
}
