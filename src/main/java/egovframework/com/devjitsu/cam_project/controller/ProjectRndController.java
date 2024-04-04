package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class ProjectRndController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectRndController.class);

    @Autowired
    private ProjectService projectService;

    @Autowired
    private ProjectRndService projectRndService;

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

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
     * 프로젝트 R&D > TAB8 > 결과보고
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/resultInfo.do")
    public String resultInfo(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/resultInfo";
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
        model.addAttribute("map", projectRndService.getPjtDevSchData(params));

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

    /**
     * 프로젝트 RND > 사업비 분리사용시 분리사용 항목 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/getAccountInfo")
    public String getAccountInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", projectRndService.getAccountInfo(params));
        return "jsonView";
    }

    /**
     * 프로젝트 RND > 예산변경 및 반납 전자결재 리스트 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/getChangeList")
    public String getChangeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", projectRndService.getChangeList(params));
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
            //map = projectRndService.getRschData(params);
            map = userService.getUserInfo(params);
            map.put("pjtSn", params.get("pjtSn"));
            map.put("regEmpSeq", params.get("regEmpSeq"));
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
     * 연구원관리 > 실제 참여자 체크
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/updRschStatus")
    public String updRschStatus(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.updRschStatus(params);
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
    public String setRndDetail(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            projectRndService.setRndDetail(params, request, SERVER_DIR, BASE_DIR);
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

    @RequestMapping("/projectRnd/setPartRateDetail")
    public String setPartRateDetail(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.setPartRateDetail(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/checkPartRateDetail")
    public String checkPartRateDetail(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.checkPartRateDetail(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/projectRnd/setReqPartRateStatus")
    public String setReqPartRateStatus(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.setReqPartRateStatus(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectRnd/tmpUpdDevPlanApprove")
    public String tmpUpdDevPlanApprove(@RequestParam Map<String, Object> params, Model model){
        try{
            projectRndService.tmpUpdDevPlanApprove(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 연구원관리 > 실제 참여자 등록시 결과보고 유저 테이블에 insert
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/insPjtPsRnd")
    public String insPjtPsRnd(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.insPjtPsRnd(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 연구원관리 > 실제 참여자 취소시 결과보고 유저 테이블에 delete
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectRnd/delPjtPsRnd")
    public String delPjtPsRnd(@RequestParam Map<String, Object> params, Model model){

        try{
            projectRndService.delPjtPsRnd(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 사업정보 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/rndDelvApprovalPop.do")
    public String rndDelvApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        model.addAttribute("processList", projectService.getProcessList(params));
        return "/popup/cam_project/approvalFormPopup/rndDelvApprovalPop";
    }

    /** 계획서보고 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/rndDevApprovalPop.do")
    public String rndDevApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        Map<String, Object> map = projectService.getPjtSnToDev(params);
        params.put("pjtSn", map.get("PJT_SN"));
        return "/popup/cam_project/approvalFormPopup/rndDevApprovalPop";
    }

    /** 결과보고 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/rndResApprovalPop.do")
    public String rndResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/rndResApprovalPop";
    }

    /** 세세목변경서 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/changeApprovalPop.do")
    public String changeApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/changeApprovalPop";
    }

    /** 반납신청서 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/reApprovalPop.do")
    public String reApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/reApprovalPop";
    }

    /** 참여율변경공문 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/rateChangeApprovalPop.do")
    public String rateChangeApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/rateChangeApprovalPop";
    }

    /** 사업정보 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/delvReqApp")
    public String delvReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateRndDelvDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 계획서보고 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/devReqApp")
    public String devReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateRndDevDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 결과보고 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/resReqApp")
    public String resReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateRndResDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 세세목변경서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/changeReqApp")
    public String changeReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateChangeDocState(bodyMap, 1);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 반납신청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/reReqApp")
    public String reReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateChangeDocState(bodyMap, 2);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 참여연구원변경공문 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectRnd/rateReqApp")
    public String rateReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectRndService.updateRateDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/projectRnd/delDevSch")
    public String delDevSch(@RequestParam Map<String, Object> params, Model model) {

        projectRndService.delDevSch(params);

        return "jsonView";
    }

    @RequestMapping("/projectRnd/pop/partRatePrintPop.do")
    public String partRatePrintPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        System.out.println("****params : "+params);
        model.addAttribute("pjtSn", params.get("pjtSn"));
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        return "popup/cam_project/rnd/partRatePrintPop";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }
}
