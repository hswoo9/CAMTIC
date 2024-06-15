package egovframework.com.devjitsu.docView.controller;

import egovframework.com.devjitsu.docView.service.DocViewService;
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
public class DocViewController {


    @Autowired
    private DocViewService docViewService;



    @RequestMapping("/customDoc/cardLoss.do")
    public String cardLoss(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/cardLoss";
    }

    @RequestMapping("/customDoc/getCardLossList")
    public String getCardLossList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = docViewService.getCardLossList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/customDoc/pop/popCLView.do")
    public String popCLView(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popCLView";
    }

    @RequestMapping("/customDoc/getCardManager")
    public String getCardManager(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getCardManager(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/saveCardLoss")
    public String saveCardLooss(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveCardLoss(params);

            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getCardLossData")
    public String getCardLossData(@RequestParam Map<String, Object> params, Model model){

    	Map<String, Object> map = docViewService.getCardLossData(params);

    	model.addAttribute("data", map);

    	return "jsonView";
    }

    @RequestMapping("/customDoc/delCardLossData")
    public String delCardLossData(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delCardLossData(params);

            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

    	return "jsonView";
    }



    @RequestMapping("/customDoc/accCertView.do")
    public String accCertView(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/accCertView";
    }

    @RequestMapping("/customDoc/getAccCertList")
    public String getAccCertList(@RequestParam Map<String, Object> params, Model model) {

        List<Map<String, Object>> list = docViewService.getAccCertList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/customDoc/pop/popAccCertView.do")
    public String popAccCertView(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popAccCertView";
    }

    @RequestMapping("/customDoc/saveAccCert")
    public String saveAccCert(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.saveAccCert(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getAccCertData")
    public String getAccCertData(@RequestParam Map<String, Object> params, Model model){

    	Map<String, Object> map = docViewService.getAccCertData(params);

    	model.addAttribute("data", map);

    	return "jsonView";
    }

    @RequestMapping("/customDoc/delAccCertData")
    public String delAccCertData(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delAccCertData(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/corpBank.do")
    public String corpBank(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/corpBank";
    }

    @RequestMapping("/customDoc/pop/popCorpBank.do")
    public String popCorpBank(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popCorpBank";
    }

    @RequestMapping("/customDoc/saveCorpBank")
    public String saveCorpBank(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveCorpBank(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getCorpBank")
    public String getCorpBank(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = docViewService.getCorpBankData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/customDoc/getCorpBankList")
    public String getCorpBankList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getCorpBankList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/delCorpBank")
    public String delCorpBank(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delCorpBank(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/corpCard.do")
    public String corpCard(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/corpCard";
    }

    @RequestMapping("/customDoc/pop/popCorpCard.do")
    public String popCorpCard(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popCorpCard";
    }

    @RequestMapping("/customDoc/saveCorpCard")
    public String saveCorpCard(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveCorpCard(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getCorpCardData")
    public String getCorpCardData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = docViewService.getCorpCardData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/customDoc/getCorpCardList")
    public String getCorpCardList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getCorpCardList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/delCorpCard")
    public String delCorpCard(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delCorpCard(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/signetTo.do")
    public String signetTo(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/signetTo";
    }

    @RequestMapping("/customDoc/pop/popSignetTo.do")
    public String popSignetTo(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popSignetTo";
    }

    @RequestMapping("/customDoc/saveSignetTo")
    public String saveSignetTo(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveSignetTo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getSignetToData")
    public String getSignetToData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = docViewService.getSignetToData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/customDoc/getSignetToList")
    public String getSignetToList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getSignetToList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/delSignetTo")
    public String delSignetTo(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delSignetTo(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/disAsset.do")
    public String disAsset(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/disAsset";
    }

    @RequestMapping("/customDoc/pop/popDisAsset.do")
    public String popDisAsset(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/docView/popDisAsset";
    }

    @RequestMapping("/customDoc/saveDisAsset")
    public String saveDisAsset(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveDisAsset(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getDisAssetData")
    public String getDisAssetData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = docViewService.getDisAssetData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/customDoc/getDisAssetList")
    public String getDisAssetList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getDisAssetList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/delDisAsset")
    public String delDisAsset(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delDisAsset(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    //aa
    @RequestMapping("/customDoc/resign.do")
    public String resign(HttpServletRequest request, Model model) {

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "docView/resign";
    }

    @RequestMapping("/customDoc/pop/popResign.do")
    public String popResign(HttpServletRequest request, Model model, @RequestParam Map<String, Object> params) {

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        params.put("empSeq", loginVO.getUniqId());
        model.addAttribute("data", docViewService.getEmpData(params));

        return "popup/docView/popResign";
    }

    @RequestMapping("/customDoc/saveResign")
    public String saveResign(@RequestParam Map<String, Object> params, Model model){

        try{

            docViewService.saveResign(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/customDoc/getResignData")
    public String getResignData(@RequestParam Map<String, Object> params, Model model){

        Map<String, Object> data = docViewService.getResignData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/customDoc/getResignList")
    public String getResignList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = docViewService.getResignList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/customDoc/delResign")
    public String delResign(@RequestParam Map<String, Object> params, Model model){

        try{
            docViewService.delResign(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
