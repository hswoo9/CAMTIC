package egovframework.com.devjitsu.system.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.system.service.BoardManagementService;
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
public class BoardManagementController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(BoardManagementController.class);

    @Autowired
    private BoardManagementService boardManagementService;

    @Autowired
    private CommonService commonService;

    /** 게시판관리*/
    @RequestMapping("/system/boardManagement.do")
    public String boardManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        /*model.addAttribute("data", boardManagementService.getStringBoardList(params));*/
        model.addAttribute("loginVO", login);

        return "system/board/boardManagement";
    }

    /** 게시판 리스트 */
    @RequestMapping("/system/getBoardList.do")
    public String getBoardGroupList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", boardManagementService.getBoardList(params));
        return "jsonView";
    }

    /** 게시판 등록/수정 */
    @RequestMapping("/system/setBoard.do")
    public String setBoard(@RequestParam Map<String, Object> params){
        boardManagementService.setBoard(params);
        return "jsonView";
    }

    /** 게시판 카테고리 리스트 */
    @RequestMapping("/system/getBoardCategoryList.do")
    public String getBoardCategoryList(ArticlePage articlePage, Model model){
        model.addAttribute("rs", boardManagementService.getBoardCategoryList(articlePage));
        return "jsonView";
    }

    /** 게시판 타입 조회 */
    @RequestMapping("/system/getBoardType.do")
    public String getBoardType(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", boardManagementService.getBoardType(params));
        return "jsonView";
    }

    /** 게시판 첨부파일 가능 여부 조회 */
    @RequestMapping("/system/getBoardActive.do")
    public String getBoardActive(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", boardManagementService.getBoardActive(params));
        return "jsonView";
    }

    /* 게시판 권한 관리*/
/*    @RequestMapping("/system/boardAuthorityManagement.do")
    public String boardAuthorityManagement(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "system/boardAuthorityManagement";
    }*/




}
