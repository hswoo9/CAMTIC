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

    /** new 엔지니어링 협업등록 */
    @RequestMapping("/intra/cam_project/teamReqPop.do")
    public String teamReqPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/teamReqPop";
    }

    /** new 엔지니어링 협업 승인요청 리스트 */
    @RequestMapping("/intra/cam_project/teamMng.do")
    public String teamMng(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_project/teamMng";
    }

    /** 협업 리스트 */
    @RequestMapping("/intra/cam_project/teamList.do")
    public String teamList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_project/teamList";
    }

    /** new 엔지니어링 협업등록 */
    @RequestMapping("/intra/cam_project/setTeamProject.do")
    public String setTeamProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/setTeamProject";
    }

    /** new 엔지니어링 협업보고서 */
    @RequestMapping("/project/pop/teamPrintPop.do")
    public String estPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/cam_project/teamPrintPop";
    }

    /** 협업 버전 정보 조회 */
    @RequestMapping("/project/team/getTeamVersion")
    public String getTeamVersion(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamVersion(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 해당 버전 협업 리스트 조회 */
    @RequestMapping("/project/team/getTeamList")
    public String getTeamList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/project/team/getTeamList2")
    public String getTeamList2(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamList2(params);
        model.addAttribute("list", list);

        long expAmtSum = 0;
        for(Map<String, Object> map : list){
            expAmtSum += Long.parseLong(map.get("TM_EXP_AMT").toString());
        }

        model.addAttribute("expAmtSum", expAmtSum);

        return "jsonView";
    }

    /** 프로젝트 협업 승인요청 리스트 */
    @RequestMapping("/project/team/getTeamMngList")
    public String getTeamMngList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamMngList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 프로젝트 전체 협업 리스트 */
    @RequestMapping("/project/team/getTeamListAll")
    public String getTeamListAll(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamListAll(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 협업 g20 예산 배분 리스트 */
    @RequestMapping("/project/team/getTeamBudgetList")
    public String getTeamBudgetList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        List<Map<String, Object>> list = projectTeamService.getTeamBudgetList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    /** 해당 버전 수주부서 남은 잔액 조회 */
    @RequestMapping("/project/team/getVerLeftAmt")
    public String getVerLeftAmt(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        Map<String, Object> data = projectTeamService.getVerLeftAmt(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    /** 협업 정보 단일 데이터 */
    @RequestMapping("/project/team/getTeamData")
    public String getTeamData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        Map<String, Object> data = projectTeamService.getTeamData(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    /** 수주부서 상신 체크용 마지막 버전 조회 */
    @RequestMapping("/project/team/getLastVerTeamData")
    public String getLastVerTeamData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        Map<String, Object> data = projectTeamService.getLastVerTeamData(params);
        model.addAttribute("data", data);

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
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    /** 자가부서 예상비용 저장 */
    @RequestMapping("/project/team/updMyTeam")
    public String updMyTeam(@RequestParam Map<String, Object> params, Model model){
        try{
            projectTeamService.updMyTeam(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    /** 협업 팀 추가/수정 */
    @RequestMapping("/project/team/setTeam")
    public String setTeam(@RequestParam Map<String, Object> params, Model model){
        try{
            projectTeamService.setTeam(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    /** 협업 팀 삭제 */
    @RequestMapping("/project/team/delTeam")
    public String delTeam(@RequestParam Map<String, Object> params, Model model){
        try{
            projectTeamService.delTeam(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }

    /** 협업 승인 프로세스 */
    @RequestMapping("/project/team/updTeamVersionAppStat")
    public String updTeamVersionAppStat(@RequestParam Map<String, Object> params, Model model){
        try{
            projectTeamService.updTeamVersionAppStat(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
            model.addAttribute("code", 500);
        }
        return "jsonView";
    }
}
