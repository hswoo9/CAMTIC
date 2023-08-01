package egovframework.com.devjitsu.cam_project.controller;


import egovframework.com.devjitsu.cam_project.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class ProjectController {

    @Autowired
    private ProjectService projectService;


    @RequestMapping("/project/viewProject.do")
    private String viewProject(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_project/viewProject";
    }

}
