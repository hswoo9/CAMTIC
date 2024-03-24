package egovframework.com.devjitsu.doc.process;


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
public class ProcessController {

    @Autowired
    private ProcessService processService;

    @RequestMapping("/process/processCheckList.do")
    public String processCheckList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();

        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        session.setAttribute("menuNm", request.getRequestURI());


        model.addAttribute("loginVO", loginVO);
        return "process/processCheckList";
    }

    @RequestMapping("/process/getPsCheckList")
    public String getPsCheckList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {

        List<Map<String, Object>> list = processService.getPsCheckList(params);
        model.addAttribute("list", list);

        return "jsonView";
    }

    @RequestMapping("/process/getAuthorityPsCheck")
    public String getAuthorityPsCheck(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {

        Map<String, Object> data = processService.getAuthorityPsCheck(params);
        model.addAttribute("data", data);

        return "jsonView";
    }
}
