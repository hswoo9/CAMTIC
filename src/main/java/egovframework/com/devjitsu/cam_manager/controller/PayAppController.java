package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_manager.service.ResDocService;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class PayAppController {

    @Autowired
    private PayAppService payAppService;

    @Autowired
    private G20Service g20Service;

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

    @RequestMapping("/payApp/pop/regPayAttPop.do")
    public String regPayAttPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regPayAttPop";
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
        model.addAttribute("map", map);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/payApp/payAppSetData")
    public String payAppSetData(@RequestParam Map<String, Object> params, Model model){

        try{
            payAppService.payAppSetData(params);

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

    @RequestMapping("/pay/paymentRevList.do")
    public String paymentRevList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/paymentRevList";
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

    @RequestMapping("/pay/updPayAttDetData")
    public String updPayAttDetData(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        MultipartFile[] file = request.getFiles("file11").toArray(new MultipartFile[0]);
        payAppService.updPayAttDetData(params, request, file, SERVER_DIR, BASE_DIR);
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

        model.addAttribute("map", map);
        model.addAttribute("list", list);

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

    @RequestMapping("/pay/replaceList.do")
    public String replaceList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_manager/payApp/replaceList";
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

    @RequestMapping("/pay/getPayAttInfo")
    public String getPayAttInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", payAppService.getPayAttInfo(params));
        return "jsonView";
    }
}
