package egovframework.com.devjitsu.subHoliday.controller;

import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.system.service.CommonCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class subHolidayController {

    private static final Logger logger = LoggerFactory.getLogger(subHolidayController.class);
    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;




    //휴가관리 페이지
    @RequestMapping("/subHoliday/subHolidayList.do")
    public String subHolidayList(){
        return "/subHoliday/subHolidayList";
    }

    //휴가신청관리 페이지
    @RequestMapping("/subHoliday/subHolidayMod.do")
    public String subHolidayMod(){
        return "/subHoliday/subHolidayMod";
    }

    //휴가사용현황 페이지
    @RequestMapping("/subHoliday/subHolidayStat.do")
    public String subHolidayStatus(){
        return "/subHoliday/subHolidayStat";
    }

    //휴가설정 페이지
    @RequestMapping("/subHoliday/subHolidaySetting.do")
    public String subHolidaySetting(){
        return "/subHoliday/subHolidaySetting";
    }

    @RequestMapping("/subHoliday/subHolidayReqPop.do")
    public String subHolidayReqPop(){
        return "/popup/subHoliday/subHolidayReqPop";
    }






}
