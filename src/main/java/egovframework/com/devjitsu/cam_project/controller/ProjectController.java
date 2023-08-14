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
        Map<String, Object> estMap = projectService.getStep1EstData(params);
        Map<String, Object> pmInfo = projectService.getStep3PmInfo(params);

        model.addAttribute("loginVO", loginVO)
                .addAttribute("menuCd", "ES" + params.get("step"))
                .addAttribute(map).addAttribute("estMap", estMap).addAttribute("pmInfo", pmInfo);


        return "popup/cam_project/engineering/step" + params.get("step");
    }

    @RequestMapping("/project/getPsList")
    public String getPsList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> psList = projectService.getPsList(params);

        model.addAttribute("psList", psList);

        return "jsonView";
    }

    @RequestMapping("/project/getStep2DelvData")
    public String getStep2DelvData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("map", projectService.getStep2DelvData(params));

        return "jsonView";
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
}
