package egovframework.com.devjitsu.cam_project.controller;


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

//        model.addAttribute("list", projectService.getProjectList(params));

        /* 임시 데이터 */
        List<Map<String, Object>> list = new ArrayList<>();

        for (int i = 0 ; i < 4 ; i++){
            Map<String, Object> map = new HashMap<>();

            if(i == 0){
                map.put("A", "엔지니어링");
                map.put("B", "상담");
                map.put("C", "");
                map.put("D", "상담1");
                map.put("E", "주식회사 데브짓수");
                map.put("F", "2023-01-30");
                map.put("G", "2023-09-30");
                map.put("H", "");
                map.put("I", "100,000,000");
                map.put("J", "이 호");
                map.put("K", "");
            } else if (i == 1){
                map.put("A", "엔지니어링");
                map.put("B", "납품");
                map.put("C", "");
                map.put("D", "상담2");
                map.put("E", "주식회사 데브짓수");
                map.put("F", "2023-01-30");
                map.put("G", "2023-09-30");
                map.put("H", "");
                map.put("I", "800,000,000");
                map.put("J", "이 호");
                map.put("K", "");
            } else if ( i == 2){
                map.put("A", "엔지니어링");
                map.put("B", "개발계획");
                map.put("C", "");
                map.put("D", "상담3");
                map.put("E", "주식회사 데브짓수");
                map.put("F", "2023-01-30");
                map.put("G", "2023-09-30");
                map.put("H", "");
                map.put("I", "200,000,000");
                map.put("J", "이 호");
                map.put("K", "");
            } else {
                map.put("A", "엔지니어링");
                map.put("B", "원가보고");
                map.put("C", "");
                map.put("D", "상담4");
                map.put("E", "주식회사 데브짓수");
                map.put("F", "2023-01-30");
                map.put("G", "2023-09-30");
                map.put("H", "2023-08-03");
                map.put("I", "300,000,000");
                map.put("J", "이 호");
                map.put("K", "");
            }


            list.add(map);
        }

        model.addAttribute("list", list);


        return "jsonView";
    }

    @RequestMapping("/project/pop/viewRegProject.do")
    public String viewRegProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "popup/cam_project/regProject";
    }

    @RequestMapping("/project/setProject")
    public String setProject(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("projectFile").toArray(new MultipartFile[0]);
        projectService.setProject(params, file, SERVER_DIR, BASE_DIR);

        return "jsonView";
    }



}
