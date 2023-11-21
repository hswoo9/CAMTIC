package egovframework.com.devjitsu.cam_project.controller;


import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.inside.bustrip.controller.BustripController;
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

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private ProjectRndService projectRndService;

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

    @RequestMapping("/project/getProjectData")
    public String getProjectData(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("data", projectService.getProjectData(params));

        return "jsonView";
    }

    @RequestMapping("/project/pop/viewRegProject.do")
    public String viewRegProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);
        return "popup/cam_project/regProject";
    }

    @RequestMapping("/project/pop/projectDoc.do")
    public String docViewPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/projectDoc";
    }

    @RequestMapping("/project/setProject")
    public String setProject(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.setProject(params);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

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

    /**
     * 팝업 > 업체정보 Tab
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/crmInfo.do")
    public String crmInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/engineering/crmInfo";
    }


    /**
     * 프로젝트 등록 > 엔지니어링 > 출장정보 등록
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/bustInfo.do")
    public String bustInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/engineering/bustInfo";
    }

    /**
     * 프로젝트 등록,수정 > 엔지니어링 > 견적관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/estInfo.do")
    public String estInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/engineering/estInfo";
    }

    /**
     * 프로젝트 등록,수정 > 엔지니어링 > 수주관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/delvInfo.do")
    public String delvInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_project/engineering/delvInfo";
    }

    /**
     * 프로젝트 등록, 수정 > 엔지니어링 > 계획서
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/devInfo.do")
    public String devInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/devInfo";
    }

    /**
     * 프로젝트 등록, 수정 > 엔지니어링 > 공정관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/processInfo.do")
    public String processInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/processInfo";
    }

    /**
     * 프로젝트 등록, 수정 > 엔지니어링 > 납품관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/goodsInfo.do")
    public String goodsInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/goodsInfo";
    }


    /**
     * TAB > 결과보고
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/resultInfo.do")
    public String resultInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/resultInfo";
    }

    @RequestMapping("/intra/cam_project/costPriceInfo.do")
    public String costInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/costInfo";
    }

    /**
     * TAB > 협업관리
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/intra/cam_project/teamInfo.do")
    public String teamInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/teamInfo";
    }

    @RequestMapping("/intra/cam_project/purcInfo.do")
    public String purcInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        Map<String, Object> map = projectService.getProjectData(params);
        model.addAttribute(map);

        return "popup/cam_project/engineering/purcInfo";
    }


    /**
     * 프로젝트 등록 > 업체정보 Get Data
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/project/engn/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        model.addAttribute("rs", projectService.getCrmInfo(params));

        return "jsonView";
    }

    /**
     * 프로젝트 등록 > 출장결과보고 Get Data
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/project/engn/getBustInfo")
    public String getBustInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        model.addAttribute("rs", projectService.getBustInfo(params));

        return "jsonView";
    }


    /**
     * 프로젝트 > 엔지니어링 > 수주보고 Get Data
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/project/engn/getDelvData")
    public String getDelvData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> estMap = projectService.getEstData(params);
        Map<String, Object> map = projectService.getProjectData(params);
        Map<String, Object> delvMap = projectService.getDelvData(params);
        Map<String, Object> delvFile = projectService.getDelvFile(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("estMap", estMap);
        model.addAttribute("map", map);
        model.addAttribute("delvMap", delvMap);
        model.addAttribute("delvFile", delvFile);

        return "jsonView";
    }

    @RequestMapping("/project/engn/getEstData")
    public String getEstData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectData(params);

        model.addAttribute("result", projectService.getEstData(params));
        model.addAttribute("loginVO", loginVO).addAttribute(map);

        return "jsonView";

    }

    @RequestMapping("/project/engn/getResultInfo")
    public String getResultInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getResultInfo(params);
        List<Map<String, Object>> list = projectService.getPsList(params);

        model.addAttribute("pjtInfo", projectService.getProjectData(params));
        model.addAttribute("invInfo", projectService.getInvList(params));
        model.addAttribute("result", map);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/project/engn/getResultPsMember")
    public String getResultPsMember(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.getResultPsMember(params));

        return "jsonView";
    }

    @RequestMapping("/project/engn/getTeamList")
    public String getTeamList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> map = new ArrayList<>();

        map = projectService.getTeamList(params);

        model.addAttribute("list", map);

        return "jsonView";
    }

    /**
     * 프로젝트 > 엔지니어링 > 수주보고 Set Data
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/project/engn/setEstInfo")
    public String setEstInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.setEstInfo(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 프로젝트 > 엔지니어링 > 수주보고 Set Data
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/project/engn/setDelvInfo")
    public String setDelvInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request , Model model){
        try{
            projectService.setDelvInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/project/engn/setDevInfo")
    public String setDevInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            projectService.setDevInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
        } catch( Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/setProcessInfo")
    public String setProcessInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        MultipartFile[] fileList1 = request.getFiles("fileList1").toArray(new MultipartFile[0]);
        MultipartFile[] fileList2 = request.getFiles("fileList2").toArray(new MultipartFile[0]);
        MultipartFile[] fileList3 = request.getFiles("fileList3").toArray(new MultipartFile[0]);
        MultipartFile[] fileList4 = request.getFiles("fileList4").toArray(new MultipartFile[0]);

        projectService.setProcessInfo(params, fileList1, fileList2, fileList3, fileList4, SERVER_DIR, BASE_DIR);

        return "jsonView";
    }


    @RequestMapping("/project/engn/setEstSub")
    public String setEstSub(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.setEstSub(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/engn/setEstSubMod")
    public String setEstSubMod(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.setEstSubMod(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/engn/delPjtBustrip")
    public String delPjtBustrip(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.delPjtBustrip(params);

            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/project/engn/setGoodsInfo")
    public String setGoodsInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
             Map<String, Object> map = projectService.setGoodsInfo(params, request, SERVER_DIR, BASE_DIR);

            model.addAttribute("rs", map);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/project/engn/setResultInfo")
    public String setResultInfo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            projectService.setResultInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    /**
     * 프로젝트 > 엔지니어링 > 협업 등록/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/project/engn/setTeamInfo")
    public String setTeamInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.setTeamInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getStep1Data")
    public String getStep1Data(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("result", projectService.getEstData(params));

        return "jsonView";
    }

    @RequestMapping("/project/getStep1SubData")
    public String getStep1SubData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("result", projectService.getStep1SubData(params));

        return "jsonView";
    }


    @RequestMapping("/project/groupCodeList")
    public String groupCodeList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.groupCodeList(params));

        return "jsonView";
    }

    @RequestMapping("/project/codeList")
    public String codeList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.codeList(params));

        return "jsonView";
    }


    @RequestMapping("/project/saveGroupCode")
    public String saveGroupCode(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.saveGroupCode(params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/insSetLgCode")
    public String insSetLgCode(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.insSetLgCode(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/smCodeList")
    @ResponseBody
    public List<Map<String, Object>> smCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = new ArrayList<>();

        list = projectService.smCodeList(params);
        return list;
    }

    @RequestMapping("/project/insPjtCode")
    public String insPjtCode(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.insPjtCode(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/project/selLgCode")
    public String selLgCode(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", projectService.selLgCode(params));
        model.addAttribute("list", projectService.selLgCode(params));

        return "jsonView";
    }

    @RequestMapping("/project/selSmCode")
    public String selSmCode(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", projectService.selSmCode(params));

        return "jsonView";
    }

    @RequestMapping("/project/getDevPjtVerList")
    public String getDevPjtVerList(@RequestParam Map<String, Object> params ,Model model){


        model.addAttribute("list", projectService.getDevPjtVerList(params));

        return "jsonView";
    }

    @RequestMapping("/project/getPsList")
    public String getPsList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> psList = projectService.getPsList(params);
        Map<String, Object> psFile = projectService.getPsFile(params);
        model.addAttribute("psList", psList);
        model.addAttribute("psFileList", psFile);
        return "jsonView";
    }

    @RequestMapping("/project/engn/getDevData")
    public String getDevData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        model.addAttribute("rs", projectService.getDevData(params));

        return "jsonView";
    }

    @RequestMapping("/project/insPjtPs")
    public String insPjtPs(@RequestParam Map<String, Object> params ,Model model){

        try{
            projectService.insPjtPs(params);
            model.addAttribute("rep", params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getProcessList")
    public String getProcessList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", projectService.getProcessList(params));

        return "jsonView";
    }

    @RequestMapping("/project/updProcess")
    public String updProcess(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.updProcess(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/delProcess")
    public String delProcess(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.delProcess(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/project/insInvData")
    public String insInvData(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.insInvData(params);
            model.addAttribute("rep", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getInvList")
    public String getInvList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.getInvList(params));

        return "jsonView";
    }

    @RequestMapping("/project/updInvest")
    public String updInvest(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.updInvest(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/delInvest")
    public String delInvest(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.delInvest(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }



    @RequestMapping("/project/getDevelopPlan")
    public String getDevelopPlan(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = projectService.getDevelopPlan(params);
        Map<String, Object> devFile = projectService.getDevFile(map);
        model.addAttribute("rs", map);
        model.addAttribute("devFile", devFile);

        return "jsonView";
    }

    @RequestMapping("/project/getPjtSnToDev")
    public String getPjtSnToDev(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = projectService.getPjtSnToDev(params);

        model.addAttribute("rs", map);

        return "jsonView";
    }

    @RequestMapping("/project/insStep4")
    public String insStep4(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.insStep4(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/updStep5")
    public String updStep5(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.updStep5(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    /**
     * 엔지니어링 업체정보 저장
     *
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/project/engn/setCrmInfo")
    public String setCrmInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.setEngnCrmInfo(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 프로젝트 등록 > 출장정보 저장(Insert, Update)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/project/engn/setBustInfo")
    public String setBustInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.setBustInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/engn/setCostInfo")
    public String setCostInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.setCostInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 프로젝트 결재문서 정보 조회 */
    @RequestMapping("/project/getProjectDocInfo")
    public String getProjectDocInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", projectService.getProjectDocInfo(params));

        return "jsonView";
    }

    /** 수주관리 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/delvApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/delvApprovalPop";
    }

    /** 개발계획서 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/devApprovalPop.do")
    public String devApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        model.addAttribute("processList", projectService.getProcessList(params));
        model.addAttribute("invList", projectService.getInvList(params));
        Map<String, Object> map = projectService.getPjtSnToDev(params);
        params.put("pjtSn", map.get("PJT_SN"));
        return "/popup/cam_project/approvalFormPopup/devApprovalPop";
    }

    /** 결과보고서 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/resApprovalPop.do")
    public String resApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        model.addAttribute("processList", projectService.getProcessList(params));
        model.addAttribute("invList", projectService.getInvList(params));
        return "/popup/cam_project/approvalFormPopup/resApprovalPop";
    }

    /** 원가보고서 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/costApprovalPop.do")
    public String costApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        model.addAttribute("processList", projectService.getProcessList(params));
        model.addAttribute("invList", projectService.getInvList(params));
        return "/popup/cam_project/approvalFormPopup/costApprovalPop";
    }

    /** 수주관리 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/project/delvReqApp")
    public String delvReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectService.updateDelvDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 개발계획서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/project/devReqApp")
    public String devReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectService.updateDevDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 결과보고서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/project/resReqApp")
    public String resReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectService.updateResDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 원가보고서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/project/costReqApp")
    public String costReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectService.updateCostDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/project/stopProject")
    public String stopProject(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.stopProject(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/updPjtDevTotAmt")
    public String updPjtDevTotAmt(@RequestParam Map<String, Object> params){
        projectService.updPjtDevTotAmt(params);

        return "jsonView";
    }

    @RequestMapping("/project/pop/estPrintPop.do")
    public String estPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/cam_project/estPrintPop";
    }

    @RequestMapping("/project/pop/goodsPrintPop.do")
    public String goodsPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/cam_project/goodsPrintPop";
    }

    @RequestMapping("/project/pop/partRate.do")
    public String partRate(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        Map<String, Object> data = projectService.getPartRateVer(params);

        params.put("pjtSn", data.get("PJT_SN"));
        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", map);
        model.addAttribute("data", data);
        model.addAttribute("params", params);

        return "popup/cam_project/partRate";
    }

    @RequestMapping("/project/confirmPartRate")
    public String confirmPartRate(@RequestParam Map<String, Object> params, Model model) {

        try{
            projectService.confirmPartRate(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getPartRateVerData")
    public String getPartRateVerData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> map = projectService.getPartRateVer(params);
        model.addAttribute("map", map);

        Map<String, Object> pjtMap = projectService.getProjectData(params);
        map.put("busnClass", pjtMap.get("BUSN_CLASS"));
        Map<String, Object> result = projectService.getMngPartRate(map);
        model.addAttribute("result", result);
        if(map != null){
            List<Map<String, Object>> fileList = projectRndService.getFileList(map);

            model.addAttribute("fileList", fileList);
        }

        return "jsonView";
    }

    @RequestMapping("/project/pop/projectView.do")
    public String projectView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);

        return "popup/cam_project/projectView";
    }

    /** 프로젝트 합계 정보 */
    @RequestMapping("/project/getProjectTotalData")
    public String getProjectTotalData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", projectService.getProjectTotalData(params));
        return "jsonView";
    }

    @RequestMapping("/project/delTeamProject")
    public String delTeamProject(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.delTeamProject(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/getBankData")
    public String getBankData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", projectService.getBankData(params));

        return "jsonView";
    }

    @RequestMapping("/project/getTeamProjectList")
    public String getTeamProjectList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.getTeamProjectList(params));

        return "jsonView";
    }

    @RequestMapping("/project/partRateEmpInfo")
    public String partRateEmpInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectService.getPartRateEmpInfo(params));

        return "jsonView";
    }

    @RequestMapping("/test/test123")
    public String test(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("rs", projectService.test(params));

        return "jsonView";
    }

    @RequestMapping("/project/updJoinMember")
    public String updJoinMember(@RequestParam Map<String, Object> params, Model model){

        projectService.updJoinMember(params);

        return "jsonView";
    }

    @RequestMapping("/intra/cam_project/budgetChangeInfo.do")
    public String budgetChangeInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "popup/cam_project/budgetChangeInfo";
    }
}
