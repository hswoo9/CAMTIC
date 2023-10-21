package egovframework.com.devjitsu.cams_pot.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cams_pot.service.CustomBoardService;
import egovframework.com.devjitsu.cams_pot.service.camsBoardService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
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
import java.util.Map;

@Controller
public class CustomBoardController {

    @Autowired
    private CustomBoardService customBoardService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

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
     * 게시글 삭제
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
     * 캠스팟 > 직원일정
     * @param request
     * @return
     */
    @RequestMapping("/spot/empScheduleList.do")
    public String empScheduleList(HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
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
     * 캠스팟 > 일정상세보기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/spot/pop/popScheduleView.do")
    public String popScheduleView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", customBoardService.getSchedule(params));
        return "popup/cams_pot/popScheduleView";
    }
}