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
}
