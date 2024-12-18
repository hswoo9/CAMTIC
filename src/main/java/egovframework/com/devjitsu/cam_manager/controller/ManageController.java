package egovframework.com.devjitsu.cam_manager.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.EgovUserDetailsHelper;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFDataFormat;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
        model.addAttribute("g20Info", g20Service.getProjectInfo(params));
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

        if(loginVO == null){
            return "error/error";
        }

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

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/enaralink";
    }

    @RequestMapping("/mng/kukgohCommCodeView.do")
    public String kukgohCommCodeView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/kukgohCommCodeView";
    }


    @RequestMapping("/mng/kukgohCommCodeViewPop.do")
    public String kukgohCommCodeViewPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        return "cam_manager/kukgohCommCodeViewPop";
    }

    @RequestMapping("/mng/budgetConfigViewPop.do")
    public String budgetConfigViewPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        return "cam_manager/budgetConfigViewPop";
    }

    @RequestMapping("/mng/budgetChoicePop.do")
    public String budgetChoicePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        model.addAttribute("params", params);
        
        return "cam_manager/budgetChoicePop";
    }

    @RequestMapping("/mng/budgetPjtChoicePop.do")
    public String budgetPjtChoicePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        model.addAttribute("params", params);
        return "cam_manager/budgetPjtChoicePop";
    }

    @RequestMapping("/mng/budgetConfigView.do")
    public String budgetConfigView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/budgetConfigView";
    }

    @RequestMapping("/mng/projectConfigView.do")
    public String projectConfigView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/projectConfigView";
    }

    @RequestMapping("/mng/submitInvoice.do")
    public String submitInvoice(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/submitInvoice";
    }

    @RequestMapping("/mng/saveInterfacePage.do")
    public String saveInterfacePage(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/saveInterfacePage";
    }

    @RequestMapping("/mng/enaraExceptList.do")
    public String enaraExceptList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        if(loginVO == null){
            return "error/error";
        }

        return "cam_manager/enaraExceptList";
    }

    @RequestMapping("/mng/newResolutionSubmitPage.do")
    public String newResolutionSubmitPage(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_manager/newResolutionSubmitPage";
    }

    @RequestMapping("/mng/cardPurchaseReceptionPop.do")
    public String cardPurchaseReceptionPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_manager/cardPurchaseReceptionPop";
    }


    @RequestMapping("/mng/evidCrmSubmitPopup.do")
    public String evidCrmSubmitPopup(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_manager/evidCrmSubmitPopup";
    }

    @RequestMapping("/mng/bankCodeViewPop")
    public String bankCodeViewPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        model.addAttribute("params", params);
        return "cam_manager/bankCodeViewPop";
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

    @RequestMapping("/mng/getCurrentAmountStatus")
    public String getCurrentAmountStatus(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        model.addAttribute("data", manageService.getCurrentAmountStatus(params));
        return "jsonView";
    }

    @RequestMapping("/mng/getCarryoverAmt")
    public String getCarryoverAmt(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", manageService.getCarryoverAmt(params));
        return "jsonView";
    }

    @RequestMapping("/mng/updCarryoverAmt")
    public String updCarryoverAmt(@RequestParam Map<String, Object> params, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("empSeq", loginVO.getUniqId());
        manageService.updCarryoverAmt(params);
        return "jsonView";
    }

    @RequestMapping("/mng/pop/budgetDetailView.do")
    public String budgetDetailView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        model.addAttribute("bgtCode", manageService.getBudgetCodeData(params));
        return "popup/cam_manager/budgetDetailView";
    }

    @RequestMapping("/mng/getBudgetDetailViewData")
    public String getBudgetDetailViewData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", manageService.getBudgetDetailViewData(params));
        return "jsonView";
    }

    @RequestMapping("/mng/getIncpBudgetDetailViewData")
    public String getIncpBudgetDetailViewData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", manageService.getIncpBudgetDetailViewData(params));
        return "jsonView";
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

        if(login == null){
            return "error/error";
        }

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

    @RequestMapping("/mng/getIncpExnpAmt")
    public String getIncpExnpAmt(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = new HashMap<>();

        data = manageService.getIncpExnpAmt(params);

        model.addAttribute("rs", data);

        return "jsonView";
    }

    @RequestMapping("/mng/updProjectPayAsync")
    public String updProjectPayAsync(@RequestParam Map<String, Object> params, Model model){
        manageService.updProjectPayAsync(params);
        return "jsonView";
    }

    @RequestMapping("/mng/insProjectBudgetStatus")
    public String insProjectBudgetStatus(@RequestParam Map<String, Object> params, Model model){
        manageService.insProjectBudgetStatus(params);
        return "jsonView";
    }

    @RequestMapping("/mng/getProjectBudgetStatus")
    public String getProjectBudgetStatus(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", manageService.getProjectBudgetStatusList(params));
        return "jsonView";
    }

    @RequestMapping("/mng/budgetExcelDownLoad")
    public void budgetExcelDownLoad(@RequestParam Map<String, Object> params, HttpServletResponse response) throws Exception {

        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("test");
        Row row = null;
        Cell cell = null;
        int rowNum = 0;

        CellStyle cellHeaderStyle = wb.createCellStyle();
        CellStyle cellTitleStyle = wb.createCellStyle();

        CellStyle cellCostStyle = wb.createCellStyle();
        CellStyle cellJangStrStyle = wb.createCellStyle();
        CellStyle cellJangCostStyle = wb.createCellStyle();
        CellStyle cellGwanStrStyle = wb.createCellStyle();
        CellStyle cellGwanCostStyle = wb.createCellStyle();
        CellStyle cellHangStrStyle = wb.createCellStyle();
        CellStyle cellHangCostStyle = wb.createCellStyle();

        /** 헤더 스타일 */
        cellHeaderStyle.setAlignment(HorizontalAlignment.CENTER);
        cellHeaderStyle.setFillForegroundColor(IndexedColors.GREY_40_PERCENT.getIndex());
        cellHeaderStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        /** 제목 스타일 */
        cellTitleStyle.setAlignment(HorizontalAlignment.CENTER);
        cellTitleStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        cellTitleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellTitleStyle.setBorderBottom(BorderStyle.THIN);
        cellTitleStyle.setBorderTop(BorderStyle.THIN);
        cellTitleStyle.setBorderLeft(BorderStyle.THIN);
        cellTitleStyle.setBorderRight(BorderStyle.THIN);

        /** 장 텍스트 스타일 */
        cellJangStrStyle.setAlignment(HorizontalAlignment.CENTER);
        cellJangStrStyle.setFillForegroundColor(IndexedColors.LEMON_CHIFFON.getIndex());
        cellJangStrStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellJangStrStyle.setBorderBottom(BorderStyle.THIN);
        cellJangStrStyle.setBorderTop(BorderStyle.THIN);
        cellJangStrStyle.setBorderLeft(BorderStyle.THIN);
        cellJangStrStyle.setBorderRight(BorderStyle.THIN);

        /** 관 텍스트 스타일 */
        cellGwanStrStyle.setAlignment(HorizontalAlignment.CENTER);
        cellGwanStrStyle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        cellGwanStrStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellGwanStrStyle.setBorderBottom(BorderStyle.THIN);
        cellGwanStrStyle.setBorderTop(BorderStyle.THIN);
        cellGwanStrStyle.setBorderLeft(BorderStyle.THIN);
        cellGwanStrStyle.setBorderRight(BorderStyle.THIN);

        /** 항 텍스트 스타일 */
        cellHangStrStyle.setAlignment(HorizontalAlignment.CENTER);
        cellHangStrStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        cellHangStrStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellHangStrStyle.setBorderBottom(BorderStyle.THIN);
        cellHangStrStyle.setBorderTop(BorderStyle.THIN);
        cellHangStrStyle.setBorderLeft(BorderStyle.THIN);
        cellHangStrStyle.setBorderRight(BorderStyle.THIN);

        XSSFDataFormat format = (XSSFDataFormat) wb.createDataFormat();

        cellCostStyle.setDataFormat(format.getFormat("#,##0"));

        /** 장 예산 스타일 */
        cellJangCostStyle.setDataFormat(format.getFormat("#,##0"));
        cellJangCostStyle.setFillForegroundColor(IndexedColors.LEMON_CHIFFON.getIndex());
        cellJangCostStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellJangCostStyle.setBorderBottom(BorderStyle.THIN);
        cellJangCostStyle.setBorderTop(BorderStyle.THIN);
        cellJangCostStyle.setBorderLeft(BorderStyle.THIN);
        cellJangCostStyle.setBorderRight(BorderStyle.THIN);

        /** 관 예산 스타일 */
        cellGwanCostStyle.setDataFormat(format.getFormat("#,##0"));
        cellGwanCostStyle.setFillForegroundColor(IndexedColors.LIGHT_CORNFLOWER_BLUE.getIndex());
        cellGwanCostStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellGwanCostStyle.setBorderBottom(BorderStyle.THIN);
        cellGwanCostStyle.setBorderTop(BorderStyle.THIN);
        cellGwanCostStyle.setBorderLeft(BorderStyle.THIN);
        cellGwanCostStyle.setBorderRight(BorderStyle.THIN);

        /** 항 예산 스타일 */
        cellHangCostStyle.setDataFormat(format.getFormat("#,##0"));
        cellHangCostStyle.setFillForegroundColor(IndexedColors.LIGHT_GREEN.getIndex());
        cellHangCostStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        cellHangCostStyle.setBorderBottom(BorderStyle.THIN);
        cellHangCostStyle.setBorderTop(BorderStyle.THIN);
        cellHangCostStyle.setBorderLeft(BorderStyle.THIN);
        cellHangCostStyle.setBorderRight(BorderStyle.THIN);

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue(params.get("formPjtCd").toString());
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 0, 1));
        cell = row.createCell(2);
        sheet.addMergedRegion(new CellRangeAddress(0, 0, 2, 7));
        cell.setCellValue(params.get("formPjtNm").toString());

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(rowNum-1, rowNum-1, 0, 7));
        cell.setCellValue("수입예산");
        cell.setCellStyle(cellHeaderStyle);

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue("장");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(1);
        cell.setCellValue("관");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(2);
        cell.setCellValue("항");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(3);
        cell.setCellValue("예산액");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(4);
        cell.setCellValue("입금완료");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(5);
        cell.setCellValue("입금대기");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(6);
        cell.setCellValue("승인");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(7);
        cell.setCellValue("예산잔액");
        cell.setCellStyle(cellTitleStyle);

        /** 수입예산현황 */
        Map<String, Object> tempParams = new HashMap<>();
        tempParams.put("erpCompSeq", "1212");
        tempParams.put("gisu", params.get("formGisu"));
        tempParams.put("startDt", params.get("formStartDt"));
        tempParams.put("endDt", params.get("formEndDt"));
        tempParams.put("fromDate", params.get("formStartDt").toString().replaceAll("-", ""));
        tempParams.put("toDate", params.get("formEndDt").toString().replaceAll("-", ""));
        tempParams.put("mgtSeq", params.get("formPjtCd"));
        tempParams.put("opt01", "3");
        tempParams.put("opt02", "1");
        tempParams.put("opt03", "2");
        tempParams.put("stat", "project");
        tempParams.put("baseDate", params.get("formBaseDate"));
        tempParams.put("pjtSn", params.get("formPjtCd"));
        tempParams.put("temp", "1");
        List<Map<String, Object>> incpBudgetList = g20Service.getSubjectList2(tempParams);

        double iCalcAmSum = 0;     // 예산액
        double iAcctAm2Sum = 0;    // 입금완료
        double iAcctAm1Sum = 0;    // 입금대기
        double iSubAmSum = 0;      // 예산잔액

        for (Map<String, Object> map : incpBudgetList) {

            row = sheet.createRow(rowNum++);

            if(map.get("DIV_FG_NM").equals("장")) {

                cell = row.createCell(0);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(1);
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(2);
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);

                iCalcAmSum += Math.floor(Double.parseDouble(map.get("CALC_AM").toString()));
                iAcctAm2Sum += Double.parseDouble(map.get("COMPLETE_AMT").toString());
                iAcctAm1Sum += Double.parseDouble(map.get("WAIT_AMT").toString());
                iSubAmSum += (iCalcAmSum - iAcctAm2Sum);

            } else if(map.get("DIV_FG_NM").equals("관")) {

                cell = row.createCell(0);
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(1);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(2);
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);

            } else if(map.get("DIV_FG_NM").equals("항")) {

                cell = row.createCell(0);
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(1);
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(2);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);

            }

        }

        row = sheet.createRow(rowNum++);
        cell = row.createCell(2);
        cell.setCellValue("합계");
        cell = row.createCell(3);
        cell.setCellValue(iCalcAmSum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(4);
        cell.setCellValue(iAcctAm2Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(5);
        cell.setCellValue(iAcctAm1Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(6);
        cell.setCellValue(iAcctAm2Sum + iAcctAm1Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(7);
        cell.setCellValue(iSubAmSum);
        cell.setCellStyle(cellCostStyle);

        rowNum++;
        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        sheet.addMergedRegion(new CellRangeAddress(rowNum-1, rowNum-1, 0, 7));
        cell.setCellValue("지출예산");
        cell.setCellStyle(cellHeaderStyle);

        row = sheet.createRow(rowNum++);
        cell = row.createCell(0);
        cell.setCellValue("장");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(1);
        cell.setCellValue("관");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(2);
        cell.setCellValue("항");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(3);
        cell.setCellValue("예산액");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(4);
        cell.setCellValue("지출완료");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(5);
        cell.setCellValue("지출대기");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(6);
        cell.setCellValue("승인");
        cell.setCellStyle(cellTitleStyle);
        cell = row.createCell(7);
        cell.setCellValue("예산잔액");
        cell.setCellStyle(cellTitleStyle);

        /** 지출예산현황 */
        tempParams.put("mgtSeq", params.get("formPjtCd"));
        tempParams.put("temp", "2");
        List<Map<String, Object>> exnpBudgetList = g20Service.getSubjectList2(tempParams);

        double eCalcAmSum = 0;     // 예산액
        double eAcctAm3Sum = 0;    // 지출완료
        double eAcctAm1Sum = 0;    // 지출대기
        double eAcctAm2Sum = 0;    // 승인
        double eSubAmSum = 0;      // 예산잔액

        for (Map<String, Object> map : exnpBudgetList) {

            row = sheet.createRow(rowNum++);

            if(map.get("DIV_FG_NM").equals("장")) {

                cell = row.createCell(0);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(1);
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(2);
                cell.setCellStyle(cellJangStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellJangCostStyle);

                eSubAmSum += (Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));

            } else if(map.get("DIV_FG_NM").equals("관")) {

                cell = row.createCell(0);
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(1);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(2);
                cell.setCellStyle(cellGwanStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellGwanCostStyle);

            } else if(map.get("DIV_FG_NM").equals("항")) {

                cell = row.createCell(0);
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(1);
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(2);
                cell.setCellValue(map.get("BGT_NM").toString());
                cell.setCellStyle(cellHangStrStyle);
                cell = row.createCell(3);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(4);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(5);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(6);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);
                cell = row.createCell(7);
                cell.setCellValue(Math.floor(Double.parseDouble(map.get("CALC_AM").toString())) - Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString())));
                cell.setCellStyle(cellHangCostStyle);

                eCalcAmSum += Math.floor(Double.parseDouble(map.get("CALC_AM").toString()));
                eAcctAm3Sum += Math.floor(Double.parseDouble(map.get("COMPLETE_AMT").toString()));
                eAcctAm1Sum += Math.floor(Double.parseDouble(map.get("WAIT_AMT").toString()));
                eAcctAm2Sum += Math.floor(Double.parseDouble(map.get("APPROVAL_AMT").toString()));

            }

        }

        row = sheet.createRow(rowNum++);
        cell = row.createCell(2);
        cell.setCellValue("합계");
        cell = row.createCell(3);
        cell.setCellValue(eCalcAmSum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(4);
        cell.setCellValue(eAcctAm3Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(5);
        cell.setCellValue(eAcctAm1Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(6);
        cell.setCellValue(eAcctAm2Sum);
        cell.setCellStyle(cellCostStyle);
        cell = row.createCell(7);
        cell.setCellValue(eSubAmSum);
        cell.setCellStyle(cellCostStyle);

        response.setContentType("ms-vnd/excel");
        String fileName = "예산현황 (" + params.get("formPjtNm").toString() +").xlsx";
        String outputFileName = new String(fileName.getBytes("KSC5601"), "8859_1");
        response.setHeader("Content-Disposition", "attachment;filename=\"" + outputFileName + "\"");

        wb.write(response.getOutputStream());
        wb.close();
    }
}
