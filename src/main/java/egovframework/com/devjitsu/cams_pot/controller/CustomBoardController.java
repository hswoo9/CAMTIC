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