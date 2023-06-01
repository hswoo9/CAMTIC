package egovframework.com.devjitsu.holidayPlan.controller;

import egovframework.com.devjitsu.system.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.main.dto.LoginVO;
import egovframework.com.devjitsu.workPlan.service.WorkPlanService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
public class holidayPlanController {

    private static final Logger logger = LoggerFactory.getLogger(holidayPlanController.class);
    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;




    @RequestMapping("/subHoliday/subHolidayStatus.do")
    public String subHolidayStatus(){
        return "/subHoliday/subHolidayStatus";
    }

    @RequestMapping("/subHoliday/holidayPlanReqPop.do")
    public String holidayPlanReqPop(){
        return "/popup/holidayPlan/holidayPlanReqPop";
    }






}
