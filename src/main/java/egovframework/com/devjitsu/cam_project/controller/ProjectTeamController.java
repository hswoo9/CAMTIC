package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectTeamService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectTeamController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectTeamController.class);

    @Autowired
    private ProjectService projectService;
    @Autowired
    private ProjectTeamService projectTeamService;
    @Autowired
    private CommonCodeService commonCodeService;
    @Autowired
    private ProjectRndService projectRndService;
    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;
    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    /** new 엔지니어링 협업관리 */
    @RequestMapping("/intra/cam_project/teamInfoEngn.do")
    public String teamInfoEngn(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/teamInfoEngn";
    }

    /** 협업 버전 정보 조회 */
    @RequestMapping("/project/team/getTeamVersion")
    public String getTeamVersion(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamVersion(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 협업 새 버전 추가 */
    @RequestMapping("/project/team/setTeamAddVersion")
    public String setTeamAddVersion(@RequestParam Map<String, Object> params, Model model){
        try{
            projectTeamService.setTeamAddVersion(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 200);
        }
        return "jsonView";
    }
}
