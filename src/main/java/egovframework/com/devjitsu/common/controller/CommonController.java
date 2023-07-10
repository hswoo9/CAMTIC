package egovframework.com.devjitsu.common.controller;

import egovframework.com.devjitsu.doc.approval.service.ApprovalService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
public class CommonController {
    private static final Logger logger = LoggerFactory.getLogger(CommonController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private ApprovalService approvalService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Server.Path']}")
    private String SERVER_PATH;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @RequestMapping(value = "/common/empInformation", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> empInformation(@RequestParam Map<String, Object> map){

        Map<String, Object> resultMap = new HashMap<String, Object>();

        resultMap.put("list", commonService.getUserList(map)); //리스트
        if(map.containsKey("pageSize")){
            resultMap.put("totalCount", commonService.getUserListTotal(map)); //토탈
        }

        return resultMap;
    }

    @RequestMapping("/common/deptListPop.do")
    public String deptListLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/common/deptListPop";
    }

    @RequestMapping("/common/deptMultiPop.do")
    public String deptMultiLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/common/deptMultiPop";
    }



}
