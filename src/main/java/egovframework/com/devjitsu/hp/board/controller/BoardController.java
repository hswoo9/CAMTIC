package egovframework.com.devjitsu.hp.board.controller;

import egovframework.com.devjitsu.hp.board.service.BoardService;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    /**
     * 공지사항
     * */
    @RequestMapping("/camtic/news/notice.do")
    public String notice(Model model, HttpServletRequest request, ArticlePage articlePage){
        articlePage.setSearchCategory("notice");
        PagingResponse<PostResponse> list = boardService.selectBoardList(articlePage);
        model.addAttribute("list", list);
        return "camtic/news/notice";
    }

    /**
     * 공지사항 상세보기
     * */
    @RequestMapping("/camtic/news/view.do")
    public String noticeView(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        Map<String, Object> map = boardService.selectBoard(params);
        model.addAttribute("map", map);
        return "camtic/news/view";
    }

    /**
     * 게시글 작성
     * */
    @RequestMapping("/camtic/news/write.do")
    public String noticeWrite(Model model){
        return "camtic/news/write";
    }

    /**
     * 게시글 수정
     * */
    @RequestMapping("/camtic/news/register.do")
    public String noticeRegister(Model model, HttpServletRequest request, @RequestParam Map<String, Object> params){
        Map<String, Object> map = boardService.selectBoard(params);
        model.addAttribute("map", map);
        return "camtic/news/register";
    }

    @RequestMapping("/camtic/news/insNotice.do")
    public String insNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.insertBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    @RequestMapping("/camtic/news/updNotice.do")
    public String updNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.updateBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }

    @RequestMapping("/camtic/news/deleteBoard.do")
    public String delNotice(Model model, @RequestParam Map<String, Object> params){
        boardService.deleteBoard(params);

        model.addAttribute("rs", "sc");
        return "jsonView";
    }




    /*//사업공고
    @RequestMapping("/camtic/news/business.do")
    public String Nbusiness(){ return "camtic/news/business"; }
    //교육/행사
    @RequestMapping("/camtic/news/study.do")
    public String Nstudy(){ return "camtic/news/study"; }
    //유관기관소식
    @RequestMapping("/camtic/news/partner.do")
    public String Npartner(){ return "camtic/news/partner"; }
    @RequestMapping("/camtic/news/view.do")
    public String Nview(){ return "camtic/news/view"; }*/




}
