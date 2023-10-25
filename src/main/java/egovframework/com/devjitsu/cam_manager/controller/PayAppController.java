package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.PayAppService;
import egovframework.com.devjitsu.cam_manager.service.ResDocService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Controller
public class PayAppController {

    @Autowired
    private PayAppService payAppService;



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

    /** 구매요청서 결재 상태값에 따른 UPDATE 메서드 */
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

    @RequestMapping("/payApp/pop/regExnpPop.do")
    public String reqExnpPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/payApp/regExnpPop";
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

    @RequestMapping("/pay/getExnpList")
    public String getExnpList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = payAppService.getExnpList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }
}
