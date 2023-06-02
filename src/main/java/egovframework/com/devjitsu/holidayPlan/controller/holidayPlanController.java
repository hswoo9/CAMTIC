package egovframework.com.devjitsu.holidayPlan.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.system.service.CommonCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class holidayPlanController {

    private static final Logger logger = LoggerFactory.getLogger(holidayPlanController.class);
    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;




    //휴가관리 페이지
    @RequestMapping("/subHoliday/subHolidayStatus.do")
    public String subHolidayStatus(){
        return "/subHoliday/subHolidayStatus";
    }

    //휴가신청관리 페이지
    @RequestMapping("/subHoliday/subHolidayReq.do")
    public String subHolidayReq(){
        return "/subHoliday/subHolidayReq";
    }

    //휴가사용현황 페이지
    @RequestMapping("/subHoliday/subHolidayMod.do")
    public String subHolidayMod(){
        return "/subHoliday/subHolidayMod";
    }

    //휴가설정 페이지
    @RequestMapping("/subHoliday/subHolidaySetting.do")
    public String subHolidaySetting(){
        return "/subHoliday/subHolidaySetting";
    }

    @RequestMapping("/subHoliday/holidayPlanReqPop.do")
    public String holidayPlanReqPop(){
        return "/popup/holidayPlan/holidayPlanReqPop";
    }






}
