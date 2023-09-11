package egovframework.com.devjitsu.cam_project.controller;


import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
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

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectController.class);

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

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);
        return "popup/cam_project/regProject";
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

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("estMap", estMap);
        model.addAttribute("map", map);
        model.addAttribute("delvMap", delvMap);

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
    public String setDelvInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.setDelvInfo(params);
            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/project/engn/setDevInfo")
    public String setDevInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectService.setDevInfo(params);
            model.addAttribute("code", 200);
        } catch( Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/project/insStep3")
    public String insStep3(@RequestParam Map<String, Object> params, Model model){

        try{
            projectService.insStep3(params);
            model.addAttribute("code", 200);
        } catch( Exception e){
            e.printStackTrace();
        }

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

    @RequestMapping("/project/insStep2")
    public String insStep2(@RequestParam Map<String, Object> params, Model model){

        // 프로젝트 코드 생성 요기서 (나중에 전자결재 결재완료시 옮김)
        
        try{
            projectService.insStep2(params);

            // 추후 전자결재가 붙으면 결재완료 시 업데이트 되는거로 변경
            projectService.updProjectDelv(params);


            model.addAttribute("code", 200);
            model.addAttribute("rep", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


    @RequestMapping("/project/codeManagement.do")
    public String codeManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_project/codeManagement";
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

    /** 수주관리 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/delvApprovalPop.do")
    public String equipApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/delvApprovalPop";
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


}
