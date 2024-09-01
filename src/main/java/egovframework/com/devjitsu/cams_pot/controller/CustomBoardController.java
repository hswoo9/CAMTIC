package egovframework.com.devjitsu.cams_pot.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class CustomBoardController {

    @Autowired
    private CustomBoardService customBoardService;

    @Autowired
    private UserManageService userManageService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 제안제도 */

    /**
     * 캠스팟 > 제안제도리스트
     * @param request
     * @return
     */
    @RequestMapping("/spot/suggestionSystemList.do")
    public String suggestionSystemList(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        return "camspot/suggestion/suggestionSystemList";
    }

    /**
     * 제안제도 리스트 조회
     * @param articlePage
     * @param model
     * @return
     */
    @RequestMapping("/spot/getSuggestionSystemList.do")
    public String getSuggestionSystemList(ArticlePage articlePage, Model model){
        PagingResponse<PostResponse> response = customBoardService.getSuggestionSystemList(articlePage);

        model.addAttribute("params", articlePage);
        model.addAttribute("boardArticleList", response);
        return "jsonView";
    }

    /**
     * 게시판 상세보기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/suggestionSystemDetail.do")
    public String suggestionSystemDetail(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "camspot/suggestion/suggestionSystemDetail";
    }

    /**
     * 제안제도 게시글 조회 (단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/getSuggestionSystem.do")
    public String getArticleInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getSuggestionSystem(params));
        return "jsonView";
    }

    /**
     * 제안제도 글쓰기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/suggestionSystemReg.do")
    public String normalBoardWrite(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));

        return "camspot/suggestion/suggestionSystemReg";
    }

    /**
     * 제안제도 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/spot/setSuggestionSystem.do")
    public String setSuggestionSystem(@RequestParam Map<String, Object> params, Model model) {
        customBoardService.setSuggestionSystem(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 제안제도 게시글 삭제
     * @param params
     * @return
     */
    @RequestMapping("/spot/setSuggestionSystemDel.do")
    public String setArticleDel(@RequestParam Map<String, Object> params){
        customBoardService.setSuggestionSystemDel(params);
        return "jsonView";
    }

    /**
     * 게시글 등록 후 파일 업로드
     * @param params
     * @param mpfList
     * @param request
     * @param model
     * @return
     * @throws IOException
     */
    @RequestMapping("/spot/setCustomBoardFileInit.do")
    public String setCustomBoardFileInit(@RequestParam Map<String, Object> params, @RequestParam("files") MultipartFile[] mpfList, HttpServletRequest request, Model model) throws IOException {
        customBoardService.setCustomBoardFileInit(params, mpfList, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 직원일정 */

    /**
     * 캠스팟 > 직원일정
     * @param request
     * @return
     */
    @RequestMapping("/spot/empScheduleList.do")
    public String empScheduleList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("params", params);
        return "camspot/empSchedule/empScheduleList";
    }

    /**
     * 캠스팟 > 일정등록
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/pop/popScheduleReg.do")
    public String popScheduleReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cams_pot/popScheduleReg";
    }

    /**
     * 일정 조회 - 수정 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/getSchedule.do")
    public String getSchedule(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getSchedule(params));
        return "jsonView";
    }

    /**
     * 일정리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/getScheduleList.do")
    public String getScheduleList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", customBoardService.getScheduleList(params));
        return "jsonView";
    }

    /**
     * 일정 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/setScheduleReg.do")
    public String setScheduleReg(@RequestParam Map<String, Object> params, Model model){
        customBoardService.setScheduleReg(params);
        return "jsonView";
    }

    /**
     * 일정 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/setScheduleDel")
    public String setScheduleDel(@RequestParam Map<String, Object> params, Model model){
        customBoardService.setScheduleDel(params);
        return "jsonView";
    }

    /**
     * 캠스팟 > 일정상세보기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/pop/popScheduleView.do")
    public String popScheduleView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        Map<String, Object> map = customBoardService.getSchedule(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", customBoardService.getSchedule(params));
        model.addAttribute("map", map);
        model.addAttribute("params", params);
        return "popup/cams_pot/popScheduleView";
    }

    /** 전산시스템 구축 수정사항(하자보수요청), 홍보협조요청 */

    /**
     * 게시판 리스트
     * @param request
     * @return
     */
    @RequestMapping("/spot/requestBoardList.do")
    public String requestBoard(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        model.addAttribute("params", params);
        model.addAttribute("queryParams", new Gson().toJson(params));

        return "camspot/requestBoard/requestBoardList";
    }

    /**
     * 리스트 조회
     * @param articlePage
     * @param model
     * @return
     */
    @RequestMapping("/spot/getRequestBoardList.do")
    public String getRequestBoardList(ArticlePage articlePage, Model model){
        PagingResponse<PostResponse> response = customBoardService.getRequestBoardList(articlePage);

        model.addAttribute("params", articlePage);
        model.addAttribute("boardArticleList", response);
        model.addAttribute("boardArticleList", response);
        return "jsonView";
    }

    @RequestMapping("/spot/getRequestBoardList2.do")
    public String getRequestBoardList(@RequestParam Map<String, Object> params, Model model) {
        List<Map<String, Object>> list = customBoardService.getRequestBoardList2(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /**
     * 글쓰기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/requestBoardReg.do")
    public String requestBoardReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("empSeq", loginVO.getUniqId());

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("uprinfList", userPersonnelinformList);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));

        return "camspot/requestBoard/requestBoardReg";
    }

    /**
     * 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/spot/setRequestBoard.do")
    public String setRequestBoard(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        MultipartFile[] file = request.getFiles("boardFile").toArray(new MultipartFile[0]);
        customBoardService.setRequestBoard(params, file, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /**
     * 게시판 상세보기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/requestBoardDetail.do")
    public String requestBoardDetail(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "camspot/requestBoard/requestBoardDetail";
    }

    /**
     * 게시글 조회 (단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/getRequestBoard.do")
    public String getRequestBoard(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getRequestBoard(params));
        model.addAttribute("fileInfo", customBoardService.getBoardFileInfo(params));
        return "jsonView";
    }

    /**
     * 게시글 삭제
     * @param params
     * @return
     */
    @RequestMapping("/spot/setRequestBoardDel.do")
    public String setRequestBoardDel(@RequestParam Map<String, Object> params){
        customBoardService.setRequestBoardDel(params);
        return "jsonView";
    }

    /**
     * 상태업데이트
     * @param params
     * @return
     */
    @RequestMapping("/spot/setRequestBoardStatusUpd.do")
    public String setRequestBoardStatusUpd(@RequestParam Map<String, Object> params){
        customBoardService.setRequestBoardStatusUpd(params);
        return "jsonView";
    }

    /** 함께보아요 */
    /**
     * 게시판 리스트
     * @param request
     * @return
     */
    @RequestMapping("/spot/watchBoardList.do")
    public String watchBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("queryParams", new Gson().toJson(params));

        return "camspot/watchBoard/watchBoardList";
    }

    /**
     * 리스트 조회
     * @param articlePage
     * @param model
     * @return
     */
    @RequestMapping("/spot/getWatchBoardList.do")
    public String getWatchBoardList(ArticlePage articlePage, Model model){
        articlePage.setRecordSize(8);
        PagingResponse<PostResponse> response = customBoardService.getWatchBoardList(articlePage);

        model.addAttribute("params", articlePage);
        model.addAttribute("boardArticleList", response);
        return "jsonView";
    }


    /**
     * 글쓰기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/watchBoardReg.do")
    public String watchBoardReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));

        return "camspot/watchBoard/watchBoardReg";
    }

    /**
     * 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/spot/setWatchBoard.do")
    public String setWatchBoard(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) {
        customBoardService.setWatchBoard(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /**
     * 게시판 상세보기
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/spot/watchBoardDetail.do")
    public String watchBoardDetail(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        customBoardService.setWatchBoardViewCount(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "camspot/watchBoard/watchBoardDetail";
    }

    /**
     * 게시글 조회 (단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/getWatchBoard.do")
    public String getWatchBoard(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getWatchBoard(params));
        return "jsonView";
    }

    /**
     * 게시글 삭제
     * @param params
     * @return
     */
    @RequestMapping("/spot/setWatchBoardDel.do")
    public String setWatchBoardDel(@RequestParam Map<String, Object> params){
        customBoardService.setWatchBoardDel(params);
        return "jsonView";
    }


    @RequestMapping("/spot/getWatchBoardOne")
    public String getWatchBoardOne(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getWatchBoardOne(params));
        return "jsonView";
    }

    /**
     * 상태업데이트 (전산보완 고도화 , 수정사항)
     * @param params
     * @return
     */
    @RequestMapping("/spot/setRequestBoardAdvancementFixesUpd")
    public String setRequestBoardAdvancementFixesUpd(@RequestParam Map<String, Object> params){
        customBoardService.setRequestBoardAdvancementFixesUpd(params);
        return "jsonView";
    }

}