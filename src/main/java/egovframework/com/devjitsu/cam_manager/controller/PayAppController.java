package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.g20.service.G20Service;
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
import java.util.List;
import java.util.Map;

@Controller
public class PayAppController {

    @Autowired
    private PayAppService payAppService;

    @Autowired
    private G20Service g20Service;

    @Autowired
    private ProjectService projectService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;


    @RequestMapping("/pay/paymentList.do")
    public String paymentList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentList";
    }

    @RequestMapping("/pay/paymentMngList.do")
    public String paymentMngList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentMngList";
    }

    @RequestMapping("/pay/getPaymentList")
    public String getPaymentList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = payAppService.getPaymentList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/regPayAppPop.do")
    public String regPayAppPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regPayAppPop";
    }

    @RequestMapping("/pay/pop/regPayDepoPop.do")
    public String regPayDepoPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("pjtSn")){
            Map<String, Object> map = projectService.getProjectData(params);

            model.addAttribute(map);
        }

        return "popup/cam_manager/payDepo/regPayDepoPop";
    }

    @RequestMapping("/pay/pop/regPayDepoSetPop.do")
    public String regPayDepoSetPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("pjtSn")){
            Map<String, Object> map = projectService.getProjectData(params);

            model.addAttribute(map);
        }

        return "popup/cam_manager/payDepo/regPayDepoSetPop";
    }

    @RequestMapping("/pay/pop/depoNotBusnSetPopView.do")
    public String depoNotBusnSetPopView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("pjtSn")){
            Map<String, Object> map = projectService.getProjectData(params);

            model.addAttribute(map);
        }

        return "popup/cam_manager/payDepo/regPayDepoSetNotBusn";
    }

    @RequestMapping("/pay/pop/taxInfoPop.do")
    public String taxInfoPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("pjtSn")){
            Map<String, Object> map = projectService.getProjectData(params);

            model.addAttribute(map);
        }

        return "popup/cam_manager/payDepo/taxInfoPop";
    }

    @RequestMapping("/pay/pop/taxNotBusnInfoPop.do")
    public String taxNotBusnInfoPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        if(params.containsKey("pjtSn")){
            Map<String, Object> map = projectService.getProjectData(params);

            model.addAttribute(map);
        }

        return "popup/cam_manager/payDepo/taxNotBusnInfoPop";
    }

    @RequestMapping("/pay/getProjectSettingInfo")
    public String getProjectSettingInfo(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = payAppService.getProjectSettingInfo(params);
        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/pay/setProjectTaxInfo")
    public String setProjectTaxInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            payAppService.setProjectTaxInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/pay/setProjectBudgetInfo")
    public String setProjectBudgetInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        try{
            payAppService.setProjectBudgetInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/regPayAttPop.do")
    public String regPayAttPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regPayAttPop";
    }

    @RequestMapping("/payApp/pop/regReListFilePop.do")
    public String regReListFilePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regReListFilePop";
    }

    @RequestMapping("/payApp/regReListFile.do")
    public String regReListFile(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            payAppService.regReListFile(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/regIncmAttPop.do")
    public String regIncmAttPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regIncmAttPop";
    }

    /** 프로젝트 비용처리용 지급신청서 조회 팝업 */
    @RequestMapping("/payApp/pop/regPayAppCostPop.do")
    public String regPayAppCostPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regPayAppCostPop";
    }

    @RequestMapping("/pay/getPayDepoData")
    public String getPayDepoData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayDepoData(params);
        List<Map<String, Object>> fileList = payAppService.getPayDepoFileList(params);

        model.addAttribute("data", map);
        model.addAttribute("fileList", fileList);

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/regExnpAttPop.do")
    public String regExnpAttPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regExnpAttPop";
    }

    @RequestMapping("/payApp/getPayAppReqData")
    public String getPayAppReqData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayAppReqData(params);
        model.addAttribute("map", map);

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getPayAppData")
    public String getPayAppData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayAppReqData(params);
        List<Map<String, Object>> list = payAppService.getPayAppDetailData(params);

        String[] fileNoAr = new String[list.size()];
        for(int i = 0; i < list.size(); i++){
            if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                fileNoAr[i] = "";
            } else {
                fileNoAr[i] = list.get(i).get("FILE_NO").toString();
            }
        }
        params.put("fileNoAr", fileNoAr);

        List<Map<String, Object>> fileList = payAppService.getPayAppFileList(params);

        model.addAttribute("map", map);
        model.addAttribute("list", list);
        model.addAttribute("fileList", fileList);

        return "jsonView";
    }

    @RequestMapping("/payApp/payAppSetData")
    public String payAppSetData(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){

        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            payAppService.payAppSetData(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/payApp/payAppMngFileSet")
    public String payAppMngFileSet(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){

        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            payAppService.payAppMngFileSet(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/popup/payApp/approvalFormPopup/payAppApprovalPop.do")
    public String approvalFormPopup(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("payAppItemList", payAppService.getPayAppDetailData(params));
        Map<String, Object> data = payAppService.getPayAppReqData(params);

        return "popup/cam_manager/approvalFormPopup/payAppApprovalPop";
    }

    @RequestMapping("/popup/exnp/approvalFormPopup/exnpApprovalPop.do")
    public String exnpApprovalPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("payAppItemList", payAppService.getPayAppDetailData(params));
        Map<String, Object> data = payAppService.getPayAppReqData(params);

        return "popup/cam_manager/approvalFormPopup/exnpApprovalPop";
    }

    @RequestMapping("/popup/exnp/approvalFormPopup/payIncpApprovalPop.do")
    public String payIncmApprovalPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("payIncpItemList", payAppService.getPayIncpDetailData(params));

        return "popup/cam_manager/approvalFormPopup/payIncpApprovalPop";
    }

    /** 지급요청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/pay/payApp")
    public String payApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            payAppService.updatePayAppDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 지출결의서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/pay/exnpApp")
    public String exnpApp(@RequestParam Map<String, Object> bodyMap, Model model, HttpServletRequest request) {
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            payAppService.updateExnpAppDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 수입결의서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/pay/incpApp")
    public String incpApp(@RequestParam Map<String, Object> bodyMap, Model model, HttpServletRequest request) {
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            payAppService.updateIncpAppDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/pay/paymentRevList.do")
    public String paymentRevList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentRevList";
    }

    @RequestMapping("/pay/paymentInList.do")
    public String paymentInList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentInList";
    }

    @RequestMapping("/pay/paymentReList.do")
    public String paymentReList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentReList";
    }

    @RequestMapping("/pay/paymentAltList.do")
    public String paymentAltList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentAltList";
    }

    @RequestMapping("/payApp/setPayAppDetData")
    public String setPayAppDetData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            payAppService.setPayAppDetData(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/setPayAppCostApp")
    public String setPayAppCostApp(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            payAppService.setPayAppCostApp(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/setPayAppDetCostApp")
    public String setPayAppDetCostApp(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        try{
            payAppService.setPayAppDetCostApp(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/pay/updPayAttDetData")
    public String updPayAttDetData(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("file11").toArray(new MultipartFile[0]);
        payAppService.updPayAttDetData(params, request, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    @RequestMapping("/pay/updExnpAttDetData")
    public String updExnpAttDetData(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("file11").toArray(new MultipartFile[0]);
        payAppService.updExnpAttDetData(params, request, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    @RequestMapping("/payApp/pop/regExnpPop.do")
    public String reqExnpPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpEmpSeq", loginVO.getErpEmpCd());
        Map<String, Object> g20 = g20Service.getSempData(params);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20", g20);

        return "popup/cam_manager/payApp/regExnpPop";
    }

    @RequestMapping("/payApp/pop/regExnpRePop.do")
    public String regExnpRePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpEmpSeq", loginVO.getErpEmpCd());
        Map<String, Object> g20 = g20Service.getSempData(params);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20", g20);

        return "popup/cam_manager/payApp/regExnpRePop";
    }

    @RequestMapping("/payApp/setExnpData")
    public String setExnpData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        try{
            payAppService.setExnpData(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getExnpData")
    public String getExnpData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        Map<String, Object> map = payAppService.getExnpData(params);
        List<Map<String, Object>> list = payAppService.getExnpDetailData(params);

        String[] fileNoAr = new String[list.size()];
        for(int i = 0; i < list.size(); i++){
            if("".equals(list.get(i).get("FILE_NO")) || list.get(i).get("FILE_NO") == null){
                fileNoAr[i] = "";
            } else {
                fileNoAr[i] = list.get(i).get("FILE_NO").toString();
            }
        }

        params.put("fileNoAr", fileNoAr);

        List<Map<String, Object>> fileList = payAppService.getPayAppFileList(params);

        model.addAttribute("map", map);
        model.addAttribute("list", list);
        model.addAttribute("fileList", fileList);

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getExnpDocData")
    public String getExnpDocData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {

        if(!"".equals(params.get("exnpSn"))){
            Map<String, Object> map = payAppService.getExnpData(params);
            // 지출결의서 양식 DOC_ID
            params.put("exnpDocId", map.get("DOC_ID"));
        }

        List<Map<String, Object>> fileList = payAppService.getPayAppDocFileList(params);
        model.addAttribute("fileList", fileList);
        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getApprovalExnpFileData")
    public String getApprovalExnpFileData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        Map<String, Object> map = payAppService.getExnpData(params);

        params.put("payAppSn", map.get("PAY_APP_SN"));

        List<Map<String, Object>> fileList = payAppService.getApprovalExnpFileData(params);

        model.addAttribute("fileList", fileList);
        model.addAttribute("map", params);
        return "jsonView";
    }

    @RequestMapping("/pay/exnpList.do")
    public String exnpList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/exnpList";
    }

    @RequestMapping("/pay/exnpReList.do")
    public String exnpReList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/exnpReList";
    }

    @RequestMapping("/pay/incomeList.do")
    public String incomeList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/incomeList";
    }

    @RequestMapping("/payApp/pop/regIncmPop.do")
    public String regIncmPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpEmpSeq", loginVO.getErpEmpCd());
        Map<String, Object> g20 = g20Service.getSempData(params);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20", g20);

        return "popup/cam_manager/payApp/regIncmPop";
    }


    /**
     * 수입 반제결의 팝업
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/payApp/pop/regIncpRePop.do")
    public String regIncpRePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpEmpSeq", loginVO.getErpEmpCd());
        Map<String, Object> g20 = g20Service.getSempData(params);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20", g20);

        return "popup/cam_manager/payApp/regIncpRePop";
    }

    @RequestMapping("/payApp/pop/regIncmRePop.do")
    public String regIncmRePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpEmpSeq", loginVO.getErpEmpCd());
        Map<String, Object> g20 = g20Service.getSempData(params);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("g20", g20);

        return "popup/cam_manager/payApp/regIncmRePop";
    }

    @RequestMapping("/payApp/payIncpSetData")
    public String payIncpSetData(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){

        try{
            MultipartFile[] fileList = request.getFiles("fileList").toArray(new MultipartFile[0]);

            payAppService.payIncpSetData(params, fileList, SERVER_DIR, BASE_DIR);

            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getPayIncpData")
    public String getPayIncpData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayIncpReqData(params);
        List<Map<String, Object>> list = payAppService.getPayIncpDetailData(params);
        List<Map<String, Object>> fileList = payAppService.getStoredPayIncpFileList(params);

        model.addAttribute("map", map);
        model.addAttribute("list", list);
        model.addAttribute("fileList", fileList);

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/getPayIncpReData")
    public String getPayIncpReData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> map = payAppService.getPayIncpReqData(params);
        List<Map<String, Object>> list = payAppService.getPayIncpDetailData(params);
        Map<String, Object> data = payAppService.getPayIncpReData(params);
        model.addAttribute("map", map);
        model.addAttribute("list", list);
        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/pay/incomeReList.do")
    public String incomeReList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/incomeReList";
    }

    @RequestMapping("/pay/entryList.do")
    public String entryList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/entryList";
    }

    @RequestMapping("/pay/returnList.do")
    public String returnList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/returnList";
    }

    @RequestMapping("/pay/alterList.do")
    public String alterList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/alterList";
    }


    @RequestMapping("/pay/getExnpList")
    public String getExnpList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getExnpList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }


    @RequestMapping("/pay/getExnpReList")
    public String getExnpReList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getExnpReList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/pay/getExnpReListForExcelDown")
    public String getExnpReListForExcelDown(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getExnpReListForExcelDown(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/pay/getIncpList")
    public String getIncpList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getIncpList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }


    @RequestMapping("/pay/getIncpReList")
    public String getIncpReList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getIncpReList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/pay/resolutionExnpAppr")
    public String resolutionExnpAppr(@RequestParam Map<String, Object> params, Model model){
        try {
            payAppService.resolutionExnpAppr(params);
            model.addAttribute("code", 200);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/pay/resolutionIncpAppr")
    public String resolutionIncmAppr(@RequestParam Map<String, Object> params, Model model){
        try {
            payAppService.resolutionIncpAppr(params);
            model.addAttribute("code", 200);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/pay/getPayAttInfo")
    public String getPayAttInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", payAppService.getPayAttInfo(params));
        return "jsonView";
    }

    @RequestMapping("/pay/getPayAttList")
    public String getPayAttList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", payAppService.getPayAttList(params));
        return "jsonView";
    }

    @RequestMapping("/pay/getExnpAttInfo")
    public String getExnpAttInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", payAppService.getExnpAttInfo(params));
        return "jsonView";
    }
    @RequestMapping("/pay/getExnpAttList")
    public String getExnpAttList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", payAppService.getExnpAttList(params));
        return "jsonView";
    }

    @RequestMapping("/payApp/getPartRatePay")
    public String getPartRatePay(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", payAppService.getPartRatePay(params));

        return "jsonView";
    }

    @RequestMapping("/pay/payDeposit.do")
    public String payDeposit(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/deposit/depositList";
    }

    @RequestMapping("/pay/getDepositList")
    public String getDepositList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getDepositList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/pay/setPayDepo")
    public String setPayDepo(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            payAppService.setPayDepo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/pay/setApprIncome")
    public String setApprIncome(@RequestParam Map<String, Object> params, Model model){

        try{
            payAppService.setApprIncome(params);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/pop/setPayRequest.do")
    public String setPayRequest(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/setPayRequest";
    }

    @RequestMapping("/payApp/getCheckBudget")
    public String getCheckBudget(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", payAppService.getCheckBudget(params));

        return "jsonView";
    }

    @RequestMapping("/pay/delPayApp")
    public String delPayApp(@RequestParam("payAppSn") int[] params, Model model){

        try{
            payAppService.delPayApp(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/pay/updExnpDe")
    public String updExnpDe(@RequestParam("payAppSn") int[] params, @RequestParam Map<String, Object> params2, Model model){

        try{
            payAppService.updExnpDe(params, params2);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/pay/pop/depoProjectViewPop.do")
    public String depoProjectViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);

        return "popup/cam_manager/payDepo/depoProjectViewPop";
    }
    @RequestMapping("/pay/pop/depoBudgetViewPop.do")
    public String depoBudgetViewPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params);
        model.addAttribute("loginVO", loginVO);

        return "popup/cam_manager/payDepo/depoBudgetViewPop";
    }

    //TODO. 여비 지급신청서 완료시 추후 연동 필요함.
    /** 프로젝트에 묶인 지출결의서 리스트 (프로젝트 정산서 - 지출내역 그리드) */
    @RequestMapping("/payApp/getPjtExnpList")
    public String getPjtExnpList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", payAppService.getPjtExnpList(params));

        return "jsonView";
    }

    @RequestMapping("/pay/payAppRevert")
    public String payAppRevert(@RequestParam Map<String, Object> params, Model model){

        try{
            payAppService.payAppRevert(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/pay/payDepoFileList")
    public String payDepoFileList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> listMap = payAppService.getPayDepoFileList(params);

        model.addAttribute("listMap", listMap);
        return "jsonView";
    }

    @RequestMapping("/pay/payExnpFileList")
    public String payExnpFileList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> listMap = payAppService.getPayExnpFileList(params);

        model.addAttribute("listMap", listMap);
        return "jsonView";
    }

    @RequestMapping("/pay/regIncmReData")
    public String regIncmReData(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> listMap = payAppService.getRegIncmReData(params);

        model.addAttribute("list", listMap);

        return "jsonView";
    }

    @RequestMapping("/pay/setIncpRe")
    public String setIncpRe(@RequestParam Map<String, Object> params, Model model){
        try{
            Map<String, Object> map = payAppService.setIncpRe(params);
            model.addAttribute("code", 200);
            model.addAttribute("rs", map);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/payApp/getPartRatePayBsYm")
    public String getPartRatePayBsYm(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("map", payAppService.getPartRatePayBsYm(params)) ;
        return "jsonView";
    }

    @RequestMapping("/payApp/delExnpData")
    public String delExnpData(@RequestParam Map<String, Object> params, Model model){

        try{
            payAppService.delExnpData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
