package egovframework.com.devjitsu.cam_achieve.controller;


import egovframework.com.devjitsu.cam_achieve.service.AchieveService;
import egovframework.com.devjitsu.gw.dept.service.DeptService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ArchieveController {


    @Autowired
    private AchieveService achieveService;

    @Autowired
    private DeptService deptService;

    /**
     * 캠어취브 > 재무성과(팀별)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_achieve/finPerm.do")
    public String finPerm(@RequestParam Map<String, Object> params, Model model) {
        return "cam_achieve/finPerm";
    }

    /**
     * 캠어취브 > 주간회의 (부서)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/cam_achieve/weekMeet.do")
    public String weekMeet(@RequestParam Map<String, Object> params, Model model) {

        params.put("deptLevel", "1");
        List<Map<String, Object>> list = deptService.getDeptAList(params);

        model.addAttribute("list", list);
        
        return "cam_achieve/weekMeet";
    }

    @RequestMapping("/cam_achieve/popObjSetting.do")
    public String popObjSetting(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("deptLevel", "1");
        List<Map<String, Object>> list = new ArrayList<>();
        if(achieveService.getDeptObjList(params).size() > 0){
            list = achieveService.getDeptObjList(params);
            params.put("type", "upd");
        } else {
            list = deptService.getDeptAList(params);
            params.put("type", "ins");
        }
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("list", list);
        model.addAttribute("params", params);
    	return "popup/cam_achieve/popObjSetting";
    }

    @RequestMapping("/achieve/insDeptObjSetting")
    public String insDeptObjSetting(@RequestParam Map<String, Object> params, Model model) {
        achieveService.insDeptObjSetting(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }


    @RequestMapping("/cam_achieve/monMeet.do")
    public String monMeet(@RequestParam Map<String, Object> params, Model model) {

        return "cam_achieve/monMeet";
    }

    @RequestMapping("/cam_achieve/getAllPjtCalc")
    public String getAllPjtCalc(@RequestParam Map<String, Object> params, Model model) {

        Map<String, Object> map = new HashMap<>();

        map = achieveService.getAllPjtCalc(params);

        model.addAttribute("map", map);
        return "jsonView";
    }

    @RequestMapping("/cam_achieve/getEngnList")
    public String getEngnList(@RequestParam Map<String, Object> params, Model model) {
    	List<Map<String, Object>> list = new ArrayList<>();

        list = achieveService.getEngnList(params);

    	model.addAttribute("list", list);
    	return "jsonView";
    }

    @RequestMapping("/cam_achieve/getEngnDeptData")
    public String getEngnDeptData(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("ls", achieveService.getEngnDeptData(params));
        model.addAttribute("saleLs", achieveService.getSaleByDeptData(params));
        model.addAttribute("objLs", achieveService.getDeptObjList(params));
        return "jsonView";
    }
}
