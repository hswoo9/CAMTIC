package egovframework.com.devjitsu.cam_purc.controller;


import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_purc.service.PurcService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class PurcController {
    @Autowired
    private PurcService purcService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CommonService commonService;

    @Autowired
    private ProjectService projectService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/purc/purcReqList.do")
    public String purcReqList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", session.getAttribute("LoginVO"));

        return "cam_purc/user/purcReqList";
    }

    @RequestMapping("/purc/purcMngReqList.do")
    public String purcMngReqList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", session.getAttribute("LoginVO"));

        return "cam_purc/mng/purcMngReqList";
    }

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPurcReqList.do")
    public String getPurcReqList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", purcService.getPurcReqList(params));
        return "jsonView";
    }

    /**
     * 구매요청서 작성페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/regPurcReqPop.do")
    public String regPurcReqPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(params.containsKey("pjtSn")){
            model.addAttribute("pjtData", projectService.getProjectData(params));
        }

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/user/regPurcReqPop";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/setPurcReq.do")
    public String setPurcReq(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        purcService.setPurcReq(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/getPurcReq.do")
    public String getPurcReq(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", purcService.getPurcReq(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getMngReqPurcList")
    public String getReqPurcList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", purcService.getMngReqPurcList(params));
        return "jsonView";
    }

    /**
     * 구매요청서 전자결재 양식 페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/popup/cam_purc/approvalFormPopup/purcApprovalPop.do")
    public String purcApprovalPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("purcItemList", purcService.getPurcItemList(params));
        Map<String, Object> data = purcService.getPurcItemAmtTotal(params);
        model.addAttribute("TOTAL_SUM_COMMA", data.get("TOTAL_SUM_COMMA"));

        return "popup/cam_purc/approvalFormPopup/purcApprovalPop";
    }

    /**
     * 구매청구서 전자결재 양식 페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/popup/cam_purc/approvalFormPopup/claimingApprovalPop.do")
    public String claimingApprovalPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("purcItemList", purcService.getClaimItemList(params));
        Map<String, Object> data = purcService.getPurcClaimItemAmtTotal(params);
        model.addAttribute("data", data);
        model.addAttribute("info", purcService.getPurcClaimData(params));

        return "popup/cam_purc/approvalFormPopup/claimingApprovalPop";
    }

    /** 구매요청서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/purc/purcReqApp")
    public String purcReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            purcService.updatePurcDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 구매청구서 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/purc/claimReqApp")
    public String claimReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            purcService.updateClaimDocState(bodyMap);
        }catch(Exception e){
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/purc/setPurcItemStat")
    public String setPurcItemStat(@RequestParam Map<String, Object> params, Model model){
        try{
            purcService.setPurcItemStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 구매청구관리 (관리자) 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/purcClaim.do")
    public String purcClaim(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_purc/mng/purcClaim";
    }

    /**
     * 구매할인조회 (관리자) 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/purcDif.do")
    public String purcDif(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "cam_purc/mng/purcDif";
    }

    @RequestMapping("/purc/getPurcClaimList")
    public String getPurcClaimList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getPurcClaimList(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimItemData")
    public String getPurcClaimItemData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", purcService.getPurcClaimItemData(params));
        return "jsonView";
    }

    @RequestMapping("/purc/getPurcAssetList")
    public String getPurcAssetList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", purcService.getPurcAssetList(params));
        return "jsonView";
    }

    /**
     * 구매청구서 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/reqClaiming.do")
    public String reqClaiming(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        if(params.containsKey("purcSn") || params.containsKey("claimSn")){
            model.addAttribute("map", purcService.getPurcClaimData(params));
        }

        return "popup/cam_purc/mng/reqClaiming";
    }

    @RequestMapping("/purc/setPurcClaimData")
    public String setPurcClaimData(@RequestParam Map<String, Object> params, Model model){

        try{
            purcService.setPurcClaimData(params);
            model.addAttribute("code", 200);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/purc/getPurcClaimData")
    public String getPurcClaimData(@RequestParam Map<String, Object> params, Model model){
        if(params.containsKey("purcSn") || params.containsKey("claimSn")) {
            model.addAttribute("data", purcService.getPurcClaimData(params));
        }
        return "jsonView";
    }

    /**
     * 발주처리 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/reqOrder.do")
    public String reqOrder(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        if(params.containsKey("purcSn") || params.containsKey("claimSn")){
            model.addAttribute("map", purcService.getPurcClaimData(params));
        }

        return "popup/cam_purc/mng/reqOrder";
    }


    /** 하나의 프로젝트에 대한 모든 구매 합계 pjtSn */
    @RequestMapping("/purc/getPurcSum")
    public String getPurcSum(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = purcService.getPurcSum(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/purc/purcProductList.do")
    public String purcProductList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("params", params);

        return "cam_purc/user/purcProductList";
    }

    @RequestMapping("/purc/getPurcProductList")
    public String getPurcProductList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", purcService.getPurcProductList(params));

        return "jsonView";
    }

    /**
     * 구매검수처리 작성페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/pop/purcInspectionPop.do")
    public String purcInspectionPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(params.containsKey("pjtSn")){
            model.addAttribute("pjtData", projectService.getProjectData(params));
        }

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_purc/user/purcInspectionPop";
    }


    /**
     * 구매검수처리 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/purc/updPurcInspect.do")
    public String updPurcInspect(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        MultipartFile[] file = request.getFiles("file1").toArray(new MultipartFile[0]);
        purcService.updPurcInspect(params, file, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }


    /**
     * 구매검수처리 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/purc/updPurcInspectStat.do")
    public String updPurcInspectStat(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.updPurcInspectStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }


    /**
     * 구매내역 비자산처리
     * @param params
     * @return
     */
    @RequestMapping("/purc/updItemUnAssetStat")
    public String updItemUnAssetStat(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.updItemUnAssetStat(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/purc/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("data", purcService.getCrmInfo(params));

        return "jsonView";
    }


    /**
     * 구매내역 비자산처리
     * @param params
     * @return
     */
    @RequestMapping("/purc/setOrderInfo")
    public String setOrderInfo(@RequestParam Map<String, Object> params, Model model) {
        try{
            purcService.setOrderInfo(params);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/purc/getProjectPurcList")
    public String getProjectPurcList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = purcService.getProjectPurcList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }
}
