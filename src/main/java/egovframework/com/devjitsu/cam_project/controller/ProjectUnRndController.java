package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

@Controller
public class ProjectUnRndController {

    @Autowired
    private ProjectUnRndService projectUnRndService;

    @Autowired
    private ProjectRndService projectRndService;

    @Autowired
    private ProjectService projectService;

    @RequestMapping("/projectUnRnd/pop/regProject.do")
    public String regProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/regProject";
    }


    /**
     * 프로젝트 비R&D > TAB0 > 사업정보
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectUnRnd/detailInfo.do")
    public String detailInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/detailInfo";
    }


    /**
     * 기존 등록정보 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectUnRnd/setSubjectInfo")
    public String setSubjectInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.setSubjectInfo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
