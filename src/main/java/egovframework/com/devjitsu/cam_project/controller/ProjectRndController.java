package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class ProjectRndController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRndService projectRndService;

    @RequestMapping("/projectRnd/pop/regProject.do")
    public String regProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/regProject";
    }

    @RequestMapping("/projectRnd/setSubjectInfo")
    public String setSubjectInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.setSubjectInfo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 프로젝트 > TAB0 > 연구원관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectRnd/researcherInfo.do")
    public String researcherInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/researcherInfo";
    }

    /**
     * 프로젝트 > TAB1 > 개발계획
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/rndDevPlan.do")
    public String rndDevPlan(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/devPlanInfo";
    }

    /**
     * 프로젝트 R&D > TAB2 > 개발일정
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/rndDevSchedule.do")
    public String rndDevSchedule(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/devScheduleInfo";
    }

    /**
     * 전체 연구원 조회 팝업
     * @return
     */
    @RequestMapping("/projectRnd/pop/popRschList.do")
    public String popRschList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");


        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/rschList";
    }

    /**
     * 개발일정 등록 개별 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/pop/popDevSch.do")
    public String popDevSch(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/devSch";
    }

    @RequestMapping("/projectRnd/pop/popTotDevSch.do")
    public String popTotDevSch(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/totDevSch";
    }


    /**
     * 프로젝트 RND > Tab0 > 등록된 연구원 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/getRschInfo")
    public String getRschInfo(@RequestParam Map<String, Object> params, Model model){


        model.addAttribute("list", projectRndService.getPjtRschInfo(params));
        return "jsonView";
    }


    /**
     * 연구원데이터 전체 조회
     * @param model
     * @param params
     * @return
     */
    @RequestMapping("/projectRnd/getPopRschList")
    public String getPopRschList(Model model, @RequestParam Map<String, Object> params){

        model.addAttribute("list", projectRndService.getPopRschList(params));

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getRschData")
    public String getRschData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = new HashMap<>();
        map = projectRndService.getRschData(params);

        int validRschCnt = projectRndService.getRschCount(map);

        model.addAttribute("cnt", validRschCnt);

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getRndDevScheduleList")
    public String getRndDevScheduleList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectRndService.getRndDevScheduleList(params));

        return "jsonView";
    }

    /**
     * 프로젝트 연구원 등록
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/setRschData")
    public String setRschData(@RequestParam Map<String, Object> params, Model model){
        try{
            Map<String, Object> map = new HashMap<>();
            map = projectRndService.getRschData(params);
            map.put("pjtSn", params.get("pjtSn"));
            map.put("empSeq", params.get("empSeq"));
            projectRndService.setRschData(map);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 연구원관리 > 삭제 처리
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/delRschData")
    public String delRschData(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.delRschData(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 개발계획 > 버전 변경 및 확인
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/setDevPjtVer")
    public String setDevPjtVer(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setDevPjtVer(params);
            model.addAttribute("params", params);

            model.addAttribute("rs", projectService.getDevPjtVerList(params));
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    /**
     * 개발 계획 > 특이사항 작성
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/setDevInfo")
    public String setDevInfo(@RequestParam Map<String, Object> params, Model model){
        projectRndService.setDevInfo(params);

        return "jsonView";
    }

    @RequestMapping("/projectRnd/setDevSchData")
    public String setDevSchData(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setDevSchData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

}
