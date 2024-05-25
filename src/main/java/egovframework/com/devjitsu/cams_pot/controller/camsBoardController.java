package egovframework.com.devjitsu.cams_pot.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.cams_pot.service.camsBoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

@Controller
public class camsBoardController {

    @Autowired
    private camsBoardService camsBoardService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 최근 게시판 */
/*    @RequestMapping("/board/recentBoardList.do")
    public String recentBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/recentBoardList";
    }*/

    /** 최근게시판 리스트 조회 */
/*    @RequestMapping("/board/getRecentBoardArticleList.do")
    public String getRecentBoardArticleList(ArticlePage articlePage, HttpServletRequest request, Model model){
        PagingResponse<PostResponse> response = camsBoardService.getRecentBoardArticleList(articlePage);

        model.addAttribute("params", articlePage);
        model.addAttribute("boardArticleList", response);

        return "jsonView";
    }*/

    /** 일반 게시판 */
    @RequestMapping("/board/normalBoardList.do")
    public String normalBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("queryParams", new Gson().toJson(params));

        return "board/normalBoardList";
    }

    /** 일반게시판 리스트 조회 */
    @RequestMapping("/board/getCamsBoardArticleList.do")
    public String getNormalBoardList(ArticlePage articlePage, HttpServletRequest request, Model model){
        Map<String, Object> boardInfo = camsBoardService.getBoardInfo(articlePage);
        if(!StringUtils.isEmpty(boardInfo.get("boardInfo"))){
            articlePage.setAnonymousActive((String) ((Map<String, Object>)boardInfo.get("boardInfo")).get("ANONYMOUS_ACTIVE"));
        }

        PagingResponse<PostResponse> response = camsBoardService.getBoardArticleList(articlePage);

        model.addAttribute("params", articlePage);
        model.addAttribute("boardInfo", boardInfo);
        model.addAttribute("boardArticleList", response);
        model.addAttribute("boardCnt", camsBoardService.getBoardArticleListCnt(articlePage));
        return "jsonView";
    }

    /** 일반 게시판 글쓰기 */
    @RequestMapping("/board/normalBoardWrite.do")
    public String normalBoardWrite(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));

        return "board/normalBoardWrite";
    }

    /** 일반 게시판 상세보기 */
    @RequestMapping("/board/normalBoardDetail.do")
    public String normalBoardDetail(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        camsBoardService.setBoardArticleViewCount(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/normalBoardDetail";
    }

    /** 익명 게시판 */
/*    @RequestMapping("/board/anonymousBoardList.do")
    public String anonymousBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/anonymousBoardList";
    }*/

    /** qna 게시판 */
/*    @RequestMapping("/board/qnaBoardList.do")
    public String qnaBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/qnaBoardList";
    }*/

    /** qna 게시판 글쓰기 */
/*    @RequestMapping("/board/qnaBoardWrite.do")
    public String qnaBoardWrite(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));

        return "board/qnaBoardWrite";
    }*/

    /** qna 게시판 상세보기 */
/*    @RequestMapping("/board/qnaBoardDetail.do")
    public String qnaBoardDetail(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI() + "?" + request.getQueryString());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        boardService.setBoardArticleViewCount(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/qnaBoardDetail";
    }*/

    /** fnq 게시판 */
/*    @RequestMapping("/board/faqBoardList.do")
    public String faqBoardList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "board/faqBoardList";
    }*/

    /** 글 저장 */
    @RequestMapping("/board/setBoardArticle.do")
    public String setBoardArticle(@RequestParam Map<String, Object> params, Model model){
        camsBoardService.setBoardArticle(params);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 게시글 등록 후 파일 업로드 */
    @RequestMapping("/board/setBoardAttachFileInit.do")
    public String setBoardAttachFileInit(@RequestParam Map<String, Object> params, @RequestParam("files") MultipartFile[] mpfList, HttpServletRequest request, Model model) throws IOException {
        camsBoardService.setBoardAttachFileInit(params, mpfList, SERVER_DIR, BASE_DIR);
        model.addAttribute("params", params);
        return "jsonView";
    }

    /** 게시글 정보 조회 */
    @RequestMapping("/board/getArticleInfo.do")
    public String getArticleInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", camsBoardService.getArticleInfo(params));
        return "jsonView";
    }

    /** 게시글 정보 조회(첨부파일) */
    @RequestMapping("/board/getArticleFileList.do")
    public String getArticleFileList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", camsBoardService.getArticleFileList(params));
        return "jsonView";
    }

    /** 게시글 삭제 */
    @RequestMapping("/board/setArticleDel.do")
    public String setArticleDel(@RequestParam Map<String, Object> params){
        camsBoardService.setArticleDel(params);
        return "jsonView";
    }

    /** 댓글 리스트 */
    @RequestMapping("/board/getArticleReplyList.do")
    public String getArticleReplyList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", camsBoardService.getArticleReplyList(params));
        return "jsonView";
    }

    /** 댓글 저장 */
    @RequestMapping("/board/setArticleReply.do")
    public String setArticleReply(@RequestParam Map<String, Object> params, Model model){
        camsBoardService.setArticleReply(params);
        return "jsonView";
    }

    /** 댓글 삭제 */
    @RequestMapping("/board/setArticleReplyActiveUpd.do")
    public String setArticleReplyActiveUpd(@RequestParam Map<String, Object> params){
        camsBoardService.setArticleReplyActiveUpd(params);
        return "jsonView";
    }

    @RequestMapping(value = "/board/commonBoardFileDel")
    public String commonBoardFileDel(@RequestParam Map<String, Object> params, HttpServletResponse response, Model model){
        model.addAttribute("rs", camsBoardService.getContentBoardFileOne(params));
        return "jsonView";
    }
}