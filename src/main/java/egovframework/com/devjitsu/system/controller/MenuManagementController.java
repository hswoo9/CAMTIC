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

    /** 메뉴 패스 업데이트 */
    @RequestMapping("/system/setMenuPathUpd.do")
    public String setMenuPathUpd(@RequestParam Map<String, Object> params) {
        menuManagementService.setMenuPathUpd(params);
        return "jsonView";
    }

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

    /** String 형식 메뉴리스트 */
    @RequestMapping("/system/makeTreeView.do")
    public String makeTreeView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getStringMenuList(params));
        return "jsonView";
    }

    /** ListMap 형식 메뉴리스트 */
    @RequestMapping("/system/getMenuList.do")
    public String getMenuList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getMenuList(params));
        return "jsonView";
    }

    /** 메뉴 저장 */
    @RequestMapping("/system/setMenu.do")
    public String setMenu(@RequestParam Map<String, Object> params, Model model){
        menuManagementService.setMenu(params);
        return "jsonView";
    }

    /** 메뉴 삭제 */
    @RequestMapping("/system/setMenuDel.do")
    public String setMenuDel(@RequestParam Map<String, Object> params, Model model){
        menuManagementService.setMenuDel(params);
        return "jsonView";
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

    /** 메뉴 권한 그룹 리스트*/
    @RequestMapping("/system/getMenuAuthorityGroupList.do")
    public String getMenuAuthorityGroupList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getMenuAuthorityGroupList(params));
        return "jsonView";
    }

    /** 메뉴 권한 그룹 상세 */
    @RequestMapping("/system/getMenuAuthorityGroup.do")
    public String getMenuAuthorityGroup(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getMenuAuthorityGroup(params));
        return "jsonView";
    }

    /** 메뉴 권한 그룹 삭제 */
    @RequestMapping("/system/setMenuAuthorityGroupDel.do")
    public String setMenuAuthorityGroupDel(@RequestParam(value = "agiAr[]") List<String> agiAr){
        menuManagementService.setMenuAuthorityGroupDel(agiAr);
        return "jsonView";
    }

    /** 메뉴 권한 그룹 저장 */
    @RequestMapping("/system/setMenuAuthorityGroup.do")
    public String setMenuAuthorityGroup(@RequestParam Map<String, Object> params, Model model){
        menuManagementService.setMenuAuthorityGroup(params);
        return "jsonView";
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

    /** 메뉴 권한 그룹별 사용자 리스트*/
    @RequestMapping("/system/getAuthorityGroupUserList.do")
    public String getAuthorityGroupUserList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getAuthorityGroupUserList(params));
        return "jsonView";
    }

    /** 메뉴 권한 그룹 사용자 추가 */
    @RequestMapping("/system/setAuthorityGroupUser.do")
    public String setAuthorityGroupUser(@RequestParam Map<String, Object> params){
        menuManagementService.setAuthorityGroupUser(params);
        return "jsonView";
    }

    /** 메뉴 권한 그룹 사용자 삭제 */
    @RequestMapping("/system/setAuthorityGroupUserDel.do")
    public String setAuthorityGroupUserDel(@RequestParam(value = "aguAr[]") List<String> aguAr){
        menuManagementService.setAuthorityGroupUserDel(aguAr);
        return "jsonView";
    }

    /** 전산보완 게시판 대,중,소 형 형식 메뉴리스트 */
    @RequestMapping("/system/getRequestBoardMenuList")
    public String getRequestBoardMenuList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", menuManagementService.getRequestBoardMenuList(params));
        return "jsonView";
    }
}
