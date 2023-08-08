package egovframework.com.devjitsu.cam_project.controller;


import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @RequestMapping("/project/viewProject.do")
    private String viewProject(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        return "cam_project/viewProject";
    }

    @RequestMapping("/project/getProjectList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String,Object>> list = projectService.getProjectList(params);

        model.addAttribute("list", list);


        return "jsonView";
    }

    @RequestMapping("/project/pop/viewRegProject.do")
    public String viewRegProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep1(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        return "popup/cam_project/regProject";
    }

    @RequestMapping("/project/setProject")
    public String setProject(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("projectFile").toArray(new MultipartFile[0]);
        projectService.setProject(params, file, SERVER_DIR, BASE_DIR);

        return "jsonView";
    }

    @RequestMapping("/project/delProject")
    public String delProject(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.delProject(params);

            model.addAttribute("rs", "SC");

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/pop/engnStep.do")
    public String engnStep(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute("loginVO", loginVO)
                .addAttribute("menuCd", "ES" + params.get("step"))
                .addAttribute(map);


        return "popup/cam_project/engineering/step" + params.get("step");
    }

    @RequestMapping("/project/insStep1")
    public String insStep1(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.insStep1(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/insStep1Sub")
    public String insStep1Sub(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.insStep1Sub(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getStep1Data")
    public String getStep1Data(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("result", projectService.getStep1Data(params));

        return "jsonView";
    }

    @RequestMapping("/project/getStep1SubData")
    public String getStep1SubData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("result", projectService.getStep1SubData(params));

        return "jsonView";
    }

}
