package egovframework.com.devjitsu.g20.controlloer;

import com.google.gson.Gson;
import egovframework.com.devjitsu.g20.service.G20Service;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.Inet4Address;
import java.net.UnknownHostException;
import java.util.List;
import java.util.Map;

@Controller
public class G20Controller {

    @Autowired
    private G20Service g20Service;


    @RequestMapping("/g20/getProjectView")
    public String getProjectView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/g20/projectView";
    }

    @RequestMapping("/g20/getSubjectView")
    public String getSubjectView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/g20/subjectView";
    }


    @RequestMapping("/g20/getProjectList")
    public String getProject(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getProjectList(params);


        model.addAttribute("list", list);
        return "jsonView";
    }


    @RequestMapping("/g20/getProjectViewList")
    public String getProjectViewList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getProjectViewList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getSubjectList")
    public String getSubjectList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpCompSeq", "1212");
        List<Map<String, Object>> list = g20Service.getSubjectList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getBudgetListDuplDel")
    public String getBudgetListDuplDel(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        params.put("erpCompSeq", "1212");
        List<Map<String, Object>> list = g20Service.getSubjectList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getBankList")
    public String getBankList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getBankList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model) {
        Map<String, Object> map = g20Service.getCrmInfo(params);

        model.addAttribute("map", map);
        return "jsonView";
    }

    @RequestMapping("/g20/setCrmInfo")
    public String setCrmInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        try{
            g20Service.setCrmInfo(params);
            model.addAttribute("code", 200);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/g20/getEtaxList")
    public String getEtaxList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getEtaxList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getEtaxData")
    public String getEtaxData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = g20Service.getEtaxData(params);

        model.addAttribute("data", data);

        return "jsonView";
    }

    @RequestMapping("/g20/getClientList")
    public String getClientList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getClientList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getClientInfoOne")
    public String getClientInfoOne(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = g20Service.getClientInfoOne(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    @RequestMapping("/g20/getCardList")
    public String getCardList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("empSeq", loginVO.getUniqId());
        params.put("adminEmpSeq", loginVO.getUniqId());

        List<Map<String, Object>> list = g20Service.getCardList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getCardAdminList")
    public String getCardAdminList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("adminEmpSeq", loginVO.getUniqId());
        List<Map<String, Object>> list = g20Service.getCardAdminList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/setCardList")
    public String setCardList(@RequestParam Map<String, Object> params, Model model){
        try{
            List<Map<String, Object>> list = g20Service.getCardList(params);

            g20Service.setDjCardList(list);

            model.addAttribute("code", 200);
            model.addAttribute("list", list);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/g20/getOtherList")
    public String getOtherList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = g20Service.getOtherList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getCorpProjectList")
    public String getCorpProjectList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = g20Service.getCorpProjectList(params);

        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/g20/getSbankList")
    public String getSbankList(@RequestParam Map<String, Object> params, Model model){

        List<Map<String, Object>> list = g20Service.getSbankList(params);

        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/g20/insEtcEmpInfo")
    public String insEtcEmpInfo(@RequestParam Map<String, Object> params, Model model) throws UnknownHostException {
        String ip = Inet4Address.getLocalHost().getHostAddress();
        params.put("ip", ip);
        try{
            g20Service.insEtcEmpInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }
}
