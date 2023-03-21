package egovframework.com.devjitsu.common.controller;

import egovframework.com.devjitsu.common.service.CommonCodeService;
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
public class CommonCodeController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(CommonCodeController.class);
    
    @Autowired
    private CommonCodeService commonCodeService;

    //공통 그룹코드별 코드리스트
    @RequestMapping("/system/commonCodeManagement/getCmCodeList")
    @ResponseBody
    public List<Map<String, Object>> getCmCodeList(Model model, @RequestParam Map<String, Object> params){
        return commonCodeService.getCmCodeList(params);
    }
}