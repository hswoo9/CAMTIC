package egovframework.com.devjitsu.hp.board.controller;

import egovframework.com.devjitsu.hp.board.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    //공지사항
    @RequestMapping("/camtic/news/notice.do")
    public String Nnotice(Model model, HttpServletRequest request){



        return "camtic/news/notice";
    }
    //사업공고
    @RequestMapping("/camtic/news/business.do")
    public String Nbusiness(){ return "camtic/news/business"; }
    //교육/행사
    @RequestMapping("/camtic/news/study.do")
    public String Nstudy(){ return "camtic/news/study"; }
    //유관기관소식
    @RequestMapping("/camtic/news/partner.do")
    public String Npartner(){ return "camtic/news/partner"; }
    @RequestMapping("/camtic/news/view.do")
    public String Nview(){ return "camtic/news/view"; }




}
