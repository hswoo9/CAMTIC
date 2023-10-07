package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectRndController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRndService projectRndService;


    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    /* View Line ==================================================== */

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
     * 프로젝트 R&D > TAB0 > 등록정보
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectRnd/detailInfo.do")
    public String detailInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/detailInfo";
    }

    /**
     * 프로젝트 > TAB1 > 연구원관리
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

    @RequestMapping("/projectRnd/partRate.do")
    public String partRate(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/partRateInfo";
    }

    @RequestMapping("/projectRnd/reqPartRate.do")
    public String reqPartRate(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/reqPartRateInfo";
    }

    /**
     * 프로젝트 > TAB2 > 개발계획
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
     * 프로젝트 R&D > TAB3 > 개발일지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/rndDevJob.do")
    public String rndDevJob(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/devJobInfo";
    }

    /**
     * 프로젝트 R&D > TAB4 > 입출금대장관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/payMvInfo.do")
    public String payMvInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/payMoveInfo";
    }

    /**
     * 프로젝트 R&D > TAB5 > 예산관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/budgetInfo.do")
    public String budgetInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/budgetInfo";
    }

    /**
     * 프로젝트 R&D > TAB6 > 연구비신청
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/rschPayReqInfo.do")
    public String rschPayReqInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/rschPayReqInfo";
    }


    /**
     * 프로젝트 R&D > TAB7 > 연구비정산
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/rschPayRepInfo.do")
    public String rschPayRepInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/rnd/rschPayRepInfo";
    }


    /* Popup Line =================================================== */

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

    /**
     * 개발일정 일괄등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/pop/popTotDevSch.do")
    public String popTotDevSch(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/totDevSch";
    }

    @RequestMapping("/projectRnd/pop/popDevJob.do")
    public String popDevJob(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/devJob";
    }

    @RequestMapping("/projectRnd/pop/popBudget.do")
    public String popBudget(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/budget";
    }


    /* Get Data Line =====================================================*/

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

    /**
     * 연구원등록 Valid 체크
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/getRschData")
    public String getRschData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = new HashMap<>();
        map = projectRndService.getRschData(params);

        int validRschCnt = projectRndService.getRschCount(map);

        model.addAttribute("cnt", validRschCnt);

        return "jsonView";
    }

    /**
     * 개발일정 전체 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/getRndDevScheduleList")
    public String getRndDevScheduleList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectRndService.getRndDevScheduleList(params));

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getRndDevJobList")
    public String getRndDevJobList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", projectRndService.getRndDevJobList(params));

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getDevSchInfo")
    public String getDevSchInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", projectRndService.getDevSchInfo(params));

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getRndDetail")
    public String getRndDetail(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("map", projectRndService.getRndDetail(params));

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getReqPartRateData")
    public String getReqPartRateData(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> map = projectRndService.getReqPartRateData(params);
        model.addAttribute("map", map);

        if(map != null){
            List<Map<String, Object>> fileList = projectRndService.getFileList(map);

            model.addAttribute("fileList", fileList);
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/getReqPartRateVerList")
    public String getReqPartRateVerList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", projectRndService.getReqPartRateVerList(params));

        return "jsonView";
    }



    /* Set Data Line ==================================================== */

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

    @RequestMapping("/projectRnd/setDevJobInfo")
    public String setDevJobInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            projectRndService.setDevJobInfo(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/setRndDetail")
    public String setRndDetail(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setRndDetail(params);
            model.addAttribute("code", 200);
            model.addAttribute("rs", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/setDelvApprove")
    public String setDelvApprove(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setDelvApprove(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/projectRnd/setReqPartRateData")
    public String setReqPartRateData(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            projectRndService.setReqPartRateData(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/setPartRateRequest")
    public String setPartRateRequest(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setPartRateRequest(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

}
