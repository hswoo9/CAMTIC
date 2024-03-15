package egovframework.com.devjitsu.cam_manager.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

@Controller
public class ManageController {

    @Autowired
    private ManageService manageService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private G20Service g20Service;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    @RequestMapping("/mng/pop/budgetView.do")
    public String budgetView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        //Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        //model.addAttribute("map", new Gson().toJson(map));
        //model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_manager/budgetView";
    }

    @RequestMapping("/mng/pop/bankView.do")
    public String bankView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/bankView";
    }

    @RequestMapping("/mng/pop/paymentDetView.do")
    public String paymentDetView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/paymentDetView";
    }

    @RequestMapping("/mng/pop/paymentCardHistory.do")
    public String paymentCardHistory(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/paymentCardHistory";
    }

    @RequestMapping("/mng/pop/paymentEtaxHistory.do")
    public String paymentEtaxHistory(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/paymentEtaxHistory";
    }

    @RequestMapping("/mng/pop/addClientView.do")
    public String addClientView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/addClientView";
    }

    @RequestMapping("/mng/pop/addEmpView.do")
    public String addEmpView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/addEmpView";
    }

    @RequestMapping("/mng/getMemList")
    public String getMemList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = manageService.getMemList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/mng/budgetList.do")
    public String budgetList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/budget/budgetList";
    }

    @RequestMapping("/mng/budgetDetailList.do")
    public String budgetDetailList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/budget/budgetDetailList";
    }

    @RequestMapping("/mng/getBudgetList")
    public String getBudgetList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = new ArrayList<>();
        list = g20Service.getBudgetList(params);

        List<Map<String, Object>> listMap = new ArrayList<>();

//        for(int i = 0 ; i < list.size() ; i++){
//            Map<String, Object> bsMap = new HashMap<>();
//            bsMap = manageService.getProjectData(list.get(i));
//
//            if(bsMap != null){
//                list.get(i).put("REG_DT", bsMap.get("PJT_REG_DT"));
//            }
//        }

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/mng/duzonlink.do")
    public String duzonlink(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/duzonlink";
    }

    @RequestMapping("/mng/enaralink.do")
    public String enaralink(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "cam_manager/enaralink";
    }

    @RequestMapping("/mng/pop/userPartRate.do")
    public String userPartRate(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(params.containsKey("adminYn")){
            params.put("adminYn", "Y");
        }

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("empInfo", manageService.getEmpInfo(params));
        model.addAttribute("params", params);
        if(params.containsKey("pjtSn")){
            model.addAttribute("projectInfo", projectService.getProjectData(params));
        }
        return "popup/cam_manager/partRate/userPartRate";
    }

    @RequestMapping("/mng/userPartRateInfo")
    public String userPartRateInfo(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = manageService.getUserPartRateInfo(params);
        List<Map<String, Object>> userSalList = manageService.getUserSalList(params);

        model.addAttribute("list", list);
        model.addAttribute("userSalList", userSalList);
        return "jsonView";
    }

    @RequestMapping("/mng/checkExnpDetData")
    public String checkExnpDetData(@RequestParam Map<String, Object> params, Model model){
        try{
            List<Map<String, Object>> list = manageService.checkExnpDetData(params);
            model.addAttribute("list", list);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 캠매니저 > 설정관리 > 프로젝트 관리 > 프로젝트 팝업창 */
    @RequestMapping("/mng/pop/projectMngPop.do")
    public String projectMngPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getG20ProjectData(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_manager/projectMngPop";
    }

    @RequestMapping("/mng/getG20ProjectData")
    public String getG20ProjectData(@RequestParam Map<String, Object> params, Model model){
        try{
            Map<String, Object> data = projectService.getG20ProjectData(params);
            model.addAttribute("data", data);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /** 캠매니저 > 설정관리 > 프로젝트 예산관리 > 프로젝트 팝업창 > 수익/비용 탭 */
    @RequestMapping("/mng/pop/incmExpInfo.do")
    public String incmExpInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        params.put("chk", manageService.getProjectBgtCheck(params));
        model.addAttribute("params", params);
        model.addAttribute("paramsMap", new Gson().toJson(params));

        return "popup/cam_manager/incmExpInfo";
    }

    @RequestMapping("/mng/insIncmExpInfo")
    public String insIncmExpInfo(@RequestParam Map<String, Object> params){
        manageService.insIncmExpInfo(params);
        return "jsonView";
    }

    @RequestMapping("/mng/getProjectBgtList")
    public String getProjectBgtList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", manageService.getProjectBgtList(params));
        return "jsonView";
    }

    /** 캠매니저 > 설정관리 > 프로젝트 예산관리 > 프로젝트 팝업창 > 예산비목 탭 */
    @RequestMapping("/mng/pop/bgtItemInfo.do")
    public String bgtItemInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("paramsMap", new Gson().toJson(params));
        model.addAttribute("data", projectService.getG20ProjectData(params));


        return "popup/cam_manager/bgtItemInfo";
    }

    @RequestMapping("/mng/pop/budgetListDetail.do")
    public String budgetListDetail(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20Info", g20Service.getProjectInfo(params));
        model.addAttribute("projectInfo", projectService.getProjectByPjtCd(params));

        return "popup/cam_manager/budgetListDetail";
    }

    @RequestMapping("/mng/imgSaveTest")
    @ResponseBody
    public ModelMap imgSaveTest(@RequestParam HashMap<Object, Object> params, final HttpServletRequest request, final HttpServletResponse response) throws Exception{
        ModelMap map = new ModelMap();

        String binaryData = request.getParameter("imgSrc");
        FileOutputStream stream = null;
        try{
            System.out.println("binary file   "  + binaryData);
            if(binaryData == null || binaryData.trim().equals("")) {
                throw new Exception();
            }
            binaryData = binaryData.replaceAll("data:image/png;base64,", "");
            byte[] file = Base64.decodeBase64(binaryData);
            String fileUuid=  UUID.randomUUID().toString();
            String fileOrgName = "";
            String fileCd = "";
            String fileExt = "";
            String filePath = "";

            if("etax".equals(params.get("imgValue"))){
                fileOrgName = params.get("TR_NM").toString() + "_" + params.get("ISS_NO").toString();
                fileCd = "etax";
                fileExt = "png";
                filePath = "/upload/"+ fileCd +"/" + params.get("CO_CD") + "/" + params.get("TAX_TY") + "/" + params.get("ISS_NO") + "/";
            }

            if("card".equals(params.get("imgValue"))){
                fileOrgName = params.get("authNo").toString();
                fileCd = "useCard";
                fileExt = "png";
                filePath = "/upload/"+ fileCd +"/" + params.get("authNo") + "/" + params.get("authDate") + "/" + params.get("authTime") + "/" + params.get("cardNo") + "/" + params.get("buySts") + "/";
            }

            Map<String, Object> fileParameters = new HashMap<>();
            fileParameters.put("fileCd", fileCd);
            fileParameters.put("fileUuid", fileUuid+"."+fileExt);
            fileParameters.put("fileOrgName", fileOrgName);
            fileParameters.put("filePath", filePath);
            fileParameters.put("fileExt", fileExt);
            fileParameters.put("fileSize", 19);
            fileParameters.put("empSeq", params.get("empSeq"));

            commonService.insFileUpload(fileParameters);

            filePath = "/home" + filePath;
            File newPath = new File(filePath);
            if (!newPath.exists()) {
                newPath.mkdirs();
            }

            stream = new FileOutputStream(filePath + fileUuid + "." + fileExt);

            stream.write(file);
            stream.close();
            System.out.println("캡처 저장");

            map.addAttribute("result", fileParameters);
        }catch(Exception e){
            e.printStackTrace();
            System.out.println("에러 발생");
        }finally{
            if(stream != null) {
                stream.close();
            }
        }

        return map;
    }

    @RequestMapping("/mng/setManageDepo")
    public String setManageDepo(@RequestParam Map<String, Object> params, Model model){
        try{
            manageService.setManageDepo(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/mng/getManageDepo")
    public String getManageDepo(@RequestParam Map<String, Object> params, Model model){

        try{
            model.addAttribute("rsult", manageService.getManageDepo(params));
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/mng/userAccountManagement.do")
    public String userAccountManagement(Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);

        return "cam_manager/accountManagement/userAccountManagement";
    }

    @RequestMapping("/mng/userAccountManagementList")
    public String userAccountManagementList(@RequestParam Map<String,Object> map, Model model, HttpServletRequest request) {
        model.addAttribute("list", manageService.getUserAccountManagementList(map));
        return "jsonView";
    }

    @RequestMapping("/mng/getEtaxListAll")
    public String getEtaxListAll(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = new ArrayList<>();
        list = manageService.getEtaxListAll(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/mng/pop/accountList.do")
    public String accountList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/accountList";
    }

    @RequestMapping("/mng/getAccountInfoOne")
    public String getAccountInfoOne(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", manageService.getAccountInfoOne(params));
        return "jsonView";
    }
}
