package egovframework.com.devjitsu.user.controller;

import egovframework.com.devjitsu.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;
import java.util.Map;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping("/user/organizationChart.do")
    public String openOrganizationChart() {
        return "user/organizationChart";
    }

    @ResponseBody
    @RequestMapping(value = "/user/getOrgDeptList")
    public String getOrgDeptList(@RequestParam Map<String, Object> params, Model model) throws Exception {
        List<Map<String, Object>> getOrgDeptList = userService.getOrgDeptList(params);

        model.addAttribute("deptList", getOrgDeptList);

        return "jsonView";
    }

}
